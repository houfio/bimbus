import { auth } from 'guards/auth';
import { role } from 'guards/role';
import { validate } from 'guards/validate';
import { User } from 'models/User';
import { CreateUser } from 'structs/CreateUser';
import { resolve } from 'utils/resolve';

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
 *       401:
 *         $ref: '#/components/responses/401'
 *       403:
 *         $ref: '#/components/responses/403'
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
 *       default:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       400:
 *         $ref: '#/components/responses/400'
 * components:
 *   schemas:
 *     users:
 *       allOf:
 *         - $ref: '#/components/schemas/response'
 *         - type: object
 *           properties:
 *             data:
 *               type: array
 *               nullable: true
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   role:
 *                     $ref: '#/components/schemas/role'
 *                 required:
 *                 - username
 *                 - role
 *           required:
 *             - data
 *     createUser:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         email:
 *           type: string
 *       required:
 *         - username
 *         - password
 *         - email
 */
export default resolve()({
  get: async (value, { headers }) => {
    const user = await auth(headers);

    role(user, 'admin');

    const data = await User.find();

    return data.map((u) => {
      const { username, role: r } = u.toObject();

      return {
        username,
        role: r
      };
    });
  },
  post: async (value, { body }) => {
    const { username, password, email } = validate(body, CreateUser);
    const data = await User.create({
      username,
      password,
      email
    });

    return {
      username: data.username,
      email: data.email,
      role: data.role,
      dictionaries: data.dictionaries.length
    };
  }
});
