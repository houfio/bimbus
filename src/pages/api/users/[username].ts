import { NextApiRequest, NextApiResponse } from 'next';

import { HttpError } from '../../../exceptions/HttpError';
import { User } from '../../../models/User';
import { CreateUser } from '../../../structs/CreateUser';
import { GetUser } from '../../../structs/GetUser';
import { get } from '../../../utils/api/response/get';
import { post } from '../../../utils/api/response/post';

/**
 * @openapi
 * /users/{username}:
 *   get:
 *     summary: Get a specific user
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
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await get(req, res, GetUser, async ({ username }) => {
    const user = await User.findOne({ username });

    if (!user) {
      throw new HttpError('Resource not found', 404);
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username
    };
  });
}
