import { authorize } from '@thream/socketio-jwt';
import { config } from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import { createServer } from 'http';
import { connect } from 'mongoose';
import { Server } from 'socket.io';
import swaggerSpec from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { indexRoute } from './routes';
import { socketConnect } from './socket/connect';
import { respond } from './utils/respond';

async function main() {
  const app = express();
  const server = createServer(app);
  const io = new Server(server);
  const port = process.env.PORT ?? 8000;
  const database = process.env.DATABASE_URL ?? '';
  const spec = swaggerSpec({
    definition: {
      openapi: '3.0.3',
      info: {
        title: 'Bimbus',
        version: '1.0.0'
      },
      servers: [
        {
          url: '/'
        }
      ]
    },
    apis: ['src/routes/**/*.ts']
  });

  io.use(authorize({
    secret: process.env.SECRET || '',
    onAuthentication: async (decodedToken) => decodedToken
  }));

  io.on('connection', socketConnect);

  await connect(database, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

  app.use(express.json());
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
  app.use(express.static('public'));
  app.use(indexRoute.path, indexRoute(io));
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    respond(req, res, err);
  });

  server.listen(port, () => console.log(`Serving on port ${port}`));
}

config();
main();
