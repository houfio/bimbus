import { NextApiRequest, NextApiResponse } from 'next';

import { connect } from '../../utils/connect';
import { respond } from '../../utils/respond';

/**
 * @openapi
 * /:
 *   get:
 *     summary: Get basic information about the api
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/index'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/index'
 * components:
 *   schemas:
 *     index:
 *       allOf:
 *         - $ref: '#/components/schemas/response'
 *         - type: object
 *           properties:
 *             data:
 *              type: object
 *              nullable: true
 *              properties:
 *                version:
 *                  type: integer
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connect();

  respond(req, res, {
    version: 1
  });
}
