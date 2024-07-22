"use client";

import TaskCard from "@/components/task-card";
import {Task} from "@/lib/model/task";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";


export default function TaskList() {
    const {data: session} = useSession();
    const [tasks, setTasks] = useState<Task[]>([]);
    const url = "http://localhost:8080/api/tasks";
    const [showDialog, setShowDialog] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');


    useEffect(() => {
        async function fetchTasks() {
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

        fetchTasks()
    }, [session?.user.email])

    async function handleDelete(taskToDelete: Task) {
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

    async function handleUpdate(updatedTask: Task) {
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

    async function handleCreate(newTask) {
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

    const handleDialogOpen = () => {
        setShowDialog(true);
    };

    const handleDialogClose = () => {
        setShowDialog(false);
    };
    const handleCreateNewTask = () => {
        const newTask = {
            name: newTaskTitle,
            description: newTaskDescription,
            startTime: new Date(),
            pauseTime: 0,
            pauseStart: null,
            email: session?.user.email
        };
        handleCreate(newTask);
        handleDialogClose();
    };

    return (
        <div>
            {showDialog && (
                <div
                    className="absolute top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-gray-700 p-4 rounded">
                        <h2 className="text-lg">Create New Task</h2>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            className="border bg-gray-800 p-2 w-full mb-2"
                        />
                        <textarea
                            placeholder="Description"
                            value={newTaskDescription}
                            onChange={(e) => setNewTaskDescription(e.target.value)}
                            className="border bg-gray-800 p-2 w-full mb-2"
                        ></textarea>
                        <button onClick={handleCreateNewTask} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
                            Create
                        </button>
                        <button onClick={handleDialogClose} className="px-4 py-2 bg-gray-500 text-white rounded">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            <button
                className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 ${!session?.user ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleDialogOpen}
                disabled={!session?.user}
            >
                Create Task
            </button>
            {tasks.map(task =>
                <TaskCard key={task.id}
                          task={task}
                          onDelete={() => handleDelete(task)}
                          onUpdate={() => handleUpdate(task)}
                ></TaskCard>
            )}
        </div>
    );
}
