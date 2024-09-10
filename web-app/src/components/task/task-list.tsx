"use client";

import TaskCard from "@/components/task/task-card";
import {Task} from "@/lib/model/task";
import {useSession} from "next-auth/react";
import {Fragment, useEffect, useState} from "react";
import TaskCreateDialog from "@/components/task/task-create-dialog";
import {Category} from "@/lib/model/category";
import CategoryCreateDialog from "@/components/category/category-create-dialog";
import Dropdown from "react-bootstrap/Dropdown";
import {DropdownButton} from "react-bootstrap";
import CategoryCard from "@/components/category/category-card";


export default function TaskList() {
    const {data: session} = useSession();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const taskUrl = "http://localhost:8080/api/tasks";
    const categoryUrl = "http://localhost:8080/api/categories";
    const [showTaskDialog, setShowTaskDialog] = useState(false);
    const [showCategoryDialog, setShowCategoryDialog] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

    useEffect(() => {
        getCategories()
        getTasks()
    }, [session?.user.email]);

    async function getTasks() {
        if (session?.user.email) {
            const response = await fetch(`${taskUrl}?email=${session.user.email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                let fetchedTasks = await response.json();
                fetchedTasks = fetchedTasks.sort((a: Task, b: Task) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
                setTasks(fetchedTasks);
                console.log("fetched tasks", fetchedTasks)
            }
        }
    }

    async function getCategories() {
        if (session?.user.email) {
            const response = await fetch(`${categoryUrl}?email=${session.user.email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                let fetchedCategories = await response.json();
                setCategories(fetchedCategories);
                console.log("fetched categories", fetchedCategories)
            }
        }
    }

    async function deleteTask(taskToDelete: Task) {
        try {
            const response = await fetch(`${taskUrl}/${taskToDelete.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setTasks(tasks.filter(task => task.id !== taskToDelete.id))
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    }

    async function putTask(updatedTask: Task) {
        try {
            const response = await fetch(taskUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    }

    async function postTask(newTask) {
        try {
            const response = await fetch(taskUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setTasks([data as Task, ...tasks]);
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    }

    async function deleteCategory(categoryToDelete: Category) {
        try {
            const response = await fetch(`${categoryUrl}/${categoryToDelete.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setCategories(categories.filter(category => category.id !== categoryToDelete.id))
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    }

    async function putCategory(updatedCategory: Category) {
        try {
            const response = await fetch(categoryUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCategory),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setCategories(categories.map(category => category.id === updatedCategory.id ? updatedCategory : category));
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    }

    async function postCategory(newCategory) {
        try {
            const response = await fetch(categoryUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setCategories([data as Category, ...categories]);
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    }

    const groupedTasks = tasks.reduce((acc, task) => {
        const date = new Date(task.startTime).toDateString(); // Convert to a simple date string
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(task);
        return acc;
    }, {});

    const handleTaskDialogOpen = () => {
        setShowTaskDialog(true);
    };

    const handleCategoryDialogOpen = (category: Category) => {
        setCategoryToEdit(category);
        setShowCategoryDialog(true);
    };

    const handleCreateNewTask = (title, description, category?) => {
        const newTask = new Task(title, description, new Date(), session?.user.email, category);
        postTask(newTask);
        setShowTaskDialog(false);
    };

    const handleEditCategory = (title, color) => {
        if (categoryToEdit) {
            categoryToEdit.name = title;
            categoryToEdit.color = color;
            putCategory(categoryToEdit);
        } else {
            const newCategory = new Category(title, session?.user.email, color);
            postCategory(newCategory);
        }
        setShowCategoryDialog(false);
    }

    return (
        <div>
            {showTaskDialog && (
                <TaskCreateDialog
                    onCreate={handleCreateNewTask}
                    onClose={() => setShowTaskDialog(false)}
                    categories={categories}/>
            )}
            {showCategoryDialog && (
                <CategoryCreateDialog
                    onCreate={handleEditCategory}
                    onClose={() => setShowCategoryDialog(false)}
                    name={categoryToEdit?.name}
                    color={categoryToEdit?.color}
                />
            )}
            <button
                className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 ${!session?.user ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleTaskDialogOpen}
                disabled={!session?.user}
            >
                Create Task
            </button>
            <button
                className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 ${!session?.user ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handleCategoryDialogOpen(null)}
                disabled={!session?.user}
            >
                Create Category
            </button>
            <DropdownButton id="dropdown-bais" title="Categories">
                {categories.map(category => (
                    <Dropdown.Item key={category.id}>{category.name}
                        <CategoryCard
                            category={category}
                            onDelete={() => deleteCategory(category)}
                            onEdit={() => handleCategoryDialogOpen(category)}
                        />
                    </Dropdown.Item>
                ))}
            </DropdownButton>
            {Object.entries(groupedTasks).map(([date, tasksForDate]: [date: string, tasksForDate: Task[]]) => (
                <Fragment key={date}>
                    <div className="mt-4">{date}</div>
                    {tasksForDate.map(task => (
                        <TaskCard key={task.id}
                                  task={task}
                                  categories={categories}
                                  onDelete={() => deleteTask(task)}
                                  onUpdate={() => putTask(task)}
                        />
                    ))}
                </Fragment>
            ))
            }
        </div>
    );
}
