import {
  makeCreateTaskController,
  makeDeleteTaskController,
  makeGetTaskController,
  makeListTaskController,
  makeUpdateTaskController,
} from '@/main/factories/task-factory';
import type { Handler, Router } from 'express';

export function taskRoutes(router: Router, authentication: Handler) {
  router.post('/task', authentication, (request, response) =>
    makeCreateTaskController().handle(request, response),
  );
  router.patch('/task/:id', authentication, (request, response) =>
    makeUpdateTaskController().handle(request, response),
  );
  router.delete('/task/:id', authentication, (request, response) =>
    makeDeleteTaskController().handle(request, response),
  );
  router.get('/task/:id', authentication, (request, response) =>
    makeGetTaskController().handle(request, response),
  );
  router.get('/tasks', authentication, (request, response) =>
    makeListTaskController().handle(request, response),
  );
}
