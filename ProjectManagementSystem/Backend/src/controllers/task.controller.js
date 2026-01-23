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
    projectId,
    assignedTo,
    title,
    description,
    priority,
    status,
    dueDate
  } = req.body;

  if (!projectId || !assignedTo || !title) {
    throw new ApiError(400, 'projectId, assignedTo and title are required');
  }

  const id = await createNewTask({
    projectId,
    assignedTo,
    title,
    description,
    priority,
    status,
    dueDate
  });

  res.status(201).json(
    new ApiResponse(201, { id }, 'Task created successfully')
  );
});

// export const getTasksByProject = AsyncHandler(async (req, res) => {
//   const { projectId } = req.params;
//   if (!projectId) {
//     // throw new ApiError(400, 'projectId is required');
//     try {
//       const tasks = await fetchTasks();
//       res.status(200)
//         .json(new ApiResponse(200, { tasks }, 'Tasks fetched successfully'));
//     } catch (error) {
//       console.log("Error in fetching Tasks: ", error);
//       throw new ApiError(400, 'Failed to fetch Tasks');
//     }
//   } else {
//     const tasks = await fetchTasksByProject(projectId);
//     res.json(new ApiResponse(200, tasks, 'Tasks fetched successfully'));
//   }

// });

export const getTasksByProject = AsyncHandler(async (req, res) => {
  const { projectId } = req.query;

  const tasks = projectId
    ? await fetchTasksByProject(projectId)
    : await fetchTasks();

  return res
    .status(200)
    .json(new ApiResponse(200, { tasks }, 'Tasks fetched successfully'));
});


// export const getAllTasks = AsyncHandler(async (req, res) => {
//   try {
//     const tasks = await fetchTasks();
//     res.status(200)
//       .json(new ApiResponse(200, { tasks }, 'Tasks fetched successfully'));
//   } catch (error) {
//     console.log("Error in fetching Tasks: ", error);
//     throw new ApiError(400, 'Failed to fetch Tasks');
//   }
// });

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
