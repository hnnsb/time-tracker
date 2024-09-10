import React, {useState} from 'react';
import {Category} from "@/lib/model/category";

interface TaskDialogProps {
    onClose: () => void;
    onCreate: (title: string, description: string, category?: Category) => void;
    categories: Category[];
}

export default function TaskCreateDialog({onClose, onCreate, categories}: Readonly<TaskDialogProps>) {
    const [newTaskTitle, setNewTaskTitle] = useState('New Task');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskCategory, setNewTaskCategory] = useState('');

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
                <select value={newTaskCategory} onChange={(e) => setNewTaskCategory(e.target.value)}>
                    <option value={null}>Select Category</option>
                    {categories.map(category => (<option value={category.id} key={category.id}>{category.name}</option>))}
                </select>
                <button onClick={() => onCreate(newTaskTitle, newTaskDescription, categories.filter(c => c.id === newTaskCategory)[0])}
                        className="px-4 py-2 text-white bg-blue-600 rounded mr-2">
                    Save
                </button>
                <button onClick={onClose} className="px-4 py-2 text-white bg-gray-500 rounded">
                    Cancel
                </button>
            </div>
        </div>
    );
}
;

