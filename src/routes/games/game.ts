import { exists } from '../../guards/exists';
import { withAuthentication } from '../../middleware/withAuthorization';
import { withQueryData } from '../../middleware/withQueryData';
import { withResponse } from '../../middleware/withResponse';
import { withUserData } from '../../middleware/withUserData';
import { Game } from '../../models/Game';
import { User } from '../../models/User';
import { GetGame } from '../../structs/GetGame';
import { route } from '../../utils/route';

/**
 * @openapi
 * /users/{username}/games/{opponent}:
 *   parameters:
 *     - $ref: '#/components/parameters/username'
 *     - $ref: '#/components/parameters/opponent'
 *   get:
 *     summary: Get a game with an opponent
 *     tags:
 *       - games
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200'
 *       401:
 *         $ref: '#/components/responses/401'
 *       403:
 *         $ref: '#/components/responses/403'
 *       default:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/getGame'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/getGame'
 * components:
 *   schemas:
 *     getGame:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         opponent:
 *           type: string
 *       required:
 *         - username
 *         - opponent
 */
export const gameRoute = route('/:opponent')(
  withAuthentication(),
  withQueryData(GetGame),
  withUserData((ctx) => [ctx.query.username, ctx.currentUser]),
  withResponse('get', async ({ user, query: { opponent } }) => {
    const opponentData = await User.findOne({ username: opponent });

    exists(opponentData, 'user', opponent);

    const game = await Game.findOne({
      $or: [{
        $and: [
          { 'host.user': user.id },
          { 'opponent.user': opponentData.id }
        ]
      }, {
        $and: [
          { 'host.user': opponentData.id },
          { 'opponent.user': user.id }
        ]
      }],
      'completed': false
    });

    exists(game, 'game', opponent);

    return {
      roomId: `${game.host.user}-${game.opponent.user}`,
      ...game
    };
  })
);
