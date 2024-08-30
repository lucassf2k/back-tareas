import { Task } from '@/domain/task';
import { CreateTaskDTO } from '@/infrastructure/dtos';
import { ITasksRepository } from '@/application/repositories/i-tasks-repository';
import { ApiError } from '@/common/api-error';
import { StatusCodes } from '@/common/status-code';

type Output = {
  task: {
    id: string;
    description: string;
    isCompleted: boolean;
    createdAt: Date;
  };
};

export class CreateTask {
  constructor(private readonly tasksRepository: ITasksRepository) {}

  async execute(input: CreateTaskDTO): Promise<Output> {
    const newTask = Task.create(input.title, input.description);
    const output = await this.tasksRepository.save(input.userId, newTask);
    if (!output) {
      throw new ApiError(
        'Internal server error',
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
    return {
      task: {
        id: output.id,
        description: output.description,
        isCompleted: output.isCompleted,
        createdAt: output.createdAt,
      },
    };
  }
}
