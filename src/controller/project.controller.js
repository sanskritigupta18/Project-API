import { User } from "../model/user.model.js";
import {Project} from "../model/project.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";

const createProject = asyncHandler(async(req,res) => {
    try
    {
        const {title,description,image,github_url,project_url,techstack} = req.body;
        const userId = req?.user?._id;
        if(!title || !description)
        {
            throw new ApiError(400,"All fields are required");
        }

        const user = await User.findById(userId);
        if(!user)
        {
            throw new ApiError(404,"User not found");
        }

        let projectDetail = {};
        if(title) projectDetail.title = title;
        if(description) projectDetail.description = description;
        if(image) projectDetail.image = image;
        if(github_url) projectDetail.github_url = github_url;
        if(project_url) projectDetail.project_url = project_url;
        if(techstack) projectDetail.techstack = techstack;

        const project = await Project.create({
            ...projectDetail,
            userId: userId,
        });

        return res.status(201).json(new ApiResponse(201,project,"Project created successfully"));
    }
    catch(e)
    {
        console.log(e);
        return res.status(500).json(new ApiResponse(500 ,{}, e?.message || "Error while creating project"));
    }
});

const getProjects = asyncHandler(async(req,res) => {
    try
    {
        const {apikey} = req.params;
        if(!apikey)
        {
            throw new ApiError(400,"API key is required");
        }
        const user = await User.findOne({apikey:apikey});
        if(!user)
        {
            throw new ApiError(404,"User not found");
        }
        const projects = await Project.find({userId:user._id});
        return res.status(200).json(new ApiResponse(200,projects,"Projects fetched successfully"));
    }
    catch(e)
    {
        return res.status(500).json(new ApiResponse(500,{},e?.message || "Error while fetching projects"));
    }
});

const updateProject = asyncHandler(async(req,res) => {
    try
    {
        const {projectId} = req.body;
        if(!projectId)
        {
            throw new ApiError(400,"Project id is required");
        }
        const project = await Project.find({_id: projectId});
        if(!project)
        {
            throw new ApiError(404,"Project not found");
        }
        const {title,description,image,github_url,project_url,techstack} = req.body;
        let projectDetail = {};
        if(title) projectDetail.title = title;
        if(description) projectDetail.description = description;
        if(image) projectDetail.image = image;
        if(github_url) projectDetail.github_url = github_url;
        if(project_url) projectDetail.project_url = project_url;
        if(techstack) projectDetail.techstack = techstack;

        const updatedProject = await Project.findByIdAndUpdate(projectId,projectDetail,{new:true});
        return res.status(200).json(new ApiResponse(200,updatedProject,"Project updated successfully"));
    }
    catch(e)
    {
        return res.status(500).json(new ApiResponse(500,{},e?.message || "Error while updating project"));
    }
});

const deleteProject = asyncHandler(async(req,res) => {
    try
    {
        const {projectId} = req.body;
        if(!projectId)
        {
            throw new ApiError(400,"Project id is required");
        }
        const project = await Project.findById(projectId);
        if(!project)
        {
            throw new ApiError(404,"Project not found");
        }
        await Project.findByIdAndDelete(projectId);
        return res.status(200).json(new ApiResponse(200,{},"Project deleted successfully"));
    }
    catch(e)
    {
        console.log(e)
        return res.status(500).json(new ApiResponse(500,{},e?.message || "Error while deleting project"));
    }
});

export {createProject,updateProject,deleteProject,getProjects};