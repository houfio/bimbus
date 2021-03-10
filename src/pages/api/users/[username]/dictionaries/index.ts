import { validate } from 'guards/validate';
import { withAuthentication } from 'middleware/withAuthentication';
import { withQueryData } from 'middleware/withQueryData';
import { withUserData } from 'middleware/withUserData';
import { Dictionary } from 'models/Dictionary';
import slugify from 'slugify';
import { CreateDictionary } from 'structs/CreateDictionary';
import { DictionaryFilters } from 'structs/filters/DictionaryFilters';
import { PaginationFilters } from 'structs/filters/PaginationFilters';
import { GetUser } from 'structs/GetUser';
import { paginated } from 'utils/paginated';
import { resolve } from 'utils/resolve';

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
 *         description: Successful operation
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
 *         description: Successful operation
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
export default resolve(
  withAuthentication(),
  withQueryData(GetUser),
  withUserData(),
  withQueryData(DictionaryFilters, 'filters'),
  withQueryData(PaginationFilters, 'pagination')
)({
  get: async ({ user, filters, pagination }) => {
    const data = await Dictionary.paginate({
      _id: { $in: user.dictionaries },
      public: { $eq: filters.public },
      language: { $eq: filters.language?.toLowerCase() }
    }, {
      page: pagination.page + 1,
      limit: pagination.size
    });

    return paginated(data, (dictionary) => ({
      slug: dictionary.slug,
      name: dictionary.name
    }));
  },
  post: async ({ user }, { body }) => {
    const { name, language, public: p } = validate(body, CreateDictionary);
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

    return {
      slug: dictionary.slug,
      name: dictionary.name,
      language: dictionary.language,
      public: dictionary.public
    };
  }
});
