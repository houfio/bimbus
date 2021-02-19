import { NextApiRequest, NextApiResponse } from 'next';

import { get } from '../../utils/api/response/get';

/**
 * @openapi
 * /:
 *   get:
 *     summary: Get basic information about the api
 *     responses:
 *       200:
 *         description: Successful operation
 *       default:
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
 *                docs:
 *                  type: string
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await get(req, res, async () => ({
    version: 1,
    docs: `${req.headers.host}/docs`
  }));
}
