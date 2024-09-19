import React, { useState } from "react";

interface CategoryDialogProps {
  onClose: () => void;
  onCreate: (title: string, description: string) => void;
  name?: string;
  color?: string;
}

export default function CategoryCreateDialog({
  onClose,
  onCreate,
  name,
  color,
}: Readonly<CategoryDialogProps>) {
  const [categoryName, setCategoryName] = useState(name || "New Category");
  const [categoryColor, setCategoryColor] = useState(color || "#FFFFFF");

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="p-4 rounded bg-gray-100 dark:bg-gray-800 text-light-text dark:text-dark-text">
        <h2 className="text-lg">Create New Category</h2>
        <label htmlFor={"categoryName"}>Name</label>
        <input
          type="text"
          placeholder="Title"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border p-2 w-full mb-2 dark:bg-gray-700"
        />
        <label htmlFor={"categoryColor"}>Color</label>
        <input
          id={"categoryColor"}
          type="color"
          name={"categoryColor"}
          title={"Category Color"}
          value={categoryColor}
          onChange={(e) => setCategoryColor(e.target.value)}
          className="border p-2 w-full h-20 mb-2 dark:bg-gray-700"
        />
        <button
          onClick={() => onCreate(categoryName, categoryColor)}
          className="px-4 py-2 text-white bg-blue-600 rounded mr-2"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 text-white bg-gray-500 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
