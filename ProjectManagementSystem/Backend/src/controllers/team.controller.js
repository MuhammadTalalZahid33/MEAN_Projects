import AsyncHandler from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {
  addTeamMemberService,
  removeTeamMemberService,
  getProjectTeamService
} from "../services/team.service.js";

export const addTeamMember = AsyncHandler(async (req, res) => {
  const { project_id, user_id } = req.body;

  if (!project_id || !user_id) {
    throw new ApiError(400, 'project_id and user_id are required');
  }

  await addTeamMemberService({
    projectId: project_id,
    userId: user_id,
    currentUser: req.user
  });

  res.status(201).json(
    new ApiResponse(201, null, 'User added to project team')
  );
});

export const removeTeamMember = AsyncHandler(async (req, res) => {
  const { project_id, user_id } = req.body;

  if (!project_id || !user_id) {
    throw new ApiError(400, 'project_id and user_id are required');
  }

  await removeTeamMemberService({
    projectId: project_id,
    userId: user_id,
    currentUser: req.user
  });

  res.status(200).json(
    new ApiResponse(200, null, 'User removed from project team')
  );
});

export const getProjectTeam = AsyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const team = await getProjectTeamService({
    projectId,
    currentUser: req.user
  });

  res.status(200).json(
    new ApiResponse(200, team)
  );
});
