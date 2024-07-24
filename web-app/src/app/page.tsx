import TaskList from "@/components/task/task-list";
import AuthContext from "@/contexts/AuthContext";


export default async function Home() {
    return (
        <div className="container m-auto">
            <AuthContext>
                <TaskList></TaskList>
            </AuthContext>
        </div>
    );
}
