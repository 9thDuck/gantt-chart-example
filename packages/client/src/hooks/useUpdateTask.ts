import { useState, useCallback } from "react";
import { axiosClientInstance } from "../api/axiosClientInstance";
import { GanttTask } from "../types/task";

export const useUpdateTask = () => {
 const [loading, setLoading] = useState<boolean>(true);
 const [error, setError] = useState<Error | null>(null);

 const updateTask = useCallback(async (task: GanttTask) => {
  try {
   // Validate parent-child relationship
   if (task.type === "task" && (!task.parent || task.parent === 0)) {
    throw new Error("Tasks must have a parent project");
   }
   if (task.type === "project" && task.parent !== 0) {
    throw new Error("Projects cannot have parents");
   }

   await axiosClientInstance.put("/tasks", task);
   setLoading(false);
  } catch (err: any) {
   setError(err.toString());
   setLoading(false);
  }
 }, []);

 return { updateTask, loading, error };
};
