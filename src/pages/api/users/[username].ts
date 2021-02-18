import { NextApiRequest, NextApiResponse } from 'next';

import { User } from '../../../models/User';
import { GetUser } from '../../../structs/GetUser';
import { connect } from '../../../utils/api/connect';
import { respond } from '../../../utils/api/respond';
import { validate } from '../../../utils/api/validate';

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

  if (!validate(req, res, req.query, GetUser)) {
    return;
  }

  const user = await User.findOne({
    username: req.query.username
  });

  if (!user) {
    return respond(req, res, undefined, new Error('Username not found'), 404);
  }

  respond(req, res, {
    id: user.id,
    email: user.email,
    username: user.username
  });
}
