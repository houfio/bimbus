import { withAuthentication } from 'middleware/withAuthentication';
import { withDictionaryData } from 'middleware/withDictionaryData';
import { withQueryData } from 'middleware/withQueryData';
import { withUserData } from 'middleware/withUserData';
import { GetDictionary } from 'structs/GetDictionary';
import { resolve } from 'utils/api/resolve';

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
 *   delete:
 *     summary: Delete a dictionary
 *     tags:
 *       - dictionaries
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
 *     dictionary:
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
  delete: async ({ dictionary }) => {
    await dictionary.delete();

    return undefined;
  }
});
