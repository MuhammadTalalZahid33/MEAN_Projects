import { ApiError } from '../utils/ApiError.js';
import * as projectModel from '../models/project.model.js';

export const canManageProject = async (req, _res, next) => {
  const projectId = req.params.id;
  
  const user = req.user;
  const role = req.user.role.toLowerCase();

  console.log("project id and user, role: ", projectId, user, role)
  const project = await projectModel.getProjectById(projectId);

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  // Admin can do anything
  if (user.role === 'admin') {
    return next();
  }

  // Manager can manage only their project  
  if (role === 'manager') {
    return next();
  }

  throw new ApiError(403, 'You do not have access to this project');
};
