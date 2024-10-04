import { Task } from "../../lib/model/task";
import { FaPause, FaPlay, FaTrash } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import PButton from "../PButton";
import React from "react";

interface ToDoCardProps {
  className?: string;
  task: Task;
  onStart: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function ToDoCard({ className, task, onStart, onDelete }: Readonly<ToDoCardProps>) {
  return (
    <div
      className={`${className} p-2 flex flex-row bg-light-bg_secondary dark:bg-dark-bg_secondary rounded `}
    >
      {task.isStarted() ? (
        <div className="bg-blue-500 rounded-circle p-2 text-white text-xs">
          {task.isPaused() ? <FaPause /> : <FaArrowsRotate />}
        </div>
      ) : (
        <PButton onClick={() => onStart(task)}>
          <FaPlay />
        </PButton>
      )}
      <div className="grid grid-cols-3">
        <div>{task.name}</div>
        <div>{task.description}</div>
        <button
          onClick={() => onDelete(task)}
          title="Delete Task"
          className="m-auto p-2 bg-red-500 text-white rounded"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
