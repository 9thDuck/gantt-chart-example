import React, { useEffect } from "react";
import "dhtmlx-gantt";
import "./GanttChart.css";
import "dhtmlx-gantt/codebase/ext/dhtmlxgantt_marker";
import "dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css";
import { useGetTasks } from "../../hooks/useGetTasks";
import { useUpdateTask } from "../../hooks/useUpdateTask";
import { useCreateTask } from "../../hooks/useCreateTask";
import { GanttTask } from "../../types/task";
import { useDeleteTask } from "../../hooks/useDeleteTask";
import { useNotification } from "../../context/NotificationContext";
import {
 TimezoneOption,
 useTimezoneManager,
} from "../../hooks/useTimezoneManager";
import { TimezoneSelector } from "../timezone/TimezoneSelector";

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
 const { deleteTask } = useDeleteTask();
 const { showSuccess, showError, showLoading, dismissLoading } =
  useNotification();
 const {
  selectedTimezone,
  setSelectedTimezone,
  timezoneOptions,
  convertToTimezone,
 } = useTimezoneManager();

 useEffect(() => {
  gantt.config.xml_date = "%Y-%m-%d %H:%i";
  gantt.config.server_utc = true;

  // Add timezone-aware date formatting
  gantt.templates.parse_date = (date: string) => new Date(date);
  gantt.templates.format_date = (date: Date) => {
   const localDate = convertToTimezone(date);
   return gantt.date.date_to_str("%Y-%m-%d %H:%i")(localDate);
  };

  // Override display templates to show times in selected timezone
  gantt.templates.task_date = (date: Date) => {
   const localDate = convertToTimezone(date);
   return gantt.date.date_to_str("%Y-%m-%d %H:%i")(localDate);
  };

  gantt.templates.task_time = (start: Date, end: Date) => {
   const localStart = convertToTimezone(start);
   const localEnd = convertToTimezone(end);
   return `${gantt.templates.task_date(
    localStart
   )} - ${gantt.templates.task_date(localEnd)}`;
  };

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

  gantt.config.buttons_left = ["gantt_save_btn"];
  gantt.config.buttons_right = ["gantt_delete_btn", "gantt_cancel_btn"];

  // Enable lightbox for task creation/editing
  gantt.config.lightbox = {
   sections: [
    {
     name: "description",
     height: 70,
     map_to: "text",
     type: "textarea",
     focus: true,
     label: "Description",
    },
    {
     name: "type",
     type: "typeselect",
     map_to: "type",
     label: "Type",
    },
    {
     name: "priority",
     height: 70,
     map_to: "priority",
     type: "select",
     label: "Priority",
     options: [
      { key: "low", label: "Low" },
      { key: "normal", label: "Normal" },
      { key: "high", label: "High" },
     ],
    },
    {
     name: "time",
     type: "duration",
     map_to: "auto",
     label: "Time",
    },
   ],
  };

  gantt.locale = {
   ...gantt.locale,
   labels: {
    ...gantt.locale.labels,
    section_description: "Description",
    section_time: "Time",
    // @ts-ignore
    section_priority: "Priority",
    section_type: "Type",
    icon_delete: "Delete",
    confirm_deleting: "Task will be deleted permanently, are you sure?",
   },
  };

  gantt.attachEvent("onBeforeTaskDelete", async (id: string) => {
   try {
    await deleteTask(id);
    showSuccess("Task deleted successfully");
    return true;
   } catch (error) {
    showError("Failed to delete task");
    return false;
   }
  });

  gantt.init("gantt");

  gantt.attachEvent("onAfterTaskDrag", async (id: string) => {
   try {
    const modifiedTask = gantt.getTask(id);
    await updateTask(modifiedTask);
    showSuccess("Task updated successfully");
   } catch (error) {
    showError("Failed to update task");
   }
  });

  gantt.attachEvent("onAfterTaskUpdate", async (_, task: GanttTask) => {
   try {
    await updateTask(task);
    console.log("Task updated:", task);
   } catch (error) {
    console.error("Error updating task:", error);
   }
  });

  gantt.attachEvent("onAfterTaskAdd", async (_, newTask: GanttTask) => {
   try {
    await createTask(newTask);
    showSuccess("Task created successfully");
   } catch (error) {
    showError("Failed to create task");
   }
  });

  return () => {
   gantt.detachAllEvents();
  };
 }, [convertToTimezone]);

 useEffect(() => {
  if (data) {
   gantt.parse({ data });
   gantt.render();
  }
 }, [data]);

 useEffect(() => {
  if (updateTaskLoading) {
   showLoading("Updating task...", "updateTask");
  } else {
   dismissLoading("updateTask");
  }
 }, [updateTaskLoading]);

 useEffect(() => {
  if (createTaskLoading) {
   showLoading("Creating task...", "createTask");
  } else {
   dismissLoading("createTask");
  }

  return () => {
   dismissLoading("createTask");
  };
 }, [createTaskLoading]);

 useEffect(() => {
  if (updateTaskError) {
   showError(updateTaskError.toString());
  }
 }, [updateTaskError]);

 useEffect(() => {
  if (createTaskError) {
   showError(createTaskError.toString());
  }
 }, [createTaskError]);

 const handleTimezoneChange = (newTimezone: TimezoneOption) => {
  setSelectedTimezone(newTimezone);
  gantt.render();
 };

 return (
  <div className="flex flex-col h-full relative" style={{ minHeight: "500px" }}>
   <div className="flex justify-end mb-4">
    <TimezoneSelector
     selectedTimezone={selectedTimezone}
     timezoneOptions={timezoneOptions}
     onTimezoneChange={handleTimezoneChange}
    />
   </div>
   <div className="gantt-container">
    <div id="gantt" />
   </div>
  </div>
 );
};
