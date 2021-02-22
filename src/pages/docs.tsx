import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

import { generateSpec } from '../utils/generateSpec';

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
 *     error:
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
 *   responses:
 *     400:
 *       description: Validation error
 *     401:
 *       description: Unauthenticated
 *     403:
 *       description: Unauthorized
 *     404:
 *       description: Resource error
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
  return {
    props: {
      spec: generateSpec()
    }
  };
}
