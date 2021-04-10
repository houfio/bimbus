import { withAuthentication } from '../../middleware/withAuthorization';
import { withBodyData } from '../../middleware/withBodyData';
import { withDictionaryData } from '../../middleware/withDictionaryData';
import { withQueryData } from '../../middleware/withQueryData';
import { withResponse } from '../../middleware/withResponse';
import { withUserData } from '../../middleware/withUserData';
import { Game } from '../../models/Game';
import { GetDictionary } from '../../structs/GetDictionary';
import { UpdateDictionary } from '../../structs/UpdateDictionary';
import { route } from '../../utils/route';
import { wordsRoute } from '../words';

/**
 * @openapi
 * /users/{username}/dictionaries/{slug}:
 *   parameters:
 *     - $ref: '#/components/parameters/username'
 *     - $ref: '#/components/parameters/slug'
 *     - $ref: '#/components/parameters/include'
 *   get:
 *     summary: Get a dictionary
 *     tags:
 *       - dictionaries
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200'
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
 *         $ref: '#/components/responses/200'
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
 *         $ref: '#/components/responses/200'
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
export const dictionaryRoute = route('/:slug', wordsRoute)(
  withAuthentication(),
  withQueryData(GetDictionary),
  withUserData((ctx) => [ctx.query.username, ctx.currentUser]),
  withDictionaryData((ctx) => [ctx.query.slug, ctx.user]),
  withResponse('get', ({ dictionary }) => dictionary),
  withResponse('delete', async ({ dictionary }) => {
    await Game.deleteMany({ 'dictionary': dictionary._id });

    await dictionary.delete();

    return dictionary;
  }),
  withBodyData(UpdateDictionary),
  withResponse('post', async ({ dictionary, body: { name, language, public: p } }) => {
    dictionary.name = name;
    dictionary.language = language;
    dictionary.public = p;

    await dictionary.save();

    return dictionary;
  })
);
