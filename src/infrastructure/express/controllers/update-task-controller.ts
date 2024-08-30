import { Request, Response } from 'express';
import { UpdateTask } from '@/application/use-cases/update-task';
import { IController } from '@/infrastructure/express/controllers/i-controller';
import { UpdateTaskValidation } from '@/infrastructure/dtos';

export class UpdateTaskController implements IController {
  constructor(private readonly updateTask: UpdateTask) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = UpdateTaskValidation.parse(request);
    const task = await this.updateTask.execute(input);
    return response.json(task);
  }
}
