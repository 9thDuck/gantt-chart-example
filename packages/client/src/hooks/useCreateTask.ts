import { useState } from "react";
import { axiosClientInstance } from "../api/axiosClientInstance";
import { GanttTask } from "../types/task";

export const useCreateTask = () => {
 const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<Error | null>(null);

 const createTask = async (task: GanttTask) => {
  try {
   await axiosClientInstance.post("/tasks", task);
   setLoading(false);
  } catch (err: any) {
   setError(err.toString());
   setLoading(false);
  }
 };

 return { createTask, loading, error };
};
