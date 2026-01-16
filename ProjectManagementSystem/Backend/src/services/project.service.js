import { ApiError } from '../utils/ApiError.js';
import * as projectModel from '../models/project.model.js';
import * as userModel from '../models/user.model.js';

export const createNewProject = async (data) => {
    // Ensure manager exists
    const manager = await userModel.findUserById(data.managerId);
    if (!manager) {
        throw new ApiError(400, 'Invalid manager_id');
    }

    return await projectModel.createProject(data);
};

export const fetchProjects = async () => {
    return await projectModel.getAllProjects();
};

export const fetchProject = async (id) => {
    const project = await projectModel.getProjectById(id);
    if (!project) {
        throw new ApiError(404, 'Project not found');
    }
    return project;
};

export const editProject = async (id, data) => {
    //   await fetchProject(id);
    const id = await projectModel.getProjectById(id);
    if(!id){
        throw new ApiError(404, 'Project with such id is not found');
    }
    const result = await projectModel.updateProject(id, data);
    return result;
};

export const removeProject = async (id) => {
     const id = await projectModel.getProjectById(id);
    if(!id){
        throw new ApiError(404, 'Project with such id is not found');
    }
    const deletedProject = await projectModel.deleteProject(id);
    return deletedProject;
};
