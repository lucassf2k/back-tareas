import { ApiError } from '@/common/api-error';
import { StatusCodes } from '@/common/status-code';
import { UpdateTaskDTO } from '@/infrastructure/dtos';
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

export class UpdateTask {
  constructor(private readonly tasksRepository: ITasksRepository) {}

  async execute(input: UpdateTaskDTO): Promise<Output> {
    const task = await this.tasksRepository.get(input.params.id);
    if (!task) throw new ApiError('task not found', StatusCodes.NOT_FOUND);
    task.title = input.body.title || task.title;
    task.description = input.body.description || task.description;
    if (task.isCompleted !== input.body.isCompleted)
      task.taskCompletionToggle();
    const output = await this.tasksRepository.update(task);
    return {
      task: {
        id: output.id,
        title: output.title,
        description: output.description,
        isCompleted: output.isCompleted,
        createdAt: output.createdAt,
      },
    };
  }
}
