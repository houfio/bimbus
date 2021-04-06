import { withAuthentication } from '../../middleware/withAuthorization';
import { withBodyData } from '../../middleware/withBodyData';
import { withDictionaryData } from '../../middleware/withDictionaryData';
import { withQueryData } from '../../middleware/withQueryData';
import { withResponse } from '../../middleware/withResponse';
import { withUserData } from '../../middleware/withUserData';
import { CreateWord } from '../../structs/CreateWord';
import { GetDictionary } from '../../structs/GetDictionary';
import { route } from '../../utils/route';

import { wordRoute } from './word';

/**
 * @openapi
 * /users/{username}/dictionaries/{slug}/words:
 *   parameters:
 *     - $ref: '#/components/parameters/username'
 *     - $ref: '#/components/parameters/slug'
 *   get:
 *     summary: Get all words
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
 *               $ref: '#/components/schemas/words'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/words'
 *   post:
 *     summary: Create a word
 *     tags:
 *       - words
 *     security:
 *       - apiKey: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createWord'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200'
 *       default:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/word'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/word'
 *       400:
 *         $ref: '#/components/responses/400'
 * components:
 *   schemas:
 *     words:
 *       allOf:
 *         - $ref: '#/components/schemas/response'
 *         - type: object
 *           properties:
 *             data:
 *               type: array
 *               nullable: true
 *               items:
 *                 type: string
 *           required:
 *             - data
 *     createWord:
 *       type: object
 *       properties:
 *         word:
 *           type: string
 *       required:
 *         - word
 */
export const wordsRoute = route('/words', wordRoute)(
  withAuthentication(),
  withQueryData(GetDictionary),
  withUserData(),
  withDictionaryData(),
  withResponse('get', ({ dictionary }) => dictionary.words),
  withBodyData(CreateWord),
  withResponse('post', async ({ dictionary, body: { word } }) => {
    dictionary.words.push(word);
    await dictionary.save();

    return { word };
  })
);
