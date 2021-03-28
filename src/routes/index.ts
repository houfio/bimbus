import { withResponse } from '../middleware/withResponse';
import { route } from '../utils/route';

import { fallbackRoute } from './fallback';
import { loginRoute } from './login';
import { usersRoute } from './users';

/**
 * @openapi
 * /:
 *   get:
 *     summary: Get basic information about the api
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200'
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
export const indexRoute = route('', loginRoute, usersRoute, fallbackRoute)(
  withResponse('get', (ctx, { headers }) => ({
    version: 1,
    docs: `${headers.host}/docs`
  }))
);
