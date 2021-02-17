import { NextApiRequest, NextApiResponse } from 'next';

import { User } from '../../../models/User';
import { connect } from '../../../utils/connect';
import { respond } from '../../../utils/respond';

/**
 * @openapi
 * /users/{username}:
 *   get:
 *     summary: Get a specific user by username
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
 *              type: object
 *              nullable: true
 *              properties:
 *                id:
 *                  type: string
 *                email:
 *                  type: string
 *                username:
 *                  type: string
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connect();

  const { username } = req.query;

  if (typeof username !== 'string') {
    return respond(req, res, undefined, new Error('invalid username type'));
  }

  const user = await User.findOne({ username });

  if (!user) {
    return respond(req, res, undefined, new Error('username not found'));
  }

  respond(req, res, {
    id: user.id,
    email: user.email,
    username: user.username
  });
}

