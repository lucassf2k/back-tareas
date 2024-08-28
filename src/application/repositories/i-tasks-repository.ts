import { Task } from '@/domain/task';

export interface ITasksRepository {
  save(userId: string, data: Task): Promise<Task | undefined>;
  update(data: Task): Promise<Task | undefined>;
  delete(id: string): Promise<Task | undefined>;
  get(id: string): Promise<Task | undefined>;
  getAll(
    userId: string,
    skip: number,
    take: number,
  ): Promise<Task[] | undefined>;
}
