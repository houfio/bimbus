import { auth } from '../../guards/auth';
import { role } from '../../guards/role';
import { withBodyData } from '../../middleware/withBodyData';
import {withQueryData} from '../../middleware/withQueryData';
import { withResponse } from '../../middleware/withResponse';
import { User } from '../../models/User';
import { CreateUser } from '../../structs/CreateUser';
import {PaginationFilters} from '../../structs/filters/PaginationFilters';
import {UserFilters} from '../../structs/filters/UserFilters';
import {filter} from '../../utils/filter';
import { route } from '../../utils/route';

import { userRoute } from './user';

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - users
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200'
 *       401:
 *         $ref: '#/components/responses/401'
 *       403:
 *         $ref: '#/components/responses/403'
 *       default:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *     parameters:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/size'
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum:
 *             - admin
 *             - user
 *   post:
 *     summary: Create a user
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createUser'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200'
 *       default:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       400:
 *         $ref: '#/components/responses/400'
 * components:
 *   schemas:
 *     users:
 *       allOf:
 *         - $ref: '#/components/schemas/response'
 *         - type: object
 *           properties:
 *             data:
 *               type: array
 *               nullable: true
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   role:
 *                     $ref: '#/components/schemas/role'
 *                 required:
 *                 - username
 *                 - role
 *           required:
 *             - data
 *     createUser:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         email:
 *           type: string
 *       required:
 *         - username
 *         - password
 *         - email
 */
export const usersRoute = route('/users', userRoute)(
  withQueryData(UserFilters, 'filters'),
  withQueryData(PaginationFilters, 'pagination'),
  withResponse('get', async ({ filters, pagination }, { headers }) => {
    const user = await auth(headers);

    role(user, 'admin');

    return await User.paginate({
      username: { $regex: filters.username ?? '' },
      ...filter('role', filters.role)
    }, {
      page: pagination.page + 1,
      limit: pagination.size
    });
  }),
  withBodyData(CreateUser),
  withResponse('post', async ({ body: { username, password, email } }) => User.create({
    username,
    password,
    email,
    role: username === 'admin' ? username : undefined
  }))
);
