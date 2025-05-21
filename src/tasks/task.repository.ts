import { Repository } from 'typeorm';
import { Task, TaskStatus, TaskPriority } from './task.model';
import { AppDataSource } from '../config/data-source';

export class TaskRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = AppDataSource.getRepository(Task);
  }

  async findAll(): Promise<Task[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Task | null> {
    return this.repository.findOneBy({ id });
  }

  async create(taskData: {
    title: string;
    description: string;
    status?: TaskStatus;
    priority?: TaskPriority;
  }): Promise<Task> {
    const task = this.repository.create(taskData);
    return this.repository.save(task);
  }

  async update(id: string, taskData: Partial<Task>): Promise<Task | null> {
    await this.repository.update(id, taskData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== undefined && result.affected > 0;
  }
} 