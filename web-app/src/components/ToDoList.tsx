import { Task } from "../lib/model/task";
import ToDoCard from "./task/ToDoCard";

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
      <div>Status, Task Name, Description, Delete</div>
      {tasks.map((task) => (
        <ToDoCard
          className="mt-2"
          key={task.id}
          task={task}
          onStart={handleStart}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
