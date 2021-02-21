import jsSpec from 'swagger-jsdoc';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

type Props = {
  spec: object
};

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
 *     empty:
 *       allOf:
 *         - $ref: '#/components/schemas/response'
 *         - type: object
 *           properties:
 *             data:
 *              type: object
 *              nullable: true
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
 */
export default function App({ spec }: Props) {
  return (
    <SwaggerUI spec={spec}/>
  );
}

export async function getStaticProps() {
  const spec = jsSpec({
    definition: {
      openapi: '3.0.3',
      info: {
        title: 'Bimbus',
        version: '1.0.0'
      },
      servers: [
        {
          url: '/api'
        }
      ]
    },
    apis: ['**/pages/**/*.ts?(x)']
  });

  return {
    props: { spec }
  };
}
