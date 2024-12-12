import { useState, useCallback } from "react";
import { axiosClientInstance } from "../api/axiosClientInstance";
import { GanttTask } from "../types/task";

export const useUpdateTask = () => {
 const [loading, setLoading] = useState<boolean>(true);
 const [error, setError] = useState<Error | null>(null);

 const updateTask = useCallback(async (task: GanttTask) => {
  try {
   await axiosClientInstance.put("/tasks", task);
   setLoading(false);
  } catch (err: any) {
   setError(err.toString());
   setLoading(false);
  }
 }, []);

 return { updateTask, loading, error };
};
