import TaskList from "@/components/task/task-list";
import {getCurrentUser} from "@/lib/session";
import {Task} from "@/lib/model/task";
import AuthContext from "@/contexts/AuthContext";


export default async function Home() {
    const user = await getCurrentUser();
    let tasks: Task[] = []
    if (user) {
        const url = `${process.env.BACKEND_URL}/api/tasks?email=${user.email}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        tasks = await response.json();
    }

    return (
        <div className="container m-auto">
            <AuthContext>
                <TaskList tasks={tasks}></TaskList>
            </AuthContext>
        </div>
    );
}
