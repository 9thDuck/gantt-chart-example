import { useState, useEffect } from "react";
import { axiosClientInstance } from "../api/axiosClientInstance";
import { GanttTask } from "../types/task";

export const useGetTasks = () => {
 const [data, setData] = useState<GanttTask[] | null>(null);
 const [loading, setLoading] = useState<boolean>(true);
 const [error, setError] = useState<Error | null>(null);

 useEffect(() => {
  const fetchTasks = async () => {
   try {
    const response = await axiosClientInstance.get<GanttTask[]>("/tasks");
    setData(response.data);
    console.log("tasks", response.data);
    setLoading(false);
   } catch (err) {
    setError(err as Error);
    setLoading(false);
   }
  };

  fetchTasks();
 }, []);

 return { data, loading, error };
};
