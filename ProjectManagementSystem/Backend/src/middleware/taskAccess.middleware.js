import { ApiError } from '../utils/ApiError.js';
import * as taskModel from '../models/task.model.js';

export const canAccessTask = async (req, _res, next) => {
  const taskId = req.params.id;
  const user = req.user;

  const task = await taskModel.getTaskById(taskId);

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  // Admin can do anything
  if (user.role === 'admin') {
    return next();
  }

  // Manager can manage tasks of their projects (optional enhancement later)
  if (user.role === 'manager') {
    return next();
  }

  // Member can access only assigned tasks
  if (user.role === 'member' && task.assigned_to === user.id) {
    return next();
  }

  throw new ApiError(403, 'You do not have access to this task');
};
