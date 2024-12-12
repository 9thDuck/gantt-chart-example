import { getTasks, updateTask } from "../controllers/tasks";
import express from "express";

const tasksRouter = express.Router();

tasksRouter.route("/tasks").get(getTasks).put(updateTask);

export default tasksRouter;
