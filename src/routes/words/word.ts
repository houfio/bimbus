import { exists } from '../../guards/exists';
import { withAuthentication } from '../../middleware/withAuthorization';
import { withDictionaryData } from '../../middleware/withDictionaryData';
import { withQueryData } from '../../middleware/withQueryData';
import { withResponse } from '../../middleware/withResponse';
import { withUserData } from '../../middleware/withUserData';
import { GetWord } from '../../structs/GetWord';
import { route } from '../../utils/route';

/**
 * @openapi
 * /users/{username}/dictionaries/{slug}/words/{word}:
 *   parameters:
 *     - $ref: '#/components/parameters/username'
 *     - $ref: '#/components/parameters/slug'
 *     - $ref: '#/components/parameters/word'
 *   get:
 *     summary: Get a word
 *     tags:
 *       - words
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
 *               $ref: '#/components/schemas/word'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/word'
 *   delete:
 *     summary: Delete a word
 *     tags:
 *       - words
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
 *               $ref: '#/components/schemas/word'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/word'
 * components:
 *   schemas:
 *     word:
 *       allOf:
 *         - $ref: '#/components/schemas/response'
 *         - type: object
 *           properties:
 *             data:
 *               type: object
 *               nullable: true
 *               properties:
 *                 word:
 *                   type: string
 *           required:
 *             - data
 */
export const wordRoute = route('/:word')(
  withAuthentication(),
  withQueryData(GetWord),
  withUserData((ctx) => [ctx.query.username, ctx.currentUser]),
  withDictionaryData((ctx) => [ctx.query.slug, ctx.user]),
  withResponse('get', ({ dictionary, query: { word } }) => {
    exists(dictionary.words.includes(word), 'word', word);

    return { word };
  }),
  withResponse('delete', async ({ user, dictionary, query: { word } }) => {
    exists(dictionary.words.includes(word), 'word', word);

    await dictionary.update({
      $pull: { words: word }
    });

    return { word };
  })
);
