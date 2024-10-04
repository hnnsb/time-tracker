import "./todolist.css";
import { Task } from "../../lib/model/task";
import ToDoCard from "./ToDoCard";

interface ToDoProps {
  className?: string;
  tasks: Task[];
  onUpdate: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function ToDoList({ className, tasks, onUpdate, onDelete }: Readonly<ToDoProps>) {
  function handleStart(task: Task) {
    task.start();
    onUpdate(task);
  }

  return (
    <div className={className}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="table-header w-1/12">Status</th>
            <th className="table-header w-4/12">Task Name</th>
            <th className="table-header w-6/12">Description</th>
            <th className="table-header w-1/12"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.map((task) => (
            <ToDoCard key={task.id} task={task} onStart={handleStart} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
