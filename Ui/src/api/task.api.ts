import { httpClient } from "./httpClient";
import type {
  Task,
  CreateTaskRequest,
  UpdateTaskStatusRequest,
} from "../types/task.types";

export const taskApi = {
  getAll: async (page = 1, pageSize = 10): Promise<{ tasks: Task[]; total: number }> => {
    const response = await httpClient.get("/api/tasks", {
      params: { page, pageSize },
    });
   return {
      tasks: response.data.items,
      total: response.data.totalCount,
    };
  },

  create: async (payload: CreateTaskRequest): Promise<void> => {
    await httpClient.post("/api/tasks", payload);
  },

  updateStatus: async (
    id: number,
    payload: UpdateTaskStatusRequest
  ): Promise<void> => {
    await httpClient.put(`/api/tasks/${id}/status`, payload);
  },
};
