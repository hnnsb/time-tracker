"use client";
import {useEffect, useState} from "react";
import {getCurrentTimeAdjusted} from "@/lib/utils";
import {FaPause, FaPen, FaPlay, FaSave, FaStop, FaTimes, FaTrash} from "react-icons/fa";

export default function TaskCard({task, onDelete, onUpdate}) {
    const [formattedTime, setFormattedTime] = useState<string>("00:00");
    const [isRunning, setIsRunning] = useState<boolean>(task.endTime === null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editedTitle, setEditedTitle] = useState<string>(task.name);
    const [editedDescription, setEditedDescription] = useState<string>(task.description);


    useEffect(() => {
        let interval;
        if (isRunning && !task.pauseStart) {
            interval = setInterval(() => {
                const now = new Date();
                const pausedDuration = task.pauseTime || 0;
                const activeDuration = now.getTime() - new Date(task.startTime).getTime() - pausedDuration;
                const seconds = Math.floor(activeDuration / 1000) % 60;
                const minutes = Math.floor(activeDuration / (1000 * 60));
                setFormattedTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, task.startTime, task.pauseTime, task.pauseStart]);

    const handleStop = () => {
        task.endTime = getCurrentTimeAdjusted();
        setIsRunning(false);
        onUpdate(task);
    };

    const handleDelete = () => {
        onDelete(task.id);
    }

    const handlePause = () => {
        const now = getCurrentTimeAdjusted();
        if (task.pauseStart) {
            if (task.pauseTime === undefined) {
                task.pauseTime = 0;
            }
            // Resuming from pause
            task.pauseTime += now.getTime() - new Date(task.pauseStart).getTime();
            task.pauseStart = null;
            console.log("Resuming from pause", task.pauseTime, task.pauseStart, isRunning)
        } else {
            // Pausing
            task.pauseStart = now;
            console.log("Pausing", task.pauseTime, new Date(task.pauseStart), isRunning)
        }
        setIsRunning(!isRunning);
        onUpdate(task);
    }

    const handleSave = () => {
        task.name = editedTitle;
        task.description = editedDescription;
        onUpdate(task);
        setEditMode(false);
    };

    const handleCancel = () => {
        setEditedTitle(task.name);
        setEditedDescription(task.description);
        setEditMode(false);
    };

    return (
        <div className="flex justify-between items-center mt-2 p-4 border border-gray-800 bg-gray-900 rounded">
            {editMode ? (<>
                <label htmlFor="titleInput" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    id="titleInput"
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="ml-4 px-2 py-1 border rounded bg-gray-800"
                />
                <label htmlFor="descriptionInput"
                       className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    id="descriptionInput"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="ml-4 px-2 py-1 border rounded bg-gray-800"
                />
                <button onClick={handleSave} className="ml-4 px-2 py-1 bg-green-500 text-white rounded">
                    <FaSave/>
                </button>
                <button onClick={handleCancel} className="ml-4 px-2 py-1 bg-gray-500 text-white rounded">
                    <FaTimes/>
                </button>
                <button onClick={handleDelete} className="ml-4 px-2 py-1 bg-red-500 text-white rounded">
                    <FaTrash/>
                </button>
            </>) : (<>
                <button onClick={() => setEditMode(!editMode)}
                        className="mx-4 px-2 py-1 bg-blue-500 text-white rounded">
                    <FaPen/>
                </button>
                <div>
                    <p className="text-lg font-semibold">{task.name}</p>
                    <p className="text-gray-600">{task.description}</p>
                </div>
                <div className="flex items-center">
                    {!task.endTime ? <>
                        <button onClick={handlePause} className="ml-4 px-2 py-1 bg-blue-500 text-white rounded">
                            {isRunning ? <FaPause/> : <FaPlay/>}
                        </button>
                        <button onClick={handleStop} className="ml-4 px-2 py-1 bg-red-500 text-white rounded">
                            <FaStop/>
                        </button>
                    </> : <></>}

                    <p className={`text-right ${isRunning ? 'text-red-600' : 'text-gray-400'} font-mono`}>
                        {task.pauseStart ? <FaPause className="inline-block w-2 h-2 mx-2"/> : null}
                        {isRunning ?
                            <span className="inline-block w-2 h-2 bg-red-600 rounded-full mx-2"></span> : null}
                        {formattedTime}
                    </p>
                </div>
            </>)}
        </div>
    );
}
