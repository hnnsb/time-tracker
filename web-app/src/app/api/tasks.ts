import { Task } from "@/lib/model/task";

const taskUrl = "http://localhost:8080/api/tasks";

export async function getTasks(email: string): Promise<Task[]> {
    const response = await fetch(`${taskUrl}?email=${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        let fetchedTasks = await response.json();
        return fetchedTasks.sort((a: Task, b: Task) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
    }
    throw new Error(`HTTP error! status: ${response.status}`);
}

export async function deleteTask(taskId: string): Promise<void> {
    const response = await fetch(`${taskUrl}/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}

export async function putTask(updatedTask: Task): Promise<Task> {
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
    return await response.json();
}

export async function postTask(newTask: Task): Promise<Task> {
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
    return await response.json();
}