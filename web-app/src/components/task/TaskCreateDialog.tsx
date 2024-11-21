import React, { useEffect, useRef, useState } from "react";
import { Category } from "../../lib/model/category";

interface TaskDialogProps {
  onClose: () => void;
  onCreate: (title: string, description: string, startTask: boolean, category?: Category) => void;
  categories: Category[];
}

export default function TaskCreateDialog({
  onClose,
  onCreate,
  categories,
}: Readonly<TaskDialogProps>) {
  const [newTaskTitle, setNewTaskTitle] = useState("New Task");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("");
  const [startTask, setStartTask] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div
        className="p-4 rounded bg-gray-100
            dark:bg-gray-800 text-text"
      >
        <h2 className="text-lg">Create New Task</h2>
        <input
          ref={titleInputRef}
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
        <select
          className="border p-2 w-full mb-2 dark:bg-gray-700"
          value={newTaskCategory}
          onChange={(e) => setNewTaskCategory(e.target.value)}
        >
          <option value={null}>Select Category</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          onClick={() =>
            onCreate(
              newTaskTitle,
              newTaskDescription,
              startTask,
              categories.filter((c) => c.id === newTaskCategory)[0]
            )
          }
          className="px-4 py-2 text-white bg-blue-600 rounded mr-2"
        >
          Save
        </button>
        <button onClick={onClose} className="px-4 py-2 text-white bg-gray-500 rounded mr-2">
          Cancel
        </button>
        <input
          id="checkStart"
          title="Start task on save"
          type="checkbox"
          className="mr-1"
          onChange={() => setStartTask(!startTask)}
        />
        <label htmlFor="checkStart">Start Task</label>
      </div>
    </div>
  );
}
