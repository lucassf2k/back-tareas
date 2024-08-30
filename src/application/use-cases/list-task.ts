import { ITasksRepository } from '@/application/repositories/i-tasks-repository';
import { ListTaskDTO } from '@/infrastructure/dtos';

type Output = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
};

export class ListTask {
  constructor(private readonly tasksRepository: ITasksRepository) {}

  async execute(input: ListTaskDTO): Promise<Output[]> {
    const skip = (input.page - 1) * input.pageSize;
    const tasks = await this.tasksRepository.getAll(
      input.userId,
      skip,
      input.pageSize,
    );
    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      isCompleted: task.isCompleted,
      createdAt: task.createdAt,
    }));
  }
}
