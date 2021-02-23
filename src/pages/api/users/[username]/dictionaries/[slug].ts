import { validate } from 'guards/validate';
import { withAuthentication } from 'middleware/withAuthentication';
import { withDictionaryData } from 'middleware/withDictionaryData';
import { withQueryData } from 'middleware/withQueryData';
import { withUserData } from 'middleware/withUserData';
import { GetDictionary } from 'structs/GetDictionary';
import { UpdateDictionary } from 'structs/UpdateDictionary';
import { resolve } from 'utils/resolve';

/**
 * @openapi
 * /users/{username}/dictionaries/{slug}:
 *   parameters:
 *     - $ref: '#/components/parameters/username'
 *     - $ref: '#/components/parameters/slug'
 *   get:
 *     summary: Get a dictionary
 *     tags:
 *       - dictionaries
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         description: Successful operation
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
 *               $ref: '#/components/schemas/dictionary'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/dictionary'
 *   put:
 *     summary: Update a dictionary
 *     tags:
 *       - dictionaries
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         description: Successful operation
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
 *               $ref: '#/components/schemas/dictionary'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/dictionary'
 *   delete:
 *     summary: Delete a dictionary
 *     tags:
 *       - dictionaries
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         description: Successful operation
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
 *               $ref: '#/components/schemas/dictionary'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/dictionary'
 * components:
 *   schemas:
 *     dictionary:
 *       allOf:
 *         - $ref: '#/components/schemas/response'
 *         - type: object
 *           properties:
 *             data:
 *               type: array
 *               nullable: true
 *               items:
 *                 type: object
 *                 properties:
 *                   slug:
 *                     type: string
 *                   name:
 *                     type: string
 *                   language:
 *                     type: string
 *                   public:
 *                     type: boolean
 *                 required:
 *                   - slug
 *                   - name
 *                   - language
 *                   - public
 *           required:
 *             - data
 */
export default resolve(
  withAuthentication(),
  withQueryData(GetDictionary),
  withUserData(),
  withDictionaryData()
)({
  get: async ({ dictionary }) => ({
    slug: dictionary.slug,
    name: dictionary.name,
    language: dictionary.language,
    public: dictionary.public
  }),
  put: async ({ dictionary }, { body }) => {
    const { name, language, public: p } = validate(body, UpdateDictionary);

    dictionary.name = name;
    dictionary.language = language;
    dictionary.public = p;

    await dictionary.save();

    return {
      slug: dictionary.slug,
      name: dictionary.name,
      language: dictionary.language,
      public: dictionary.public
    };
  },
  delete: async ({ dictionary }) => {
    await dictionary.delete();

    return undefined;
  }
});
