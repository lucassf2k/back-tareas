import type { Request, Response } from 'express';
import { DeleteTask } from '@/application/use-cases/delete-task';
import { IController } from '@/infrastructure/express/controllers/i-controller';
import { DeleteTaskValidation } from '@/infrastructure/dtos';

export class DeleteTaskController implements IController {
  constructor(private readonly deleteTask: DeleteTask) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = DeleteTaskValidation.parse(request.params);
    const { id } = await this.deleteTask.execute(input);
    return response.json({ id });
  }
}
