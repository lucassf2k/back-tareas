import { ListTaskDTO, ListTaskValidation } from '@/infrastructure/dtos';
import { ListTask } from '@/application/use-cases/list-task';
import { IController } from './i-controller';
import { Request, Response } from 'express';

type Output = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
}[];

const PAGE_SIZE = 10;

export class ListTaskController implements IController {
  constructor(private readonly listTask: ListTask) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const inputRaw = {
      page: Number(request.query.page),
      pageSize: Number(request.query.pagesize || PAGE_SIZE),
    };
    const validatedInput = ListTaskValidation.parse(inputRaw);
    const input: ListTaskDTO = {
      userId: request.user.id,
      page: validatedInput.page,
      pageSize: validatedInput.pageSize,
    };
    const output = await this.listTask.execute(input);
    return response.json(output);
  }
}
