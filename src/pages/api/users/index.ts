import { NextApiRequest, NextApiResponse } from 'next';

import { User } from '../../../models/User';
import { connect } from '../../../utils/connect';
import { respond } from '../../../utils/respond';

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/users'
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
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connect();

  const users = await User.find();

  respond(req, res, users.map((u) => {
    const { id, email, username } = u.toObject();

    return {
      id,
      email,
      username: username || null
    };
  }));
}
