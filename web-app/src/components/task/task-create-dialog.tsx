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
                <button onClick={() => onCreate(newTaskTitle, newTaskDescription)}
                        className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
                    Create
                </button>
                <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
                    Cancel
                </button>
            </div>
        </div>
    );
}
;

