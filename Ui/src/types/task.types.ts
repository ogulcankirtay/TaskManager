export enum TaskStatus {
  Todo = 0,
  InProgress = 1,
  Done = 2,
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
}

export interface UpdateTaskStatusRequest {
  status: TaskStatus;
}
