import { ApiError } from '@/common/api-error';
import { StatusCodes } from '@/common/status-code';
import { GetTaskDTO } from '@/infrastructure/dtos';
import { ITasksRepository } from '@/application/repositories/i-tasks-repository';

type Output = {
  task: {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: Date;
  };
};

export class GetTask {
  constructor(private readonly tasksRepository: ITasksRepository) {}

  async execute(input: GetTaskDTO): Promise<Output> {
    const task = await this.tasksRepository.get(input.id);
    if (!task) throw new ApiError('task not found', StatusCodes.NOT_FOUND);
    return {
      task: {
        id: task.id,
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted,
        createdAt: task.createdAt,
      },
    };
  }
}
