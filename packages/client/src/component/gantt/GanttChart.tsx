import React, { useEffect } from "react";
import "dhtmlx-gantt";
import "./GanttChart.css";
import "dhtmlx-gantt/codebase/ext/dhtmlxgantt_marker";
import "dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css";
import { useGetTasks } from "../../hooks/useGetTasks";
import { useUpdateTask } from "../../hooks/useUpdateTask";

declare var gantt: GanttStatic;

export const GanttChart: React.FC = () => {
 const { data } = useGetTasks();
 const {
  updateTask,
  loading: updateTaskLoading,
  error: updateTaskError,
 } = useUpdateTask();
 useEffect(() => {
  gantt.config.xml_date = "%Y-%m-%d %H:%i";
  gantt.config.server_utc = true;
  gantt.init("gantt");

  gantt.attachEvent("onAfterTaskDrag", async (id: string) => {
   try {
    const modifiedTask = gantt.getTask(id);
    await updateTask(modifiedTask);
   } catch (error) {
    console.error("Error updating task after drag:", error);
   }
  });

  return () => {
   gantt.detachAllEvents();
  };
 }, []);

 useEffect(() => {
  if (data) {
   gantt.parse({ data });
   gantt.render();
  }
 }, [data]);

 return (
  <>
   <div style={{ width: "100%", height: "100%", position: "absolute" }}>
    <div id="gantt" />
   </div>
  </>
 );
};
