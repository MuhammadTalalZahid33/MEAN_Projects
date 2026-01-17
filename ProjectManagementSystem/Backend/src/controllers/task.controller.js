import AsyncHandler from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { addTask, getProjectTasks, editTask, removeTask } from '../services/task.service.js';

export const createTask = AsyncHandler(async (req, res) => {
  const id = await addTask(req.body);
  res.status(201).json(new ApiResponse(201, { id }));
});

export const getTasks = AsyncHandler(async (req, res) => {
  res.json(
    new ApiResponse(200, await getProjectTasks(req.params.projectId))
  );
});

export const updateTask = AsyncHandler(async (req, res) => {
  await editTask(req.params.id, req.body);
  res.json(new ApiResponse(200, null, 'Task updated'));
});

export const deleteTask = AsyncHandler(async (req, res) => {
  await removeTask(req.params.id);
  res.json(new ApiResponse(200, null, 'Task deleted'));
});
