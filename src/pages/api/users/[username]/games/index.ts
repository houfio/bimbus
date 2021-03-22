import { HttpError } from 'errors/HttpError';
import { validate } from 'guards/validate';
import { withAuthentication } from 'middleware/withAuthentication';
import { withQueryData } from 'middleware/withQueryData';
import { withUserData } from 'middleware/withUserData';
import { Dictionary } from 'models/Dictionary';
import { Game } from 'models/Game';
import { User } from 'models/User';
import { CreateGame } from 'structs/CreateGame';
import { PaginationFilters } from 'structs/filters/PaginationFilters';
import { GetUser } from 'structs/GetUser';
import { paginated } from 'utils/paginated';
import { resolve } from 'utils/resolve';

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
export default resolve(
  withAuthentication(),
  withQueryData(GetUser),
  withUserData(),
  withQueryData(PaginationFilters, 'pagination')
)({
  get: async ({ user, pagination }) => {
    const data = await Game.paginate({ 'host.user': user.id }, {
      page: pagination.page + 1,
      limit: pagination.size
    });

    return paginated(data, (game) => ({
      dictionary: game.dictionary,
      host: game.host.user,
      opponent: game.opponent.user
    }));
  },
  post: async ({ user }, { body }) => {
    const { dictionary, opponent } = validate(body, CreateGame);

    const opponentData = await User.findOne({username: opponent}).exec();
    const dictionaryData = await Dictionary.findOne({name: dictionary}).exec();

    if (opponentData === null) {
      throw new HttpError('Could not find user', 404);
    }

    if (dictionaryData === null) {
      throw new HttpError('Could not find dictionary', 404);
    }

    if (opponentData._id.toString() === user._id.toString()) {
      throw new HttpError('Cannot create game with self', 422);
    }

    const game = await Game.create({
      dictionary: dictionaryData._id.toString(),
      host: { user: user._id.toString() },
      opponent: { user: opponentData._id.toString() }
    });

    return {
      dictionary: game.dictionary,
      host: game.host.user,
      opponent: game.opponent.user
    };
  }
});
