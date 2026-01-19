import { ApiError } from '../utils/ApiError.js';
import * as taskModel from '../models/task.model.js';
import * as projectModel from '../models/project.model.js';
import * as userModel from '../models/user.model.js';

export const createNewTask = async (data) => {
  // Validate project
  const project = await projectModel.getProjectById(data.projectId);
  if (!project) {
    throw new ApiError(400, 'Invalid project_id');
  }

  // Validate assigned user
  const user = await userModel.findUserById(data.assignedTo);
  if (!user) {
    throw new ApiError(400, 'Invalid assigned_to user');
  }

  return await taskModel.createTask(data);
};

export const fetchTasksByProject = async (projectId) => {
  const tasks = await taskModel.getTasksByProject(projectId);
  return tasks;
};

export const fetchTask = async (id) => {
  const task = await taskModel.getTaskById(id);
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }
  return task;
};

export const editTask = async (id, data) => {
  const task = await taskModel.getTaskById(id);
  if (!task) {
    throw new ApiError(404, 'Task with such id is not found');
  }
  const updatedTask = await taskModel.updateTask(id, data);
  return updatedTask;
};

export const removeTask = async (id) => {
  const task = await taskModel.getTaskById(id);
  if (!task) {
    throw new ApiError(404, 'Task with such id is not found');
  }
  const deletedTask = await taskModel.deleteTask(id);
  return deletedTask;
};
