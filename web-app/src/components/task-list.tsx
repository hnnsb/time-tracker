"use client";

import TaskCard from "@/components/task-card";
import {Task} from "@/lib/model/task";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {getCurrentTimeAdjusted} from "@/lib/utils";


export default function TaskList() {
    const {data: session} = useSession();
    const [tasks, setTasks] = useState<Task[]>([]);
    const url = "http://localhost:8080/api/tasks";

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
                }
            }
        }

        fetchTasks();
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
        updatedTask.endTime = new Date();
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

    async function handleCreate() {
        if (!session?.user.email) {
            console.error("User email not found in session");
            return
        }

        const newTask = {
            name: 'New Task',
            description: 'Description for New Task',
            startTime: getCurrentTimeAdjusted(),
            email: session?.user.email
        };
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

    return (
        <div>
            <button
                className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 ${!session?.user ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleCreate}
                disabled={!session?.user}
            >
                Create Task
            </button>
            {tasks.map(task =>
                <TaskCard key={task.id}
                          task={task}
                          onDelete={() => handleDelete(task)}
                          onUpdate={() => handleUpdate(task)}></TaskCard>
            )}
        </div>
    );
}
