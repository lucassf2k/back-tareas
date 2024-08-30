import { ApiError } from '@/common/api-error';
import { StatusCodes } from '@/common/status-code';
import { DeleteTaskDTO } from '@/infrastructure/dtos';
import { ITasksRepository } from '@/application/repositories/i-tasks-repository';

type Output = {
  id: string;
};

export class DeleteTask {
  constructor(private readonly tasksRepository: ITasksRepository) {}

  async execute(input: DeleteTaskDTO): Promise<Output> {
    const task = await this.tasksRepository.get(input.id);
    if (!task) throw new ApiError('task not found', StatusCodes.NOT_FOUND);
    const deletedTask = await this.tasksRepository.delete(input.id);
    return { id: deletedTask.id };
  }
}
