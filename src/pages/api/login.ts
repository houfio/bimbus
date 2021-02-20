import { UnauthenticatedError } from 'errors/UnauthenticatedError';
import { sign } from 'jsonwebtoken';
import { User } from 'models/User';
import { Authenticate } from 'structs/Authenticate';
import { api } from 'utils/api/api';
import { exists } from 'utils/api/guards/exists';
import { validate } from 'utils/api/guards/validate';

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
 *         description: Validation error
 *       401:
 *         description: Unauthenticated
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
 *     authentication:
 *       allOf:
 *         - $ref: '#/components/schemas/response'
 *         - type: object
 *           properties:
 *             data:
 *              type: object
 *              nullable: true
 *              properties:
 *                token:
 *                  type: string
 *                role:
 *                  $ref: '#/components/schemas/role'
 */
export default api({
  post: async ({ body }) => {
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
