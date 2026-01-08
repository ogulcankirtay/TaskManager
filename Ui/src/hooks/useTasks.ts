import { useEffect, useState } from "react";
import { taskApi } from "../api/task.api";
import type { Task, TaskStatus } from "../types/task.types";
import { useToast } from "../providers/ToastProvider";
import { useLoading } from "../providers/LoadingProvider";

export const useTasks = () => {
  const { showToast } = useToast();
  const { show, hide } = useLoading();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(5);

  const fetchTasks = async (currentPage = page) => {
    show(); 
    try {
      setError(null);
      const data = await taskApi.getAll(currentPage, pageSize);
      setTasks(data.tasks);
      setTotal(data.total);
      setPage(currentPage);
    } catch (err) {
      setError("Yüklenirken Bir Hata Oluştu.");
      showToast("Task Listesi Yüklenirken Bir Hata Oluştu!", "error");
    } finally {
      hide(); 
    }
  };


  const createTask = async (title: string, description: string) => {
    show();
    try {
      await taskApi.create({ title, description });
      await fetchTasks();
       await fetchTasks(1);
      showToast("Task Kaydedildi!", "success");
    } catch{
      showToast("Task Kaydedilemedi!", "error");
    } finally {
      hide();
    }
  };

  const updateStatus = async (id: number, status: TaskStatus) => {
    show();
    try {
      await taskApi.updateStatus(id, { status });
      await fetchTasks();
      showToast("Task Status Güncellendi!", "success");
    } catch {
      showToast("Status Güncellenirken Hata Oluştu!", "error");
    } finally {
      hide();
    }
  };

   const nextPage = () => {
    if (page * pageSize < total) fetchTasks(page + 1);
  };
  const prevPage = () => {
    if (page > 1) fetchTasks(page - 1);
  };

  // --- COMPONENT MOUNT ---
  useEffect(() => {
    fetchTasks();
  }, []);

  return {
     tasks,
    error,
    createTask,
    updateStatus,
    page,
    pageSize,
    total,
    nextPage,
    prevPage,
    fetchTasks,
  };
};
