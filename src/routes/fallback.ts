import { RouteError } from '../errors/RouteError';
import { withResponse } from '../middleware/withResponse';
import { route } from '../utils/route';

/**
 * @openapi
 * components:
 *   schemas:
 *     response:
 *       type: object
 *       properties:
 *         status:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             code:
 *               type: integer
 *             message:
 *               type: string
 *               nullable: true
 *             info:
 *               type: object
 *               nullable: true
 *           required:
 *             - success
 *             - code
 *             - message
 *             - info
 *       required:
 *         - status
 *     paginatedResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/response'
 *         - type: object
 *           properties:
 *             page:
 *               type: object
 *               properties:
 *                 current:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 size:
 *                   type: integer
 *               required:
 *                 - current
 *                 - total
 *                 - size
 *           required:
 *             - page
 *     role:
 *       type: string
 *       enum:
 *         - user
 *         - admin
 *   parameters:
 *     username:
 *       in: path
 *       name: username
 *       schema:
 *         type: string
 *       required: true
 *       description: The username of the user
 *     slug:
 *       in: path
 *       name: slug
 *       schema:
 *         type: string
 *       required: true
 *       description: The slug of the dictionary
 *     word:
 *       in: path
 *       name: word
 *       schema:
 *         type: string
 *       required: true
 *       description: The word
 *     page:
 *       in: query
 *       name: page
 *       schema:
 *         type: integer
 *       description: The current page
 *     size:
 *       in: query
 *       name: size
 *       schema:
 *         type: integer
 *       description: The size of a page
 *   responses:
 *     200:
 *       description: Successful operation
 *     400:
 *       description: Validation error
 *     401:
 *       description: Unauthenticated
 *     403:
 *       description: Unauthorized
 *     404:
 *       description: Resource not found
 *   securitySchemes:
 *     apiKey:
 *       type: http
 *       scheme: bearer
 * tags:
 *   - name: default
 *   - name: users
 *     description: Access to users
 *   - name: dictionaries
 *     description: Access to dictionaries
 *   - name: words
 *     description: Access to words
 *   - name: games
 *     description: Access to games
 */
export const fallbackRoute = route('*')(
  withResponse('all', (ctx, { originalUrl }) => {
    throw new RouteError(originalUrl);
  })
);
