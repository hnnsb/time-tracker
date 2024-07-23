"use client";

import TaskCard from "@/components/task/task-card";
import {Task} from "@/lib/model/task";
import {useSession} from "next-auth/react";
import {Fragment, useEffect, useState} from "react";
import TaskCreateDialog from "@/components/task/task-create-dialog";


export default function TaskList() {
    const {data: session} = useSession();
    const [tasks, setTasks] = useState<Task[]>([]);
    const url = "http://localhost:8080/api/tasks";
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        async function getTasks() {
            if (session?.user.email) {
                const response = await fetch(`${url}?email=${session.user.email}`, {
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

        getTasks()
    }, [session?.user.email])

    async function deleteTask(taskToDelete: Task) {
        try {
            const response = await fetch(`${url}/${taskToDelete.id}`, {
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
            const response = await fetch(url, {
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
            const response = await fetch(url, {
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

    const groupedTasks = tasks.reduce((acc, task) => {
        const date = new Date(task.startTime).toDateString(); // Convert to a simple date string
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(task);
        return acc;
    }, {});

    const handleDialogOpen = () => {
        setShowDialog(true);
    };

    const handleCreateNewTask = (newTaskTitle, newTaskDescription) => {
        const newTask = new Task(newTaskTitle, newTaskDescription, new Date(), session?.user.email);
        postTask(newTask);
        setShowDialog(false);
    };

    return (
        <div>
            {showDialog && (
                <TaskCreateDialog onCreate={handleCreateNewTask}
                                  onClose={() => setShowDialog(false)}></TaskCreateDialog>
            )}
            <button
                className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 ${!session?.user ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleDialogOpen}
                disabled={!session?.user}
            >
                Create Task
            </button>
            {Object.entries(groupedTasks).map(([date, tasksForDate]) => (
                <Fragment key={date}>
                    <div className="mt-4">{date}</div>
                    {tasksForDate.map(task => (
                        <TaskCard key={task.id} task={task}
                                  onDelete={() => deleteTask(task)}
                                  onUpdate={() => putTask(task)}
                        />
                    ))}
                </Fragment>
            ))}
        </div>
    );
}
