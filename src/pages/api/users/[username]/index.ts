import { User } from 'models/User';
import { GetUser } from 'structs/GetUser';
import { UpdateUser } from 'structs/UpdateUser';
import { api } from 'utils/api/api';
import { auth } from 'utils/api/guards/auth';
import { current } from 'utils/api/guards/current';
import { exists } from 'utils/api/guards/exists';
import { or } from 'utils/api/guards/or';
import { role } from 'utils/api/guards/role';
import { validate } from 'utils/api/guards/validate';

/**
 * @openapi
 * /users/{username}:
 *   get:
 *     summary: Get a user
 *     tags:
 *       - users
 *     security:
 *       - apiKey: []
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username of the user
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Resource not found
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
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateUser'
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Resource not found
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
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username of the user
 *     responses:
 *       204:
 *         description: Successful operation
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Resource not found
 *       default:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/empty'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/empty'
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
 *     updateUser:
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *         email:
 *           type: string
 */
export default api({
  get: async ({ headers, query }) => {
    const user = await auth(headers);
    const { username } = validate(query, GetUser);

    or(() => current(user, username), () => role(user, 'admin'));

    const data = await User.findOne({ username });

    exists(data, 'user', username);

    return {
      username: data.username,
      email: data.email,
      role: data.role
    };
  },
  put: async ({ headers, query, body }) => {
    const user = await auth(headers);
    const { username } = validate(query, GetUser);

    or(() => current(user, username), () => role(user, 'admin'));

    const { password, email } = validate(body, UpdateUser);
    const data = await User.findOneAndUpdate({ username }, {
      $set: { password, email }
    }, { new: true });

    exists(data, 'user', username);

    return {
      username: data.username,
      email: data.email,
      role: data.role
    };
  },
  delete: async ({ headers, query }) => {
    const user = await auth(headers);
    const { username } = validate(query, GetUser);

    or(() => current(user, username), () => role(user, 'admin'));

    const data = await User.findOneAndDelete({ username });

    exists(data, 'user', username);

    return undefined;
  }
});
