import { getTasks, updateTask, createTask } from "../controllers/tasks";
import express from "express";

const tasksRouter = express.Router();

tasksRouter.route("/tasks").get(getTasks).post(createTask).put(updateTask);

export default tasksRouter;
