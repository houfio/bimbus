import { withAuthentication } from '../../middleware/withAuthorization';
import { withBodyData } from '../../middleware/withBodyData';
import { withQueryData } from '../../middleware/withQueryData';
import { withResponse } from '../../middleware/withResponse';
import { withUserData } from '../../middleware/withUserData';
import { GetUser } from '../../structs/GetUser';
import { UpdateUser } from '../../structs/UpdateUser';
import { route } from '../../utils/route';
import { dictionariesRoute } from '../dictionaries';
import { gamesRoute } from '../games';

/**
 * @openapi
 * /users/{username}:
 *   parameters:
 *     - $ref: '#/components/parameters/username'
 *     - $ref: '#/components/parameters/include'
 *   get:
 *     summary: Get a user
 *     tags:
 *       - users
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
 *               $ref: '#/components/schemas/user'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *   put:
 *     summary: Update a user
 *     tags:
 *       - users
 *     security:
 *       - apiKey: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateUser'
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
 *               $ref: '#/components/schemas/user'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - users
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
 *               $ref: '#/components/schemas/user'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/user'
 * components:
 *   schemas:
 *     user:
 *       allOf:
 *         - $ref: '#/components/schemas/response'
 *         - type: object
 *           properties:
 *             data:
 *               type: object
 *               nullable: true
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   $ref: '#/components/schemas/role'
 *                 dictionaries:
 *                   type: integer
 *               required:
 *                 - username
 *                 - email
 *                 - role
 *                 - dictionaries
 *           required:
 *             - data
 *     updateUser:
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *         email:
 *           type: string
 *       required:
 *         - password
 *         - email
 */
export const userRoute = route('/:username', dictionariesRoute, gamesRoute)(
  withAuthentication(true),
  withQueryData(GetUser),
  withUserData((ctx) => [ctx.query.username, ctx.currentUser]),
  withResponse('get', ({ user }) => user),
  withResponse('delete', async ({ user }) => {
    await user.delete();

    return user;
  }),
  withBodyData(UpdateUser),
  withResponse('post', async ({ user, body: { password, email } }) => {
    user.password = password;
    user.email = email;

    await user.save();

    return user;
  })
);
