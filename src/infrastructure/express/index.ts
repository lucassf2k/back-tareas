import express from 'express';
import pinoHttp from 'pino-http';
import cors from 'cors';
import 'express-async-errors';
import { setupRoutes } from '@/infrastructure/express/routes';
import { envs } from '@/infrastructure/configurations/environments';
import { errorHandler } from '@/infrastructure/express/middlewares/error-handler';
import { Logger } from '@/infrastructure/configurations/logger';

export function ExpressApp() {
  const app = express();
  app.use(pinoHttp);
  app.use(express.json());
  app.use(cors());
  setupRoutes(app);
  app.use(errorHandler);
  app.listen(envs.APP_PORT, () =>
    Logger.info(`HTTP server running on PORT ${envs.APP_PORT}`),
  );
}
