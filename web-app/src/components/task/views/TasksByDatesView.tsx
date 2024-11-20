import { Task } from "../../../lib/model/task";
import React, { Fragment } from "react";
import TaskCard from "../TaskCard";
import { Category } from "../../../lib/model/category";
import { DAY_NAMES } from "../../../lib/consts/days";

interface TaskListProps {
  className?: string;
  tasks: Task[];
  categories: Category[];
  onUpdate: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function TasksByDatesView({
  className,
  tasks,
  categories,
  onUpdate,
  onDelete,
}: Readonly<TaskListProps>) {
  tasks.sort((a: Task, b: Task) => b.startTime.getTime() - a.startTime.getTime());
  const groupedTasks = tasks.reduce((acc, task) => {
    const date = DAY_NAMES[task.startTime.getDay()] + ", " + task.startTime.toLocaleDateString();
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
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 m-1">
        {tasks.filter((task) => task.isStopped()).length} Tasks completed
      </p>
    </div>
  );
}
