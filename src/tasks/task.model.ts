import { Task, TaskStatus, TaskPriority } from './types';

export class TaskModel {
  private id: string;
  private title: string;
  private description: string;
  private status: TaskStatus;
  private priority: TaskPriority;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    title: string,
    description: string,
    status: TaskStatus = 'pending',
    priority: TaskPriority = 'medium'
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.priority = priority;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getStatus(): TaskStatus {
    return this.status;
  }

  public getPriority(): TaskPriority {
    return this.priority;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public update(title?: string, description?: string, status?: TaskStatus, priority?: TaskPriority): void {
    if (title) this.title = title;
    if (description) this.description = description;
    if (status) this.status = status;
    if (priority) this.priority = priority;
    this.updatedAt = new Date();
  }

  public toJSON(): Task {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      priority: this.priority,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
} 