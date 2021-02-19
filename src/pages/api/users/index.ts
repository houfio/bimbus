import { NextApiRequest, NextApiResponse } from 'next';

import { User } from '../../../models/User';
import { post } from '../../../utils/api/response/post';
import { CreateUser } from '../../../structs/CreateUser';
import { get } from '../../../utils/api/response/get';

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
 *     summary: Create a new user
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
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await get(req, res, async () => {
    const users = await User.find();

    return users.map((u) => {
      const { id, email, username } = u.toObject();

      return {
        id,
        email,
        username
      };
    });
  });

  await post(req, res, CreateUser, async ({ email, password, username }) => {
    const user = await User.create({
      email,
      password,
      username
    });

    return {
      id: user.id,
      email: user.email,
      username: user.username
    };
  });
}
