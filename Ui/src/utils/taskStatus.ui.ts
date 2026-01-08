import { TaskStatus } from "../types/task.types";

export const taskStatusLabelMap: Record<TaskStatus, string> = {
  [TaskStatus.Todo]: "Todo",
  [TaskStatus.InProgress]: "In Progress",
  [TaskStatus.Done]: "Done",
};

export const taskStatusColorMap: Record<
  TaskStatus,
  "default" | "primary" | "success"
> = {
  [TaskStatus.Todo]: "default",
  [TaskStatus.InProgress]: "primary",
  [TaskStatus.Done]: "success",
};
