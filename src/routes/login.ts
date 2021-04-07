import { sign } from 'jsonwebtoken';

import { AuthenticationError } from '../errors/AuthenticationError';
import { withBodyData } from '../middleware/withBodyData';
import { withResponse } from '../middleware/withResponse';
import { withUserData } from '../middleware/withUserData';
import { Authenticate } from '../structs/Authenticate';
import { route } from '../utils/route';

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Create an access token for a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/authenticate'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200'
 *       400:
 *         $ref: '#/components/responses/400'
 *       401:
 *         $ref: '#/components/responses/401'
 *       404:
 *         $ref: '#/components/responses/404'
 *       default:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/authentication'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/authentication'
 * components:
 *   schemas:
 *     authenticate:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - username
 *         - password
 *     authentication:
 *       allOf:
 *         - $ref: '#/components/schemas/response'
 *         - type: object
 *           properties:
 *             data:
 *               type: object
 *               nullable: true
 *               properties:
 *                 token:
 *                   type: string
 *                 role:
 *                   $ref: '#/components/schemas/role'
 *               required:
 *                 - token
 *                 - role
 *           required:
 *             - data
 */
export const loginRoute = route('/login')(
  withBodyData(Authenticate),
  withUserData((ctx) => ctx.body.username, undefined, false),
  withResponse('post', ({ body: { username, password }, user }) => {
    if (password !== user.password) {
      throw new AuthenticationError();
    }

    return {
      token: sign(username, process.env.SECRET || ''),
      role: user.role
    };
  })
);
