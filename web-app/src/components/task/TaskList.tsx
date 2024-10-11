import { Task } from "../../lib/model/task";
import { Fragment } from "react";
import TaskCard from "./TaskCard";
import { Category } from "../../lib/model/category";

interface TaskListProps {
  className?: string;
  tasks: Task[];
  categories: Category[];
  onUpdate: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function TaskList({
  className,
  tasks,
  categories,
  onUpdate,
  onDelete,
}: Readonly<TaskListProps>) {
  tasks.sort((a: Task, b: Task) => b.startTime.getTime() - a.startTime.getTime());
  const groupedTasks = tasks.reduce((acc, task) => {
    const date = task.startTime.toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, new Map<string, Task[]>());

  return (
    <div className={`${className}`}>
      {Object.entries(groupedTasks).map(([date, tasksForDate]: [string, Task[]]) => (
        <Fragment key={date}>
          <h6>{date}</h6>
          {tasksForDate.map((task) => (
            <TaskCard
              className="mb-2"
              key={task.id}
              task={task}
              categories={categories}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
}
