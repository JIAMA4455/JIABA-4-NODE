import { Task } from './task.model.js';

class TaskRepository {
  constructor() {
    this.tasks = [];
  }

  getAll() {
    return this.tasks;
  }

  getById(id) {
    return this.tasks.find(task => task.id === id);
  }

  create(taskData) {
    const task = new Task(
      Date.now().toString(),
      taskData.title,
      taskData.description,
      taskData.status || 'pending',
      taskData.priority || 'medium'
    );
    this.tasks.push(task);
    return task;
  }

  update(id, taskData) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return null;

    const task = this.tasks[taskIndex];
    Object.assign(task, taskData, { updatedAt: new Date() });
    return task;
  }

  delete(id) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return false;

    this.tasks.splice(taskIndex, 1);
    return true;
  }
}

export const taskRepository = new TaskRepository(); 