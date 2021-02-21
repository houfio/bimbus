import { User } from 'models/User';
import slugify from 'slugify';
import { CreateList } from 'structs/CreateList';
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
 *   parameters:
 *     - $ref: '#/components/parameters/username'
 *   get:
 *     summary: Get all lists
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
 *   post:
 *     summary: Create a list
 *     tags:
 *       - lists
 *     security:
 *       - apiKey: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createList'
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
 *               $ref: '#/components/schemas/list'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/list'
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
 *                  slug:
 *                    type: string
 *                  name:
 *                    type: string
 *     createList:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         language:
 *           type: string
 *         public:
 *           type: boolean
 */
export default api(async ({ headers, query }) => {
  const user = await auth(headers);
  const { username } = validate(query, GetUser);

  or(() => current(user, username), () => role(user, 'admin'));

  return { username };
}, {
  get: async ({ username }) => {
    const data = await User.findOne({ username });

    exists(data, 'user', username);

    return data.lists.map((l) => ({
      slug: l.slug,
      name: l.name
    }));
  },
  post: async ({ username }, { body }) => {
    const { name, language, public: p } = validate(body, CreateList);
    const slug = slugify(name, {
      replacement: '_',
      lower: true,
      strict: true
    });
    const data = await User.findOneAndUpdate({ username }, {
      $push: {
        lists: {
          slug,
          name,
          language,
          public: p,
          words: []
        }
      }
    }, { new: true });

    exists(data, 'user', username);

    const list = data.lists.find((l) => l.slug === slug);

    exists(list, 'list', slug);

    return {
      slug: list.slug,
      name: list.name,
      language: list.language,
      public: list.public
    };
  }
});
