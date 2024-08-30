import { ListTask } from '@/application/use-cases/list-task';
import { ListTaskController } from '@/infrastructure/express/controllers/list-task-controller';
import { CreateTaskController } from '@/infrastructure/express/controllers/create-task-controller';
import { CreateTask } from '@/application/use-cases/create-task';
import { prismaTasksRepository } from '@/infrastructure/repositories/prisma/prisma-tasks-repository';
import { DeleteTaskController } from '@/infrastructure/express/controllers/delete-task-controller';
import { DeleteTask } from '@/application/use-cases/delete-task';
import { GetTaskController } from '@/infrastructure/express/controllers/get-task-controller';
import { GetTask } from '@/application/use-cases/get-task';
import { UpdateTaskController } from '@/infrastructure/express/controllers/update-task-controller';
import { UpdateTask } from '@/application/use-cases/update-task';

export function makeListTaskController() {
  const listTask = new ListTask(prismaTasksRepository);
  return new ListTaskController(listTask);
}

export function makeCreateTaskController() {
  const createTask = new CreateTask(prismaTasksRepository);
  return new CreateTaskController(createTask);
}

export function makeDeleteTaskController() {
  const deleteTask = new DeleteTask(prismaTasksRepository);
  return new DeleteTaskController(deleteTask);
}

export function makeGetTaskController() {
  const getTask = new GetTask(prismaTasksRepository);
  return new GetTaskController(getTask);
}

export function makeUpdateTaskController() {
  const updateTask = new UpdateTask(prismaTasksRepository);
  return new UpdateTaskController(updateTask);
}
