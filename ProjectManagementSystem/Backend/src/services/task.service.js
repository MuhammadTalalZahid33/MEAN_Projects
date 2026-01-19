import * as taskModel from '../models/task.model.js';

export const addTask = async (data) => {
  return await taskModel.createTask(data);
};

export const getProjectTasks = async (projectId) => {
  return await taskModel.getTasksByProject(projectId);
};

export const editTask = async (id, data) => {
  await taskModel.updateTask(id, data);
};

export const removeTask = async (id) => {
  await taskModel.deleteTask(id);
};
