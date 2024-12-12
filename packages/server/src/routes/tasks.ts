import {
 getTasks,
 updateTask,
 createTask,
 deleteTask,
} from "../controllers/tasks";
import express from "express";

const tasksRouter = express.Router();

tasksRouter
 .route("/tasks")
 .get(getTasks)
 .post(createTask)
 .put(updateTask)
 .delete(deleteTask);

export default tasksRouter;
