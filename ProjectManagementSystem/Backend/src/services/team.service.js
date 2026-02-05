import { ApiError } from "../utils/ApiError.js";
import * as teamModel from "../models/team.model.js";
import * as projectModel from "../models/project.model.js";
import * as userModel from "../models/user.model.js"

export const addTeamMemberService = async ({ projectId, userId}) => {
  const project = await projectModel.getProjectById(projectId);
  const user = await userModel.findUserById(userId);
  if (!user || !project) throw new ApiError(404, 'User or Project not found');

  const alreadyExists = await teamModel.isUserInProject(projectId, userId);
  if (alreadyExists) {
    throw new ApiError(409, 'User already part of the project');
  }

  await teamModel.addMember(projectId, userId);
};

export const removeTeamMemberService = async ({ projectId, userId, currentUser }) => {
  const project = await projectModel.findProjectById(projectId);
  if (!project) throw new ApiError(404, 'Project not found');

  if (
    currentUser.role === 'manager' &&
    project.manager_id !== currentUser.id
  ) {
    throw new ApiError(403, 'Managers can modify only their own projects');
  }

  await teamModel.removeMember(projectId, userId);
};

export const getProjectTeamService = async ({ projectId, currentUser }) => {
  const isMember = await teamModel.isUserInProject(projectId, currentUser.id);

  if (currentUser.role === 'member' && !isMember) {
    throw new ApiError(403, 'Access denied');
  }

  return await teamModel.getTeamByProject(projectId);
};
