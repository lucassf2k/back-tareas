import { Express, Router } from 'express';
import { userRoutes } from '@/infrastructure/express/routes/user-routes';
import { taskRoutes } from '@/infrastructure/express/routes/task-routes';
import { authorizationMiddleware } from '@/infrastructure/express/middlewares/authentication';

export function setupRoutes(app: Express) {
  const router = Router();
  userRoutes(router);
  taskRoutes(router, authorizationMiddleware);
  app.use('/api', router);
}
