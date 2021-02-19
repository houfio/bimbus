import { NextApiRequest, NextApiResponse } from 'next';

import { handle } from '../../utils/api/handle';

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
export default (req: NextApiRequest, res: NextApiResponse) => handle(req, res, {
  get: async () => ({
    version: 1,
    docs: `${req.headers.host}/docs`
  })
});
