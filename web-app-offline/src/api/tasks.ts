import { Task } from "../lib/model/task";
import { getFromLocalStorage, saveToLocalStorage } from "../lib/localStorage";

const TASKS_KEY = "tasks";

export function getTasks() {
  const tasks = getFromLocalStorage(TASKS_KEY) || [];
  return tasks.sort(
    (a: Task, b: Task) =>
      new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
  );
}

export function deleteTask(taskId: string) {
  let tasks = getFromLocalStorage(TASKS_KEY) || [];
  tasks = tasks.filter((task: Task) => task.id !== taskId);
  saveToLocalStorage(TASKS_KEY, tasks);
}

export function putTask(updatedTask: Task) {
  let tasks = getFromLocalStorage(TASKS_KEY) || [];
  tasks = tasks.map((task: Task) =>
    task.id === updatedTask.id ? updatedTask : task,
  );
  saveToLocalStorage(TASKS_KEY, tasks);
  return updatedTask;
}

export function postTask(newTask: Task) {
  const tasks = getFromLocalStorage(TASKS_KEY) || [];
  tasks.push(newTask);
  saveToLocalStorage(TASKS_KEY, tasks);
  return newTask;
}
