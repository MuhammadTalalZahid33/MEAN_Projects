import AsyncHandler from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import {
  createNewTask,
  fetchTasksByProject,
  fetchTask,
  editTask,
  removeTask,
  fetchTasks
} from '../services/task.service.js';

export const createTask = AsyncHandler(async (req, res) => {
  const {
    project_id,
    assigned_to,
    title,
    description,
    priority,
    status,
    due_date
  } = req.body;

  if (!project_id || !assigned_to || !title) {
    throw new ApiError(400, 'project_id, assigned_to and title are required');
  }

  const id = await createNewTask({
    project_id,
    assigned_to,
    title,
    description,
    priority,
    status,
    due_date
  });

  res.status(201).json(
    new ApiResponse(201, { id }, 'Task created successfully')
  );
});

export const getTasksByProject = AsyncHandler(async (req, res) => {
  const { project_id } = req.query;

  const tasks = project_id
    ? await fetchTasksByProject(project_id)
    : await fetchTasks();

  return res
    .status(200)
    .json(new ApiResponse(200, { tasks }, 'Tasks fetched successfully'));
});

export const getTask = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, 'Task id is required');
  }
  const task = await fetchTask(id);
  res.json(new ApiResponse(200, task, 'Task fetched successfully'));
});

export const updateTask = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, 'Task id is required');
  }
  await editTask(id, req.body);
  res.json(new ApiResponse(200, null, 'Task updated successfully'));
});

export const deleteTask = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, 'Task id is required');
  }
  await removeTask(id);
  res.json(new ApiResponse(200, null, 'Task deleted successfully'));
});
