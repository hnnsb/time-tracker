import React, {useState} from 'react';

interface TaskDialogProps {
    onClose: () => void;
    onCreate: (title: string, description: string) => void;
}

export default function TaskCreateDialog({onClose, onCreate}: Readonly<TaskDialogProps>) {
    const [newTaskTitle, setNewTaskTitle] = useState('New Task');
    const [newTaskDescription, setNewTaskDescription] = useState('');

    return (
        <div
            className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
            <div className="p-4 rounded bg-gray-100
            dark:bg-gray-800 text-light-text dark:text-dark-text">
                <h2 className="text-lg">Create New Task</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="border p-2 w-full mb-2 dark:bg-gray-700"
                />
                <textarea
                    placeholder="Description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    className="border p-2 w-full mb-2 dark:bg-gray-700"
                ></textarea>
                <button onClick={() => onCreate(newTaskTitle, newTaskDescription)}
                        className="px-4 py-2 text-white bg-blue-600 rounded mr-2">
                    Create
                </button>
                <button onClick={onClose} className="px-4 py-2 text-white bg-gray-500 rounded">
                    Cancel
                </button>
            </div>
        </div>
    );
}
;

