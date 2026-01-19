import express from 'express';
import {
  createTask,
  getTasksByProject,
  getTask,
  updateTask,
  deleteTask
} from '../controllers/task.controller.js';

const router = express.Router();

router.post('/createTask', createTask);
router.get('/getAllTasks/:projectId', getTasksByProject);
router.get('/getTask/:id', getTask);
router.put('/updateTask/:id', updateTask);
router.delete('/deleteTask/:id', deleteTask);

export default router;
