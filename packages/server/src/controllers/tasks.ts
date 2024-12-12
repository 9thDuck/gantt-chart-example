import { RequestHandler } from "express";
import { Task } from "../database/models/Task";

export const getTasks: RequestHandler = async (req, res) => {
 const tasks = await Task.find({});
 res.status(200).json(tasks);
};

export const updateTask: RequestHandler = async (req, res, next) => {
 try {
  const cleanedTask = {
   _id: req.body._id,
   id: req.body.id,
   text: req.body.text,
   start_date: new Date(req.body.start_date)
    .toISOString()
    .slice(0, 16)
    .replace("T", " "),
   end_date: new Date(req.body.end_date)
    .toISOString()
    .slice(0, 16)
    .replace("T", " "),
   duration: req.body.duration,
   progress: req.body.progress,
   priority: req.body.priority,
  };

  const updatedTask = await Task.findByIdAndUpdate(
   cleanedTask._id,
   cleanedTask,
   {
    new: true,
    runValidators: true,
   }
  );

  if (!updatedTask) {
   res.status(404).json({ message: "Task not found" });
   return;
  }

  res.status(200).json(updatedTask);
 } catch (error) {
  res.status(500).json({ message: "Error updating task", error });
 }
};
