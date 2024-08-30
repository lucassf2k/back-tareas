import { Request, Response } from 'express';
import { GetTaskValidation } from '@/infrastructure/dtos';
import { GetTask } from '@/application/use-cases/get-task';
import { IController } from '@/infrastructure/express/controllers/i-controller';

export class GetTaskController implements IController {
  constructor(private readonly getTask: GetTask) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = GetTaskValidation.parse(request.params);
    const task = await this.getTask.execute(input);
    return response.json(task);
  }
}
