import { validate } from 'guards/validate';
import { withAuthentication } from 'middleware/withAuthentication';
import { withQueryData } from 'middleware/withQueryData';
import { withUserData } from 'middleware/withUserData';
import { Dictionary } from 'models/Dictionary';
import slugify from 'slugify';
import { CreateDictionary } from 'structs/CreateDictionary';
import { GetUser } from 'structs/GetUser';
import { resolve } from 'utils/resolve';

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/dictionaries'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/dictionaries'
 *       400:
 *         $ref: '#/components/responses/400'
 *       401:
 *         $ref: '#/components/responses/401'
 *       403:
 *         $ref: '#/components/responses/403'
 *       404:
 *         $ref: '#/components/responses/404'
 *       default:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/error'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/dictionary'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/dictionary'
 *       400:
 *         $ref: '#/components/responses/400'
 *       401:
 *         $ref: '#/components/responses/401'
 *       403:
 *         $ref: '#/components/responses/403'
 *       404:
 *         $ref: '#/components/responses/404'
 *       default:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/error'
 * components:
 *   schemas:
 *     dictionaries:
 *       allOf:
 *         - $ref: '#/components/schemas/response'
 *         - type: object
 *           properties:
 *             data:
 *              type: array
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
export default resolve(
  withAuthentication(),
  withQueryData(GetUser),
  withUserData()
)({
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
    const { name, language, public: p } = validate(body, CreateDictionary);
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
