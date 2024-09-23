import React, { useState } from "react";

interface CreateDialogProps {
  title: string;
  fields: { name: string; placeholder: string; type: string }[];
  onClose: () => void;
  onCreate: (values: { [key: string]: string }) => void;
}

export default function CreateDialog({
  title,
  fields,
  onClose,
  onCreate,
}: Readonly<CreateDialogProps>) {
  const [values, setValues] = useState<{ [key: string]: string }>({});

  const handleChange = (name: string, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="p-4 rounded bg-gray-100 dark:bg-gray-800 text-light-text dark:text-dark-text">
        <h2 className="text-lg">{title}</h2>
        {fields.map((field) => (
          <div key={field.name} className="mb-2">
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={values[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="border p-2 w-full dark:bg-gray-700"
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button
            onClick={() => onCreate(values)}
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
    </div>
  );
}
