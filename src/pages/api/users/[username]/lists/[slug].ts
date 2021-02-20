import { api } from 'utils/api/api';

/**
 * @openapi
 * /users/{username}/lists/{slug}:
 *   parameters:
 *     - $ref: '#/components/parameters/username'
 *     - $ref: '#/components/parameters/slug'
 *   get:
 *     summary: Get a list
 *     tags:
 *       - lists
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Resource not found
 *       default:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/lists'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/lists'
 * components:
 *   schemas:
 *     list:
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
 *                  slug:
 *                    type: string
 *                  name:
 *                    type: string
 *                  language:
 *                    type: string
 *                  public:
 *                    type: boolean
 */
export default api({});
