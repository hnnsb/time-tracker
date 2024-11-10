import { Task } from "../../../lib/model/task";
import React, { Fragment } from "react";
import TaskCard from "../TaskCard";
import { Category } from "../../../lib/model/category";

interface TasksByCategoryViewProps {
  className?: string;
  categories: Category[];
  tasks: Task[];
  onUpdate;
  onDelete;
}

export default function TasksByCategoryView({
  tasks,
  className,
  categories,
  onUpdate,
  onDelete,
}: Readonly<TasksByCategoryViewProps>) {
  const defaultCategory = new Category("no category", "gray");
  const groupedTasks = tasks
    .filter((task) => task.startTime)
    .reduce((acc, task) => {
      const category = task.category || defaultCategory;
      if (!acc.get(category)) {
        acc.set(category, []);
      }
      acc.get(category).push(task);
      return acc;
    }, new Map<Category, Task[]>());
  const tasksWithoutCategory = groupedTasks.get(defaultCategory);
  if (tasksWithoutCategory) {
    groupedTasks.delete(defaultCategory);
    groupedTasks.set(defaultCategory, tasksWithoutCategory);
  }

  return (
    <div className={`${className}`}>
      {Array.from(groupedTasks.entries()).map(([category, tasksForCategory]) => (
        <Fragment key={category.id}>
          <div className="flex content-start gap-2">
            <div
              className="rounded-circle w-6 h-6"
              style={{ backgroundColor: category.color }}
            ></div>
            <h6>{category.name}</h6>
          </div>
          {tasksForCategory.map((task) => (
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
