import { resolve } from 'utils/resolve';

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
 *                docs:
 *                  type: string
 */
export default resolve()({
  get: async (value, { headers }) => ({
    version: 1,
    docs: `${headers.host}/docs`
  })
});
