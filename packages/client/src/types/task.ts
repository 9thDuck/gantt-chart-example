export type GanttTask = {
 id: number;
 text: string;
 start_date: string;
 end_date: string;
 duration: number;
 progress: number;
 priority: "low" | "normal" | "high";
};
