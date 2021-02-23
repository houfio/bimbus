import { UnauthenticatedError } from 'errors/UnauthenticatedError';
import { exists } from 'guards/exists';
import { validate } from 'guards/validate';
import { sign } from 'jsonwebtoken';
import { User } from 'models/User';
import { Authenticate } from 'structs/Authenticate';
import { resolve } from 'utils/resolve';

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
 *         description: Successful operation
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
export default resolve()({
  post: async (value, { body }) => {
    const { username, password } = validate(body, Authenticate);
    const data = await User.findOne({ username });

    exists(data, 'user', username);

    if (data.password !== password) {
      throw new UnauthenticatedError();
    }

    return {
      token: sign(data.username, process.env.SECRET || ''),
      role: data.role
    };
  }
});
