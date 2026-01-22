import AsyncHandler from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { createNewProject, editProject, fetchProject, fetchProjects, removeProject } from "../services/project.service.js";

const createProject = AsyncHandler(async (req, res, next) => {
    const { name, description, manager_id, start_date, end_date, status } = req.body;
    if (!name || !manager_id) {
        throw new ApiError(400, 'Project name and manager ID are required');
    }
    const projectId = await createNewProject({ name, description, manager_id, start_date, end_date, status });
    res.status(201)
        .json(new ApiResponse(201, { projectId }, 'Project created successfully'));
});

const getProjects = AsyncHandler(async (req, res, next) => {
    try {
        const projects = await fetchProjects();
        res.status(200)
            .json(new ApiResponse(200, { projects }, 'Projects fetched successfully'));
    } catch (error) {
        console.log("Error in fetching Projects: ", error);
        throw new ApiError(400, 'Failed to fetch projects');
    }

});

const getProject = AsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(404, 'Couldn\'t receive project id from request params');
    }
    const project = await fetchProject(id);
    res.status(200)
        .json(new ApiResponse(200, { project }, 'Project fetched successfully'));
});

const updateProject = AsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(404, 'Couldn\'t receive project id from request params');
    }
    console.log("req body: and id", req.body, id);
    const { name, description, manager_id, start_date, end_date, status } = req.body;
    if (!name || !manager_id) {
        throw new ApiError(400, 'Project name and manager ID are required');
    }
    const result = await editProject(id, { name, description, manager_id, start_date, end_date, status });
    res.status(200)
        .json(new ApiResponse(200, result, 'Project updated successfully'));
});

const deleteProject = AsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(404, 'Couldn\'t receive project id from request params');
    }
    const result = await removeProject(id);
    res.status(200)
        .json(new ApiResponse(200, result, 'Project deleted successfully'));
});

export { createProject, getProjects, getProject, updateProject, deleteProject };