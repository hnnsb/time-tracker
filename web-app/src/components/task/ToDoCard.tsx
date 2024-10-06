import { Task } from "../../lib/model/task";
import { FaPause, FaPlay, FaRegCircle, FaTrash } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import React from "react";
import "./todolist.css";

interface ToDoCardProps {
  className?: string;
  task: Task;
  onStart: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function ToDoCard({ className, task, onStart, onDelete }: Readonly<ToDoCardProps>) {
  const renderStatusIcon = () => {
    if (task.isPaused()) {
      return (
        <div className="bg-blue-500 w-6 h-6 flex text-white text-sm rounded">
          <FaPause className="m-auto" />
        </div>
      );
    } else if (task.isStarted()) {
      return (
        <div className="bg-blue-500 w-6 h-6 flex text-white text-sm rounded-circle">
          <FaArrowsRotate className="m-auto" />
        </div>
      );
    } else {
      return (
        <div className="w-6 h-6 flex text-xl rounded-circle">
          <FaRegCircle className="m-auto" />
        </div>
      );
    }
  };

  return (
    <tr className={`${className} table-row`}>
      <td className="table-data w-1/12">
        <div className="flex justify-center">{renderStatusIcon()}</div>
      </td>
      <td className="table-data w-4/12">{task.name}</td>
      <td className="table-data w-6/12">{task.description}</td>
      <td className="table-data w-1/12">
        {!task.isStarted() && (
          <button
            className="p-2 bg-blue-500 text-white rounded mr-1"
            title="Start Task"
            onClick={() => onStart(task)}
          >
            <FaPlay />
          </button>
        )}
        <button
          className="p-2 bg-red-500 text-white rounded"
          title="Delete Task"
          onClick={() => onDelete(task)}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
