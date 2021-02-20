import { User } from 'models/User';
import { GetUser } from 'structs/GetUser';
import { api } from 'utils/api/api';
import { auth } from 'utils/api/guards/auth';
import { current } from 'utils/api/guards/current';
import { exists } from 'utils/api/guards/exists';
import { or } from 'utils/api/guards/or';
import { role } from 'utils/api/guards/role';
import { validate } from 'utils/api/guards/validate';

/**
 * @openapi
 * /users/{username}/lists:
 *   get:
 *     summary: Get all user lists
 *     tags:
 *       - lists
 *     security:
 *       - apiKey: []
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username of the user
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
 * components:
 *   schemas:
 *     lists:
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
 *                  name:
 *                    type: string
 *                  slug:
 *                    type: string
 *                  public:
 *                    type: boolean
 */
export default api({
  get: async ({ headers, query }) => {
    const user = await auth(headers);
    const { username } = validate(query, GetUser);

    or(() => current(user, username), () => role(user, 'admin'));

    const data = await User.findOne({ username });

    exists(data, 'user', username);

    return data.lists.map((l) => ({
      name: l.name,
      slug: l.slug,
      public: l.public
    }));
  }
});
