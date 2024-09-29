import { Fragment, useState } from "react";
import { Task } from "../lib/model/task";
import { Category } from "../lib/model/category";
import { deleteTask, getTasks, postTask, putTask } from "../api/tasks";
import { deleteCategory, getCategories, postCategory, putCategory } from "../api/categories";
import TaskCreateDialog from "../components/task/task-create-dialog";
import CategoryCreateDialog from "../components/category/category-create-dialog";
import CategoryDropdown from "../components/category/category-dropdown";
import TaskCard from "../components/task/task-card";
import PButton from "../components/PButton";

export default function TaskListPage() {
  const [tasks, setTasks] = useState<Task[]>(getTasks());
  const [categories, setCategories] = useState<Category[]>(getCategories());
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  const openTaskDialog = () => setShowTaskDialog(true);

  const openCategoryDialog = (category: Category) => {
    setCategoryToEdit(category);
    setShowCategoryDialog(true);
  };

  const handleCreateNewTask = (title: string, description: string, category?: Category) => {
    const newTask = new Task(title, description, new Date(), category);
    const createdTask = postTask(newTask);
    setTasks([createdTask, ...tasks]);
    setShowTaskDialog(false);
  };

  const handleEditCategory = (title: string, color: string) => {
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
  };

  const handleDeleteCategory = (category: Category) => {
    deleteCategory(category.id);
    setCategories(categories.filter((other) => category.id !== other.id));
    tasks.forEach((task) => {
      if (task.category?.id === category.id) {
        task.category = undefined;
      }
    });
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    const date = new Date(task.startTime).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, new Map<string, Task[]>());

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
      {Object.entries(groupedTasks).map(([date, tasksForDate]: [string, Task[]]) => (
        <Fragment key={date}>
          <div className="mt-4 ">{date}</div>
          {tasksForDate.map((task) => (
            <TaskCard
              className="mt-2"
              key={task.id}
              task={task}
              categories={categories}
              onDelete={() => {
                deleteTask(task.id);
                setTasks(tasks.filter((other) => task.id !== other.id));
              }}
              onUpdate={() => {
                const updatedTask = putTask(task);
                setTasks(tasks.map((other) => (updatedTask.id === other.id ? updatedTask : other)));
              }}
            />
          ))}
        </Fragment>
      ))}
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
