import { ApiError } from '../utils/ApiError.js';
import * as projectModel from '../models/project.model.js';

export const canManageProject = async (req, _res, next) => {
  const projectId = req.params.id;
  
  const user = req.user;
  const role = req.user.role.toLowerCase();
  
  const project = await projectModel.getProjectById(projectId);

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  // Admin can do anything
  if (role === 'admin') {
    return next();
  }

  // Manager can manage only their project  
  if (role === 'manager' && project.manager_id === user.id) {
    return next();
  }

  throw new ApiError(403, 'You do not have access to this project');
};
