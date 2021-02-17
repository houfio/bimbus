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
 *             error:
 *               type: string
 *               nullable: true
 *   securitySchemes:
 *     apiKey:
 *       type: http
 *       scheme: bearer
 * tags:
 *   - name: default
 *   - name: users
 *     description: Access to user information
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
