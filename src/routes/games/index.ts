import { HttpError } from '../../errors/HttpError';
import { exists } from '../../guards/exists';
import { withAuthentication } from '../../middleware/withAuthorization';
import { withBodyData } from '../../middleware/withBodyData';
import { withQueryData } from '../../middleware/withQueryData';
import { withResponse } from '../../middleware/withResponse';
import { withUserData } from '../../middleware/withUserData';
import { Dictionary } from '../../models/Dictionary';
import { Game } from '../../models/Game';
import { User } from '../../models/User';
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
 *   get:
 *     summary: Get all dictionaries
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
  withUserData(),
  withQueryData(PaginationFilters, 'pagination'),
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
  withResponse('post', async ({ user, body: { dictionary, opponent } }) => {
    const opponentData = await User.findOne({ username: opponent });
    const dictionaryData = await Dictionary.findOne({ slug: dictionary });

    exists(opponentData, 'user', opponent);
    exists(dictionaryData, 'dictionary', dictionary);

    if (opponentData._id.equals(user._id)) {
      throw new HttpError('Cannot create a game with yourself', 422);
    }

    return await Game.create({
      dictionary: dictionaryData._id,
      host: { user: user._id },
      opponent: { user: opponentData._id }
    });
  })
);
