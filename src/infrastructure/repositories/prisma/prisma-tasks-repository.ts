import { PrismaClient } from '@prisma/client';
import { Task } from '@/domain/task';
import { prismaClient } from '@/infrastructure/repositories/prisma';
import { ITasksRepository } from '@/application/repositories/i-tasks-repository';

class PrismaTasksRepository implements ITasksRepository {
  constructor(private readonly prismaCliet: PrismaClient) {}

  async save(userId: string, input: Task): Promise<Task | undefined> {
    const task = await this.prismaCliet.task.create({
      data: {
        id: input.id,
        title: input.title,
        description: input.description,
        isCompleted: input.isCompleted,
        userId,
      },
    });
    if (!task) return undefined;
    return Task.restore(
      task.id,
      task.title,
      task.description,
      task.createdAt,
      task.isCompleted,
    );
  }

  async update(input: Task): Promise<Task | undefined> {
    const task = await this.prismaCliet.task.update({
      where: { id: input.id },
      data: {
        title: input.title,
        description: input.description,
        isCompleted: input.isCompleted,
      },
    });
    if (!task) return undefined;
    return Task.restore(
      task.id,
      task.title,
      task.description,
      task.createdAt,
      task.isCompleted,
    );
  }

  async delete(id: string): Promise<Task | undefined> {
    const task = await this.prismaCliet.task.delete({ where: { id } });
    if (!task) return undefined;
    return Task.restore(
      task.id,
      task.title,
      task.description,
      task.createdAt,
      task.isCompleted,
    );
  }

  async get(id: string): Promise<Task | undefined> {
    const task = await this.prismaCliet.task.findUnique({ where: { id } });
    if (!task) return undefined;
    return Task.restore(
      task.id,
      task.title,
      task.description,
      task.createdAt,
      task.isCompleted,
    );
  }

  async getAll(userId: string, skip: number, take: number): Promise<Task[]> {
    const tasks = await this.prismaCliet.task.findMany({
      skip,
      take,
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    if (tasks.length === 0) return [];
    const output: Task[] = [];
    for (const task of tasks) {
      output.push(
        Task.restore(
          task.id,
          task.title,
          task.description,
          task.createdAt,
          task.isCompleted,
        ),
      );
    }
    return output;
  }
}

export const prismaTasksRepository = new PrismaTasksRepository(prismaClient);
