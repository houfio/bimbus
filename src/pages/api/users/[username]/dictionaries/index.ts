import { getUserData } from 'middleware/getUserData';
import { Dictionary } from 'models/Dictionary';
import slugify from 'slugify';
import { CreateList } from 'structs/CreateList';
import { GetUser } from 'structs/GetUser';
import { api } from 'utils/api/api';
import { auth } from 'utils/api/guards/auth';
import { validate } from 'utils/api/guards/validate';

/**
 * @openapi
 * /users/{username}/dictionaries:
 *   parameters:
 *     - $ref: '#/components/parameters/username'
 *   get:
 *     summary: Get all dictionaries
 *     tags:
 *       - dictionaries
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
 *               $ref: '#/components/schemas/dictionaries'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/dictionaries'
 *   post:
 *     summary: Create a dictionary
 *     tags:
 *       - dictionaries
 *     security:
 *       - apiKey: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createDictionary'
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
 *               $ref: '#/components/schemas/dictionary'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/dictionary'
 * components:
 *   schemas:
 *     dictionaries:
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
 *     createDictionary:
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
  const currentUser = await auth(headers);
  const { username } = validate(query, GetUser);

  const user = await getUserData(currentUser, username);

  return { user };
}, {
  get: async ({ user }) => {
    const dictionaries = await Dictionary.find({
      _id: { $in: user.dictionaries }
    });

    return dictionaries.map((d) => ({
      slug: d.slug,
      name: d.name
    }));
  },
  post: async ({ user }, { body }) => {
    const { name, language, public: p } = validate(body, CreateList);
    const dictionary = await Dictionary.create({
      slug: slugify(name, {
        replacement: '_',
        lower: true,
        strict: true
      }),
      name,
      language,
      public: p
    });

    user.dictionaries.push(dictionary._id);
    await user.save();

    return {
      slug: dictionary.slug,
      name: dictionary.name,
      language: dictionary.language,
      public: dictionary.public
    };
  }
});
