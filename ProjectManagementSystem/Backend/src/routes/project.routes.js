import { Router } from "express";
import { createProject, getProjects, getProject, updateProject, deleteProject } from "../controllers/project.controller.js";
const router = Router();

router.post('/createProject', createProject);
router.get('/allProjects', getProjects);
router.get('/project/:id', getProject);
router.put('/updateProject/:id', updateProject);
router.delete('/deleteProject/:id', deleteProject);

export default router;