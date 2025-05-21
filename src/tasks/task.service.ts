import { Task, CreateTaskDTO, UpdateTaskDTO } from './types';
import { TaskMemoryRepository } from './task.memory.repository';

export class TaskService {
  private repository: TaskMemoryRepository;

  constructor() {
    this.repository = new TaskMemoryRepository();
  }

  public getAllTasks(): Task[] {
    return this.repository.getAll();
  }

  public getTaskById(id: string): Task | null {
    return this.repository.getById(id);
  }

  public createTask(taskData: CreateTaskDTO): Task {
    return this.repository.create(taskData);
  }

  public updateTask(id: string, taskData: UpdateTaskDTO): Task | null {
    return this.repository.update(id, taskData);
  }

  public deleteTask(id: string): boolean {
    return this.repository.delete(id);
  }
} 