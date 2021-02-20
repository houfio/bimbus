import { User } from '../../../models/User';
import { GetUser } from '../../../structs/GetUser';
import { UpdateUser } from '../../../structs/UpdateUser';
import { api } from '../../../utils/api/api';
import { exists } from '../../../utils/api/exists';
import { validate } from '../../../utils/api/validate';

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
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 username:
 *                   type: string
 *     updateUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 */
export default api({
  get: async ({ query }) => {
    const { username } = validate(query, GetUser);
    const user = await User.findOne({ username });

    exists(user, 'user', username);

    return {
      id: user._id.toString(),
      email: user.email,
      username: user.username
    };
  },
  put: async ({ query, body }) => {
    const { username } = validate(query, GetUser);
    const { email, password } = validate(body, UpdateUser);
    const user = await User.findOneAndUpdate({ username }, {
      $set: { email, password }
    }, { new: true });

    exists(user, 'user', username);

    return {
      id: user._id.toString(),
      email: user.email,
      username: user.username
    };
  },
  delete: async ({ query }) => {
    const { username } = validate(query, GetUser);
    const user = await User.findOneAndDelete({ username });

    exists(user, 'user', username);

    return undefined;
  }
});
