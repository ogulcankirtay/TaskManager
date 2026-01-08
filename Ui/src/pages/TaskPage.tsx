import { useTasks } from "../hooks/useTasks";
import { TaskList } from "../components/TaskList";
import { TaskCreateBar } from "../components/TaskCreateBar";

export const TaskPage = () => {
   const { tasks, createTask, updateStatus, page, total, pageSize, nextPage, prevPage } = useTasks();

  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          🎯 Görevlerim
        </h1>
        <TaskCreateBar onCreate={createTask} />
        <TaskList tasks={tasks} onStatusChange={updateStatus} />
         <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={prevPage}
            disabled={page === 1}
          >
            Önceki
          </button>
          <span>
            {page} / {Math.ceil(total / pageSize)}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={nextPage}
            disabled={page * pageSize >= total}
          >
            Sonraki
          </button>
        </div>
      </div>
    </div>
  );
};
