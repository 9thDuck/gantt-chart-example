import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
 {
  id: {
   type: Number,
   required: true,
   unique: true,
  },
  text: {
   type: String,
   required: true,
  },
  start_date: {
   type: String,
   required: true,
  },
  end_date: {
   type: String,
   required: true,
  },
  duration: {
   type: Number,
   required: true,
  },
  progress: {
   type: Number,
   required: true,
   default: 0,
  },
  priority: {
   type: String,
   required: true,
   enum: ["low", "normal", "high"],
   default: "normal",
  },
  parent: {
   type: Number,
   default: 0,
  },
  type: {
   type: String,
   enum: ["task", "project"],
   default: "task",
  },
 },
 {
  timestamps: true,
 }
);

export const Task = mongoose.model("Task", taskSchema);
