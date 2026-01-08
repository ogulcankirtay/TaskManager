import { Task, TaskStatus } from "../types/task.types";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (id: number, status: TaskStatus) => void;
}

export const TaskList = ({ tasks, onStatusChange }: TaskListProps) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-gray-500 text-lg">Henüz görev bulunmuyor</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onStatusChange={onStatusChange} />
      ))}
    </div>
  );
};
