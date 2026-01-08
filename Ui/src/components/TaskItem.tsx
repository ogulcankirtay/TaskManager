
import { CheckCircle, Circle, Clock } from 'lucide-react';

type TaskStatus = 0 | 1 | 2;

interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

// ========== TaskItem Component ==========
interface TaskItemProps {
  task: Task;
  onStatusChange: (id: number, status: TaskStatus) => void;
}

export const TaskItem = ({ task, onStatusChange }: TaskItemProps) => {
  const getStatusConfig = (status: TaskStatus) => {
    switch (status) {
      case 0:
        return {
          color: 'text-slate-600',
          bgColor: 'bg-slate-100',
          borderColor: 'border-slate-400',
          icon: Circle,
          label: 'Todo',
          selectBg: 'bg-slate-50'
        };
      case 1:
        return {
          color: 'text-amber-600',
          bgColor: 'bg-amber-100',
          borderColor: 'border-amber-500',
          icon: Clock,
          label: 'In Progress',
          selectBg: 'bg-amber-50'
        };
      case 2:
        return {
          color: 'text-emerald-600',
          bgColor: 'bg-emerald-100',
          borderColor: 'border-emerald-500',
          icon: CheckCircle,
          label: 'Done',
          selectBg: 'bg-emerald-50'
        };
    }
  };

  const config = getStatusConfig(task.status);
  const StatusIcon = config.icon;

  return (
    <div
      className={`border-l-4 ${config.borderColor} bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex items-center gap-2">
              <StatusIcon className={`w-5 h-5 ${config.color} flex-shrink-0`} />
              <h3
                className={`text-lg font-semibold break-words ${
                  task.status === 2
                    ? 'line-through text-gray-500'
                    : 'text-gray-800'
                }`}
              >
                {task.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 ml-7 break-words overflow-hidden">{task.description}</p>
          </div>

          <select
            value={task.status}
            onChange={(e) =>
              onStatusChange(task.id, Number(e.target.value) as TaskStatus)
            }
            className={`px-3 py-2 rounded-lg border-2 ${config.borderColor} ${config.selectBg} ${config.color} font-medium text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all flex-shrink-0`}
          >
            <option value={0}>📋 Todo</option>
            <option value={1}>⏳ In Progress</option>
            <option value={2}>✅ Done</option>
          </select>
        </div>

        <div className="mt-3">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bgColor} ${config.color}`}
          >
            {config.label}
          </span>
        </div>
      </div>
    </div>
  );
};