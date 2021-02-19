import { User } from '../../../models/User';
import { CreateUser } from '../../../structs/CreateUser';
import { api } from '../../../utils/api/api';
import { validate } from '../../../utils/api/validate';

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - users
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       default:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *   post:
 *     summary: Create a user
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createUser'
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Validation error
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
 *     users:
 *       allOf:
 *         - $ref: '#/components/schemas/response'
 *         - type: object
 *           properties:
 *             data:
 *              type: array
 *              nullable: true
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  email:
 *                    type: string
 *                  username:
 *                    type: string
 *     createUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         username:
 *           type: string
 */
export default api({
  get: async () => {
    const users = await User.find();

    return users.map((u) => {
      const { _id, email, username } = u.toObject();

      return {
        id: _id.toString(),
        email,
        username
      };
    });
  },
  post: async ({ body }) => {
    const { email, password, username } = validate(body, CreateUser);
    const user = await User.create({
      email,
      password,
      username
    });

    return {
      id: user._id.toString(),
      email: user.email,
      username: user.username
    };
  }
});
