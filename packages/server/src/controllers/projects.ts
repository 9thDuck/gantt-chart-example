import { RequestHandler } from "express";
import { Project } from "../database/models/Project";

export const getProjects: RequestHandler = async (req, res) => {
    const projects = await Project.find({});
    res.status(200).json(projects);
};  