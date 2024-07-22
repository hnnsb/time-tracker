"use client";
import {useEffect, useState} from "react";
import {getCurrentTimeAdjusted} from "@/lib/utils";

export default function TaskCard({task, onDelete, onUpdate}) {
    const [formattedTime, setFormattedTime] = useState<string>("00:00");
    const [isRunning, setIsRunning] = useState<boolean>(task.endTime === null);

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                const now = new Date();
                const diff = Math.floor((now.getTime() - new Date(task.startTime).getTime()) / 1000);
                const minutes = Math.floor(diff / 60).toString().padStart(2, '0');
                const seconds = (diff % 60).toString().padStart(2, '0');
                setFormattedTime(`${minutes}:${seconds}`);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            const diff = Math.floor((new Date(task.endTime).getTime() - new Date(task.startTime).getTime()) / 1000);
            const minutes = Math.floor(diff / 60).toString().padStart(2, '0');
            const seconds = (diff % 60).toString().padStart(2, '0');
            setFormattedTime(`${minutes}:${seconds}`);
        }
    }, [isRunning, task.endTime, task.startTime]);

    const handleStop = () => {
        task.endTime = getCurrentTimeAdjusted();
        onUpdate(task);
        setIsRunning(false);
    };

    const handleDelete = () => {
        onDelete(task.id);
    }

    return (
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div>
                <p className="text-lg font-semibold">{task.name}</p>
                <p className="text-gray-600">{task.description}</p>
            </div>
            <div className="flex items-center">
                {isRunning && (
                    <button onClick={handleStop} className="ml-4 px-2 py-1 bg-blue-500 text-white rounded">
                        Stop
                    </button>
                )}
                <p className={`text-right ${isRunning ? 'text-red-600' : 'text-gray-800'} font-mono`}>
                    {isRunning && <span className="inline-block w-2 h-2 bg-red-600 rounded-full mx-2"></span>}
                    {formattedTime}
                </p>
                <button onClick={handleDelete} className="ml-4 px-2 py-1 bg-red-500 text-white rounded">
                    Delete
                </button>
            </div>
        </div>
    );
}