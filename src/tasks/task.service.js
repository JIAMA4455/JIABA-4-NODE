import { taskRepository } from './task.memory.repository.js';

export class TaskService {
  getAllTasks() {
    return taskRepository.getAll();
  }

  getTaskById(id) {
    const task = taskRepository.getById(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  createTask(taskData) {
    if (!taskData.title) {
      throw new Error('Title is required');
    }
    return taskRepository.create(taskData);
  }

  updateTask(id, taskData) {
    const task = taskRepository.update(id, taskData);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  deleteTask(id) {
    const success = taskRepository.delete(id);
    if (!success) {
      throw new Error('Task not found');
    }
    return true;
  }
} 