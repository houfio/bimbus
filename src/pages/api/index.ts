import { resolve } from 'utils/resolve';

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
 *               type: object
 *               nullable: true
 *               properties:
 *                 version:
 *                   type: integer
 *                 docs:
 *                   type: string
 *               required:
 *                 - version
 *                 - docs
 *           required:
 *             - data
 */
export default resolve()({
  get: async (data, { headers }) => ({
    version: 1,
    docs: `${headers.host}/docs`
  })
});
