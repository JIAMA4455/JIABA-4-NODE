export function validateTask(task) {
  const errors = [];

  if (!task.title) {
    errors.push('Title is required');
  }

  if (task.title && task.title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }

  if (task.description && task.description.length > 500) {
    errors.push('Description must be less than 500 characters');
  }

  if (task.status && !['pending', 'in-progress', 'completed'].includes(task.status)) {
    errors.push('Status must be one of: pending, in-progress, completed');
  }

  if (task.priority && !['low', 'medium', 'high'].includes(task.priority)) {
    errors.push('Priority must be one of: low, medium, high');
  }

  return errors;
} 