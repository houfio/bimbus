import { withGameData } from '../../middleware/withGameData';
import { withQueryData } from '../../middleware/withQueryData';
import { withResponse } from '../../middleware/withResponse';
import { withUserData } from '../../middleware/withUserData';
import { GetGame } from '../../structs/GetGame';
import { AuthCtx } from '../../types';
import { route } from '../../utils/route';

/**
 * @openapi
 * /users/{username}/games/{opponent}:
 *   parameters:
 *     - $ref: '#/components/parameters/username'
 *     - $ref: '#/components/parameters/opponent'
 *     - $ref: '#/components/parameters/include'
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
 *               $ref: '#/components/schemas/game'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/game'
 * components:
 *   schemas:
 *     game:
 *       type: object
 *       properties:
 *         host:
 *           type: string
 *         opponent:
 *           type: string
 *         completed:
 *           type: boolean
 *         dictionary:
 *           type: string
 *         hostScore:
 *           type: integer
 *         opponentScore:
 *           type: integer
 *         word:
 *           type: string
 *           nullable: true
 *       required:
 *         - username
 *         - opponent
 */
export const gameRoute = route<AuthCtx>('/:opponent')(
  withQueryData(GetGame),
  withUserData((ctx) => [ctx.query.username, ctx.currentUser]),
  withUserData((ctx) => ctx.query.opponent, (value, ctx) => ({ ...ctx, opponent: value })),
  withGameData((ctx) => [ctx.user, ctx.opponent]),
  withResponse('get', async ({ game }) => game)
);
