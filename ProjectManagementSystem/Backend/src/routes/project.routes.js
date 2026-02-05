import { Router } from "express";
import { createProject, getProjects, getProject, updateProject, deleteProject } from "../controllers/project.controller.js";
import authorize from "../middleware/authorize.middleware.js";
import { canManageProject } from "../middleware/projectAccess.middleware.js";

const router = Router();

router.post('/createProject', authorize('admin', 'manager'), createProject);
router.get('/allProjects', authorize('admin', 'manager', 'member'), getProjects);
router.get('/project/:id', authorize('admin', 'manager', 'member'), getProject);
router.put('/updateProject/:id', authorize('admin', 'manager'), canManageProject, updateProject);
router.delete('/deleteProject/:id', authorize('admin', 'manager'), canManageProject, deleteProject);

export default router;