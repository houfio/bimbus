import { NextApiRequest, NextApiResponse } from 'next';

import { NotFoundException } from '../../../exceptions/NotFoundException';
import { User } from '../../../models/User';
import { GetUser } from '../../../structs/GetUser';
import { handle } from '../../../utils/api/handle';
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
 *         password:
 *           type: string
 */
export default (req: NextApiRequest, res: NextApiResponse) => handle(req, res, {
  get: async () => {
    const { username } = validate(req.query, GetUser);
    const user = await User.findOne({ username });

    if (!user) {
      throw new NotFoundException('user', username);
    }

    return {
      id: user._id.toString(),
      email: user.email,
      username: user.username
    };
  }
});
