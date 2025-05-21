import { Task, CreateTaskDTO, UpdateTaskDTO } from './types';
import { TaskModel } from './task.model';
import { v4 as uuidv4 } from 'uuid';

export class TaskMemoryRepository {
  private tasks: Map<string, TaskModel>;

  constructor() {
    this.tasks = new Map();
  }

  public getAll(): Task[] {
    return Array.from(this.tasks.values()).map(task => task.toJSON());
  }

  public getById(id: string): Task | null {
    const task = this.tasks.get(id);
    return task ? task.toJSON() : null;
  }

  public create(taskData: CreateTaskDTO): Task {
    const id = uuidv4();
    const task = new TaskModel(
      id,
      taskData.title,
      taskData.description,
      taskData.status,
      taskData.priority
    );
    this.tasks.set(id, task);
    return task.toJSON();
  }

  public update(id: string, taskData: UpdateTaskDTO): Task | null {
    const task = this.tasks.get(id);
    if (!task) {
      return null;
    }

    task.update(
      taskData.title,
      taskData.description,
      taskData.status,
      taskData.priority
    );

    return task.toJSON();
  }

  public delete(id: string): boolean {
    return this.tasks.delete(id);
  }
} 