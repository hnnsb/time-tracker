import React, { useState } from "react";
import { Task } from "../lib/model/task";
import { Category } from "../lib/model/category";
import { deleteTask, getTasks, postTask, putTask } from "../api/tasks";
import { deleteCategory, getCategories, postCategory, putCategory } from "../api/categories";
import TaskCreateDialog from "../components/task/TaskCreateDialog";
import CategoryCreateDialog from "../components/category/category-create-dialog";
import CategoryDropdown from "../components/category/category-dropdown";
import PButton from "../components/PButton";
import ToDoList from "../components/task/ToDoList";
import TasksByDatesView from "../components/task/views/TasksByDatesView";
import TasksPerDayView from "../components/task/views/TasksDateView";
import ViewSwitcher from "../components/ViewSwitcher";
import { FaBoxes, FaCalendarAlt, FaCalendarDay } from "react-icons/fa";
import TasksByCategoryView from "../components/task/views/TasksByCategoryView";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>(getTasks());
  const [categories, setCategories] = useState<Category[]>(getCategories());
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  const openTaskDialog = () => setShowTaskDialog(true);

  function openCategoryDialog(category: Category) {
    setCategoryToEdit(category);
    setShowCategoryDialog(true);
  }

  function handleCreateNewTask(
    title: string,
    description: string,
    startTask: boolean,
    category?: Category
  ) {
    let startDate = startTask ? new Date() : undefined;
    const newTask = new Task(title, description, startDate, category);
    const createdTask = postTask(newTask);
    setTasks([createdTask, ...tasks]);
    setShowTaskDialog(false);
  }

  function handleDeleteTask(task: Task) {
    deleteTask(task.id);
    setTasks(tasks.filter((other) => task.id !== other.id));
  }

  function handleUpdateTask(task: Task) {
    const updatedTask = putTask(task);
    setTasks(tasks.map((other) => (updatedTask.id === other.id ? updatedTask : other)));
  }

  function handleEditCategory(title: string, color: string) {
    if (categoryToEdit) {
      categoryToEdit.name = title;
      categoryToEdit.color = color;
      const updatedCategory = putCategory(categoryToEdit);

      const updatedTasks = tasks.map((task) => {
        if (task.category?.id === updatedCategory.id) {
          task.category = updatedCategory;
        }
        return task;
      });
      updatedTasks.forEach((task) => putTask(task));
      setTasks(updatedTasks);
    } else {
      const newCategory = new Category(title, color);
      const createdCategory = postCategory(newCategory);
      setCategories([createdCategory, ...categories]);
    }
    setShowCategoryDialog(false);
  }

  function handleDeleteCategory(category: Category) {
    deleteCategory(category.id);
    setCategories(categories.filter((other) => category.id !== other.id));
    tasks.forEach((task) => {
      if (task.category?.id === category.id) {
        task.category = undefined;
      }
    });
  }

  return (
    <div>
      {showTaskDialog && (
        <TaskCreateDialog
          onCreate={handleCreateNewTask}
          onClose={() => setShowTaskDialog(false)}
          categories={categories}
        />
      )}
      {showCategoryDialog && (
        <CategoryCreateDialog
          onCreate={handleEditCategory}
          onClose={() => setShowCategoryDialog(false)}
          name={categoryToEdit?.name}
          color={categoryToEdit?.color}
        />
      )}
      <div className="flex justify-between">
        <TaskManagerControls
          onCategoryDialogOpen={() => openCategoryDialog(null)}
          onTaskDialogOpen={openTaskDialog}
        />
        <CategoryDropdown
          categories={categories}
          onEdit={openCategoryDialog}
          onDelete={handleDeleteCategory}
        />
      </div>
      <h3> To Do</h3>
      <ToDoList
        className="p-2 mb-3"
        tasks={tasks.filter((task) => !task.isStopped())}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
      />
      <ViewSwitcher title={<h3>Progress Track</h3>} icons={[FaCalendarAlt, FaCalendarDay, FaBoxes]}>
        <TasksByDatesView
          className="p-2"
          tasks={tasks.filter((task) => task.isStarted())}
          categories={categories}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
        <TasksPerDayView
          className="p-2"
          tasks={tasks}
          categories={categories}
          handleTaskDelete={handleDeleteTask}
          handleTaskUpdate={handleUpdateTask}
        />
        <TasksByCategoryView
          className="p-2"
          tasks={tasks}
          categories={categories}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
        />
      </ViewSwitcher>
    </div>
  );
}

function TaskManagerControls({ onTaskDialogOpen, onCategoryDialogOpen }) {
  return (
    <div>
      <PButton className={"mr-2"} onClick={onTaskDialogOpen}>
        Create Task
      </PButton>
      <PButton className={"mr-2"} onClick={onCategoryDialogOpen}>
        Create Category
      </PButton>
    </div>
  );
}
