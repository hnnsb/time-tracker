import "./todolist.css";
import { Task } from "../../lib/model/task";
import ToDoCard from "./ToDoCard";
import { Fragment } from "react";
import { Category } from "../../lib/model/category";

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

  const defaultCategory = new Category("no category", "gray");
  let groupedTasks = tasks.reduce((acc, task) => {
    const category = task.category || defaultCategory;
    if (!acc.get(category)) {
      acc.set(category, []);
    }
    acc.get(category).push(task);
    return acc;
  }, new Map<Category, Task[]>());

  // Makes sure tasks without a category are always at the end, because Map.entries() returns entries in insertion order.
  const tasksWithoutCategory = groupedTasks.get(defaultCategory);
  if (tasksWithoutCategory) {
    groupedTasks.delete(defaultCategory);
    groupedTasks.set(defaultCategory, tasksWithoutCategory);
  }

  return (
    <div className={className}>
      <table className="rounded bg-bg_secondary divide-y border-text min-w-full">
        <thead>
          <tr>
            <th className="table-header w-1/12">Status</th>
            <th className="table-header w-4/12">Task Name</th>
            <th className="table-header w-6/12">Description</th>
            <th className="table-header w-1/12"></th>
          </tr>
        </thead>
        <tbody className="bg-bg_primary">
          {Array.from(groupedTasks.entries()).map(([category, tasks]) => (
            <Fragment key={category.id}>
              <tr>
                <td colSpan={4} className="table-category-header bg-bg_tertiary">
                  <span style={{ color: category.color }}>{category.name}</span>
                </td>
              </tr>
              {tasks.map((task) => (
                <ToDoCard key={task.id} task={task} onStart={handleStart} onDelete={onDelete} />
              ))}
            </Fragment>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 m-1">
                {tasks.filter((task) => task.isStarted()).length} in progress / {tasks.length} Tasks
              </p>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
