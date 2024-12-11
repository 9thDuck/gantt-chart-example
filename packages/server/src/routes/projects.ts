import { getProjects } from "../controllers/projects";
import { Project } from "../database/models/Project";
import express from "express";

const projectsRouter = express.Router();

projectsRouter.route('/projects')
    .get(getProjects);

export default projectsRouter;