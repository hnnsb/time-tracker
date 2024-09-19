import { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import { Task } from "../lib/model/task";
import { Category } from "../lib/model/category";
import { deleteTask, postTask, putTask } from "../api/tasks";
import { deleteCategory, postCategory, putCategory } from "../api/categories";
import TaskCreateDialog from "../components/task/task-create-dialog";
import CategoryCreateDialog from "../components/category/category-create-dialog";
import CategoryDropdown from "../components/category/category-dropdown";
import TaskCard from "../components/task/task-card";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  const handleTaskDialogOpen = () => setShowTaskDialog(true);

  const handleCategoryDialogOpen = (category: Category) => {
    setCategoryToEdit(category);
    setShowCategoryDialog(true);
  };

  const handleCreateNewTask = async (title, description, category?) => {
    const newTask = new Task(title, description, new Date(), category);
    const createdTask = await postTask(newTask);
    setTasks([createdTask, ...tasks]);
    setShowTaskDialog(false);
  };

  const handleEditCategory = async (title, color) => {
    if (categoryToEdit) {
      categoryToEdit.name = title;
      categoryToEdit.color = color;
      const updatedCategory = await putCategory(categoryToEdit);
      setCategories(
        categories.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category,
        ),
      );

      const updatedTasks = tasks.map((task) => {
        if (task.category?.id === updatedCategory.id) {
          task.category = updatedCategory;
        }
        return task;
      });
      setTasks(updatedTasks);
    } else {
      const newCategory = new Category(title, color);
      const createdCategory = await postCategory(newCategory);
      setCategories([createdCategory, ...categories]);
    }
    setShowCategoryDialog(false);
  };

  const handleDeleteCategory = async (category: Category) => {
    deleteCategory(category.id).then(() =>
      setCategories(categories.filter((c) => c.id !== category.id)),
    );
    tasks.forEach((task) => {
      if (task.category?.id === category.id) {
        task.category = null;
      }
    });
  };

  const groupedTasks = tasks.reduce((acc: Object, task: Task) => {
    const date = new Date(task.startTime).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(task);
    return acc;
  }, {});

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
          onCategoryDialogOpen={() => handleCategoryDialogOpen(null)}
          onTaskDialogOpen={handleTaskDialogOpen}
        />
        <CategoryDropdown
          categories={categories}
          onEdit={handleCategoryDialogOpen}
          onDelete={handleDeleteCategory}
        />
      </div>
      {Object.entries(groupedTasks).map(
        ([date, tasksForDate]: [string, Task[]]) => (
          <Fragment key={date}>
            <div className="mt-4">{date}</div>
            {tasksForDate.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                categories={categories}
                onDelete={() =>
                  deleteTask(task.id).then(() =>
                    setTasks(tasks.filter((t) => t.id !== task.id)),
                  )
                }
                onUpdate={() =>
                  putTask(task).then((updatedTask) =>
                    setTasks(
                      tasks.map((t) =>
                        t.id === updatedTask.id ? updatedTask : t,
                      ),
                    ),
                  )
                }
              />
            ))}
          </Fragment>
        ),
      )}
    </div>
  );
}

function TaskManagerControls({ onTaskDialogOpen, onCategoryDialogOpen }) {
  return (
    <div>
      <Button
        className={
          "m-1 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
        }
        onClick={onTaskDialogOpen}
      >
        Create Task
      </Button>
      <Button
        className={
          "m-1 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
        }
        onClick={onCategoryDialogOpen}
      >
        Create Category
      </Button>
    </div>
  );
}
