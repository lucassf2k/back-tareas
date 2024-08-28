import { v7 as uuidV7 } from 'uuid';

export class Task {
  private constructor(
    readonly id: string,
    public title: string,
    public description: string,
    readonly createdAt: Date,
    public isCompleted: boolean = false,
  ) {}

  static create(title: string, description: string): Task {
    const id = uuidV7();
    return new Task(id, title, description, new Date());
  }

  static restore(
    id: string,
    title: string,
    description: string,
    createdAt: Date,
    isCompleted: boolean,
  ): Task {
    return new Task(id, title, description, createdAt, isCompleted);
  }

  taskCompletionToggle() {
    this.isCompleted = !this.isCompleted;
  }
}
