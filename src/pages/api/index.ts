import { NextApiRequest, NextApiResponse } from 'next';

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
 *              properties:
 *                version:
 *                  type: integer
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  const body = {
    status: {
      success: true,
      error: null
    },
    data: {
      version: 1
    }
  };

  respond('index', body, req, res);
}
