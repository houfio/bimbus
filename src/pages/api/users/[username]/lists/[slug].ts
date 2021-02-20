import { User } from 'models/User';
import { GetList } from 'structs/GetList';
import { api } from 'utils/api/api';
import { auth } from 'utils/api/guards/auth';
import { current } from 'utils/api/guards/current';
import { exists } from 'utils/api/guards/exists';
import { or } from 'utils/api/guards/or';
import { role } from 'utils/api/guards/role';
import { validate } from 'utils/api/guards/validate';

/**
 * @openapi
 * /users/{username}/lists/{slug}:
 *   parameters:
 *     - $ref: '#/components/parameters/username'
 *     - $ref: '#/components/parameters/slug'
 *   get:
 *     summary: Get a list
 *     tags:
 *       - lists
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Resource not found
 *       default:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/lists'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/lists'
 *   delete:
 *     summary: Delete a list
 *     tags:
 *       - lists
 *     security:
 *       - apiKey: []
 *     responses:
 *       204:
 *         description: Successful operation
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Resource not found
 *       default:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/empty'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/empty'
 * components:
 *   schemas:
 *     list:
 *       allOf:
 *         - $ref: '#/components/schemas/response'
 *         - type: object
 *           properties:
 *             data:
 *              type: array
 *              nullable: true
 *              items:
 *                type: object
 *                properties:
 *                  slug:
 *                    type: string
 *                  name:
 *                    type: string
 *                  language:
 *                    type: string
 *                  public:
 *                    type: boolean
 */
export default api({
  get: async ({ headers, query }) => {
    const user = await auth(headers);
    const { username, slug } = validate(query, GetList);

    or(() => current(user, username), () => role(user, 'admin'));

    const data = await User.findOne({ username });

    exists(data, 'user', username);

    const list = data.lists.find((l) => l.slug === slug);

    exists(list, 'list', slug);

    return {
      slug: list.slug,
      name: list.name,
      language: list.language,
      public: list.public
    };
  },
  delete: async ({ headers, query }) => {
    const user = await auth(headers);
    const { username, slug } = validate(query, GetList);

    or(() => current(user, username), () => role(user, 'admin'));

    const result = await User.updateOne({ username }, {
      $pull: { lists: { slug } }
    });

    exists(result.n, 'user', username);
    exists(result.nModified, 'list', slug);

    return undefined;
  }
});
