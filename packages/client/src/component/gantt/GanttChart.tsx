import React, { useEffect } from "react";
import "dhtmlx-gantt";
import "./GanttChart.css";
import "dhtmlx-gantt/codebase/ext/dhtmlxgantt_marker";
import "dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css";
import { useGetTasks } from "../../hooks/useGetTasks";
import { useUpdateTask } from "../../hooks/useUpdateTask";
import { useCreateTask } from "../../hooks/useCreateTask";
import { GanttTask } from "../../types/task";

declare var gantt: GanttStatic;

export const GanttChart: React.FC = () => {
 const { data } = useGetTasks();
 const {
  updateTask,
  loading: updateTaskLoading,
  error: updateTaskError,
 } = useUpdateTask();
 const {
  createTask,
  loading: createTaskLoading,
  error: createTaskError,
 } = useCreateTask();
 useEffect(() => {
  gantt.config.xml_date = "%Y-%m-%d %H:%i";
  gantt.config.server_utc = true;

  // Grid and resizing configuration
  gantt.config.grid_resize = true;
  gantt.config.drag_resize = true;
  gantt.config.drag_move = true;
  gantt.config.drag_progress = true;

  // Column configuration
  gantt.config.columns = [
   {
    name: "text",
    label: "Task name",
    tree: true,
    resize: true,
   },
   {
    name: "start_date",
    label: "Start time",
    align: "center",
    resize: true,
   },
   {
    name: "duration",
    label: "Duration",
    align: "center",
    resize: true,
   },
   {
    name: "priority",
    label: "Priority",
    align: "center",
    resize: true,
   },
   {
    name: "add",
    width: 44,
   },
  ];

  gantt.config.buttons_left = ["gantt_save_btn", "gantt_cancel_btn"];
  gantt.config.buttons_right = ["gantt_delete_btn"];

  // Enable lightbox for task creation/editing
  gantt.config.lightbox = {
   sections: [
    {
     name: "description",
     height: 70,
     map_to: "text",
     type: "textarea",
     focus: true,
    },
    { name: "type", type: "typeselect", map_to: "type" },
    {
     name: "priority",
     height: 70,
     map_to: "priority",
     type: "select",
     options: [
      { key: "low", label: "Low" },
      { key: "normal", label: "Normal" },
      { key: "high", label: "High" },
     ],
    },
    { name: "time", type: "duration", map_to: "auto" },
   ],
  };

  // // Enable parent-child relationships
  // gantt.config.parent_id = "parent";

  gantt.init("gantt");

  gantt.attachEvent("onAfterTaskDrag", async (id: string) => {
   try {
    const modifiedTask = gantt.getTask(id);
    await updateTask(modifiedTask);
   } catch (error) {
    console.error("Error updating task after drag:", error);
   }
  });

  gantt.attachEvent(
   "onAfterTaskUpdate",
   async (id: string, task: GanttTask) => {
    try {
     await updateTask(task);
     console.log("Task updated:", task);
    } catch (error) {
     console.error("Error updating task:", error);
    }
   }
  );

  gantt.attachEvent("onAfterTaskAdd", async (_, newTask: GanttTask) => {
   try {
    await createTask(newTask);
    console.log("Task saved:", newTask);
   } catch (error) {
    console.error("Error creating task:", error);
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
