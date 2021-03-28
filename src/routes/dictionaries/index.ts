import slugify from 'slugify';

import { withAuthentication } from '../../middleware/withAuthorization';
import { withBodyData } from '../../middleware/withBodyData';
import { withQueryData } from '../../middleware/withQueryData';
import { withResponse } from '../../middleware/withResponse';
import { withUserData } from '../../middleware/withUserData';
import { Dictionary } from '../../models/Dictionary';
import { CreateDictionary } from '../../structs/CreateDictionary';
import { DictionaryFilters } from '../../structs/filters/DictionaryFilters';
import { PaginationFilters } from '../../structs/filters/PaginationFilters';
import { GetUser } from '../../structs/GetUser';
import { filter } from '../../utils/filter';
import { route } from '../../utils/route';

import { dictionaryRoute } from './dictionary';

/**
 * @openapi
 * /users/{username}/dictionaries:
 *   parameters:
 *     - $ref: '#/components/parameters/username'
 *   get:
 *     summary: Get all dictionaries
 *     tags:
 *       - dictionaries
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200'
 *       400:
 *         $ref: '#/components/responses/400'
 *       401:
 *         $ref: '#/components/responses/401'
 *       403:
 *         $ref: '#/components/responses/403'
 *       404:
 *         $ref: '#/components/responses/404'
 *       default:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/dictionaries'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/dictionaries'
 *     parameters:
 *       - in: query
 *         name: public
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/size'
 *   post:
 *     summary: Create a dictionary
 *     tags:
 *       - dictionaries
 *     security:
 *       - apiKey: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createDictionary'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200'
 *       400:
 *         $ref: '#/components/responses/400'
 *       401:
 *         $ref: '#/components/responses/401'
 *       403:
 *         $ref: '#/components/responses/403'
 *       404:
 *         $ref: '#/components/responses/404'
 *       default:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/dictionary'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/dictionary'
 * components:
 *   schemas:
 *     dictionaries:
 *       allOf:
 *         - $ref: '#/components/schemas/paginatedResponse'
 *         - type: object
 *           properties:
 *             data:
 *               type: array
 *               nullable: true
 *               items:
 *                 type: object
 *                 properties:
 *                   slug:
 *                     type: string
 *                   name:
 *                     type: string
 *                 required:
 *                   - slug
 *                   - name
 *           required:
 *             - data
 *     createDictionary:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         language:
 *           type: string
 *         public:
 *           type: boolean
 *       required:
 *         - name
 *         - language
 *         - public
 */
export const dictionariesRoute = route('/dictionaries', dictionaryRoute)(
  withAuthentication(),
  withQueryData(GetUser),
  withUserData(),
  withQueryData(DictionaryFilters, 'filters'),
  withQueryData(PaginationFilters, 'pagination'),
  withResponse('get', ({ user, filters, pagination }) => Dictionary.paginate({
    _id: { $in: user.dictionaries },
    ...filter('public', filters.public),
    ...filter('language', filters.language)
  }, {
    page: pagination.page + 1,
    limit: pagination.size
  })),
  withBodyData(CreateDictionary),
  withResponse('post', async ({ user, body: { name, language, public: p } }) => {
    const dictionary = await Dictionary.create({
      slug: slugify(name, {
        replacement: '_',
        lower: true,
        strict: true
      }),
      name,
      language,
      public: p
    });

    user.dictionaries.push(dictionary._id);
    await user.save();

    return dictionary;
  })
);
