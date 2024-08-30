import type { Request, Response } from 'express';
import { CreateTask } from '@/application/use-cases/create-task';
import { IController } from '@/infrastructure/express/controllers/i-controller';
import { CreateTaskDTO, CreateTaskValidation } from '@/infrastructure/dtos';
import { StatusCodes } from '@/common/status-code';

export class CreateTaskController implements IController {
  constructor(private readonly createTask: CreateTask) {}

  async handle(request: Request, response: Response): Promise<Response> {
    request.log.info(`request: ${request.body}`);
    const requestValidated = CreateTaskValidation.parse(request.body);
    const input: CreateTaskDTO = {
      userId: request.user.id,
      title: requestValidated.title,
      description: requestValidated.description,
    };
    const output = await this.createTask.execute(input);
    request.log.info(`response: ${output}`);
    return response.status(StatusCodes.CREATED).json(output);
  }
}
