import { Request, Response } from 'express';
import { TaskService } from './task.service';
import { TaskStatus, TaskPriority } from './task.model';

export class TaskController {
  private service: TaskService;

  constructor() {
    this.service = new TaskService();
  }

  async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.service.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const task = await this.service.getTaskById(req.params.id);
      if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, status, priority } = req.body;
      const task = await this.service.createTask({
        title,
        description,
        status: status as TaskStatus,
        priority: priority as TaskPriority
      });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const task = await this.service.updateTask(req.params.id, req.body);
      if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const success = await this.service.deleteTask(req.params.id);
      if (!success) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
} 