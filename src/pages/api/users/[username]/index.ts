import { getUserData } from 'middleware/getUserData';
import { GetUser } from 'structs/GetUser';
import { UpdateUser } from 'structs/UpdateUser';
import { api } from 'utils/api/api';
import { auth } from 'utils/api/guards/auth';
import { validate } from 'utils/api/guards/validate';

/**
 * @openapi
 * /users/{username}:
 *   parameters:
 *     - $ref: '#/components/parameters/username'
 *   get:
 *     summary: Get a user
 *     tags:
 *       - users
 *     security:
 *       - apiKey: []
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
 *                 dictionaries:
 *                   type: integer
 *     updateUser:
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *         email:
 *           type: string
 */
export default api(async ({ headers, query }) => {
  const user = await auth(headers);
  const { username } = validate(query, GetUser);

  const data = await getUserData(user, username);

  return { user: data };
}, {
  get: async ({ user }) => ({
    username: user.username,
    email: user.email,
    role: user.role,
    dictionaries: user.dictionaries.length
  }),
  put: async ({ user }, { body }) => {
    const { password, email } = validate(body, UpdateUser);

    user.password = password;
    user.email = email;

    await user.save();

    return {
      username: user.username,
      email: user.email,
      role: user.role,
      dictionaries: user.dictionaries.length
    };
  },
  delete: async ({ user }) => {
    await user.delete();

    return undefined;
  }
});
