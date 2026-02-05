import express from 'express';
import {
  createTask,
  getTasksByProject,
  getTask,
  updateTask,
  deleteTask
} from '../controllers/task.controller.js';
import authorize from '../middleware/authorize.middleware.js';
import { canAccessTask } from '../middleware/taskAccess.middleware.js';

const router = express.Router();

router.post('/createTask', authorize('admin', 'manager', 'member'), createTask);
router.get('/getAllTasks', authorize('admin', 'manager', 'member'), getTasksByProject);
router.get('/getTask/:id', authorize('admin', 'manager', 'member'), canAccessTask, getTask);
router.put('/updateTask/:id', authorize('admin', 'manager', 'member'), canAccessTask, updateTask);
router.delete('/deleteTask/:id', authorize('admin', 'manager'), deleteTask);

export default router;
