import jsSpec from 'swagger-jsdoc';

export function generateSpec() {
  return jsSpec({
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
}
