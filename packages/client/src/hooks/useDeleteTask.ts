import { useState } from "react";
import { axiosClientInstance } from "../api/axiosClientInstance";

export const useDeleteTask = () => {
 const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<Error | null>(null);

 const deleteTask = async (taskId: string) => {
  try {
   setLoading(true);
   await axiosClientInstance.delete(`/tasks?id=${taskId}`);
   setLoading(false);
  } catch (err: any) {
   setError(err.toString());
   setLoading(false);
  }
 };

 return { deleteTask, loading, error };
};
