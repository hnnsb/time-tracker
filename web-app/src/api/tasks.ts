import { Task } from "../lib/model/task";
import { getFromLocalStorage, saveToLocalStorage } from "../lib/localStorage";

const TASKS_KEY = "tasks";

export function getTasks() {
  let tasks = getFromLocalStorage<Task>(TASKS_KEY) || [];
  tasks = tasks.map((task: Task) => Task.fromJSON(task));
  return tasks;
}

export function deleteTask(taskId: string) {
  let tasks = getFromLocalStorage(TASKS_KEY) || [];
  tasks = tasks.filter((task: Task) => task.id !== taskId);
  saveToLocalStorage(TASKS_KEY, tasks);
}

export function putTask(updatedTask: Task) {
  let tasks = getFromLocalStorage(TASKS_KEY) || [];
  tasks = tasks.map((task: Task) => (task.id === updatedTask.id ? updatedTask : task));
  saveToLocalStorage(TASKS_KEY, tasks);
  return updatedTask;
}

export function postTask(newTask: Task) {
  const tasks = getFromLocalStorage(TASKS_KEY) || [];
  tasks.unshift(newTask);
  saveToLocalStorage(TASKS_KEY, tasks);
  return newTask;
}
