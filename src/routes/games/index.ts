import { HttpError } from '../../errors/HttpError';
import { withAuthentication } from '../../middleware/withAuthorization';
import { withBodyData } from '../../middleware/withBodyData';
import { withDictionaryData } from '../../middleware/withDictionaryData';
import { withQueryData } from '../../middleware/withQueryData';
import { withResponse } from '../../middleware/withResponse';
import { withUserData } from '../../middleware/withUserData';
import { Game } from '../../models/Game';
import { CreateGame } from '../../structs/CreateGame';
import { PaginationFilters } from '../../structs/filters/PaginationFilters';
import { GetUser } from '../../structs/GetUser';
import { route } from '../../utils/route';

import { gameRoute } from './game';

/**
 * @openapi
 * /users/{username}/games:
 *   parameters:
 *     - $ref: '#/components/parameters/username'
 *     - $ref: '#/components/parameters/include'
 *   get:
 *     summary: Get all games
 *     tags:
 *       - games
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
 *               $ref: '#/components/schemas/games'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/games'
 *     parameters:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/size'
 *   post:
 *     summary: Create a game
 *     tags:
 *       - games
 *     security:
 *       - apiKey: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createGame'
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
 *               $ref: '#/components/schemas/game'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/game'
 * components:
 *   schemas:
 *     games:
 *       allOf:
 *         - $ref: '#/components/schemas/paginatedResponse'
 *         - type: object
 *           properties:
 *             data:
 *               type: array
 *               nullable: true
 *               items:
 *                 type: object
 *                 properties:
 *                   dictionary:
 *                     type: string
 *                   hostId:
 *                     type: string
 *                   opponentId:
 *                     type: string
 *                 required:
 *                   - dictionary
 *                   - host
 *                   - opponent
 *           required:
 *             - dictionary
 *             - host
 *             - opponent
 *     createGame:
 *       type: object
 *       properties:
 *         dictionary:
 *           type: string
 *         opponent:
 *           type: string
 *       required:
 *         - dictionary
 *         - opponent
 */
export const gamesRoute = route('/games', gameRoute)(
  withAuthentication(),
  withQueryData(GetUser),
  withUserData((ctx) => [ctx.query.username, ctx.currentUser]),
  withQueryData(PaginationFilters, (value, ctx) => ({ ...ctx, pagination: value })),
  withResponse('get', ({ user, pagination }) => Game.paginate({
    $or: [
      { 'host.user': user.id },
      { 'opponent.user': user.id }
    ]
  }, {
    page: pagination.page + 1,
    limit: pagination.size
  })),
  withBodyData(CreateGame),
  withUserData((ctx) => ctx.body.opponent, (value, ctx) => ({ ...ctx, opponent: value })),
  withDictionaryData((ctx) => [ctx.body.dictionary, ctx.user]),
  withResponse('post', async ({ user, opponent, dictionary }) => {
    if (user.username === opponent.username) {
      throw new HttpError('Cannot create a game with yourself', 422);
    } else if (!dictionary.words.length) {
      throw new HttpError('Cannot create a game with an empty dictionary', 422);
    }

    return await Game.create({
      dictionary: dictionary._id,
      host: { user: user._id },
      opponent: { user: opponent._id },
      word: dictionary.words[Math.floor(Math.random() * dictionary.words.length)]
    });
  })
);
