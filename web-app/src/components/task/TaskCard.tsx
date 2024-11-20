import React, { useCallback, useState } from "react";
import { FaCheck, FaPause, FaPen, FaPlay, FaSave, FaTimes, FaTrash } from "react-icons/fa";
import { Task } from "../../lib/model/task";
import { Category } from "../../lib/model/category";
import { useTaskTimer } from "./useTaskTimer";
import Tooltip from "../Tooltip";

interface TaskCardProps {
  className?: string;
  task: Task;
  categories: Category[];
  onDelete: (task: Task) => void;
  onUpdate: (task: Task) => void;
}

export default function TaskCard({
  className,
  task,
  categories,
  onDelete,
  onUpdate,
}: Readonly<TaskCardProps>) {
  const getTaskTime = useCallback(() => task.getDuration(), [task]);
  const { formattedTime, startTimer, stopTimer } = useTaskTimer({
    start: true,
    getTime: getTaskTime,
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(task.name);
  const [editedDescription, setEditedDescription] = useState<string>(task.description);
  const [editedCategoryId, setEditedCategoryId] = useState<string>(task.category?.id || "");
  const [editHourOffset, setEditHourOffset] = useState<number>(0);
  const [editMinuteOffset, setEditMinuteOffset] = useState<number>(0);
  const [editSecondOffset, setEditSecondOffset] = useState<number>(0);
  const handleStop = () => {
    task.stop();
    stopTimer();
    onUpdate(task);
  };

  const handleDelete = () => {
    onDelete(task);
  };

  const toggleTaskState = () => {
    if (task.isPaused()) {
      task.unpause();
      startTimer();
    } else {
      task.pause();
      stopTimer();
    }
    onUpdate(task);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    task.name = editedTitle;
    task.description = editedDescription;
    task.category = categories.find((category) => category.id === editedCategoryId);
    task.correction += 1000 * (3600 * editHourOffset + 60 * editMinuteOffset + editSecondOffset);

    resetOffsets();
    onUpdate(task);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedTitle(task.name);
    setEditedDescription(task.description);
    setEditedCategoryId(task.category?.id || "");
    resetOffsets();

    setEditMode(false);
  };

  const handleChangeCategory = (selectedId: string) => {
    setEditedCategoryId(selectedId);
  };

  const resetOffsets = () => {
    setEditHourOffset(0);
    setEditMinuteOffset(0);
    setEditSecondOffset(0);
  };
  return (
    <div
      className={`${className} p-4 flex justify-between items-center bg-light-bg_secondary dark:bg-dark-bg_secondary rounded`}
    >
      {editMode ? (
        <>
          <form id="edit-task-form" onSubmit={handleSave}>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col justify-between">
                <div className="m-auto">
                  <button
                    type="submit"
                    form="edit-task-form"
                    title="Save Task Title and Description"
                    className="p-2 bg-green-500 text-white rounded"
                  >
                    <FaSave />
                  </button>
                </div>
                <div className="m-auto">
                  <button
                    onClick={handleCancel}
                    title="Cancel Editing Task Title and Description"
                    className="p-2 bg-gray-500 text-white rounded"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
              <div className="px-3 flex flex-col lg:flex-row p-2">
                <div className="flex flex-col mb-2 mr-2">
                  <label htmlFor="titleInput" className="block text-sm font-medium">
                    Title
                  </label>
                  <input
                    id="titleInput"
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="px-2 py-1 border rounded dark:bg-dark-bg_tertiary"
                  />
                </div>
                <div className="flex flex-col mb-2 mr-2">
                  <label htmlFor="descriptionInput" className="block text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    id="descriptionInput"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="px-2 py-1 border rounded dark:bg-dark-bg_tertiary"
                    maxLength={150}
                  />
                </div>
                <div className="flex flex-col mb-2 mr-2">
                  <label htmlFor="categoryInput" className="block text-sm font-medium">
                    Category
                  </label>
                  <select
                    className="px-2 py-1 border rounded dark:bg-dark-bg_tertiary"
                    value={editedCategoryId}
                    onChange={(e) => handleChangeCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option value={category.id} key={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col mb-2 mr-2">
                  <label className="block text-sm font-medium" htmlFor="correctionInput">
                    <Tooltip description="Add or subtract time of your task">
                      Correction &#9432;
                    </Tooltip>
                  </label>

                  <div className="flex gap-2">
                    <input
                      className="px-2 py-1 border rounded dark:bg-dark-bg_tertiary w-[70px]"
                      type="number"
                      id="correctionInput"
                      onChange={(e) => setEditHourOffset(parseInt(e.target.value))}
                      min={-999}
                      max={999}
                    />
                    <span>h</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      className="px-2 py-1 border rounded dark:bg-dark-bg_tertiary w-[70px]"
                      type="number"
                      id=""
                      onChange={(e) => setEditMinuteOffset(parseInt(e.target.value))}
                      min={-999}
                      max={999}
                    />
                    <span>m</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      className="px-2 py-1 border rounded dark:bg-dark-bg_tertiary w-[70px]"
                      type="number"
                      id=""
                      onChange={(e) => setEditSecondOffset(parseInt(e.target.value))}
                      min={-999}
                      max={999}
                    />
                    <span>s</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="m-x-auto">
            <button
              onClick={handleDelete}
              title="Delete Task"
              className="ml-2  p-2 bg-red-500 text-white rounded"
            >
              <FaTrash />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row">
            <div className="m-auto">
              <button
                onClick={() => setEditMode(!editMode)}
                title="Edit Task Title and Description"
                className="p-2 bg-blue-500 text-white rounded"
              >
                <FaPen />
              </button>
            </div>
            <div className="px-4">
              <div>
                <p
                  className="mb-2 text-sm font-semibold"
                  style={{ color: task.category?.color || "gray" }}
                >
                  {task.category?.name || "No Category"}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <p className="mb-0 text-lg font-semibold overflow-hidden overflow-ellipsis">
                  {task.name}
                </p>
                <p className="mb-0 col-span-2 text-gray-600 dark:text-gray-400 overflow-hidden overflow-ellipsis">
                  {task.description}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center flex-col lg:flex-row">
            {!task.isStopped() && (
              <div className="flex flex-row">
                <button
                  onClick={toggleTaskState}
                  title={task.isPaused() ? "Resume Task" : "Pause Task"}
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  {task.isPaused() ? <FaPlay /> : <FaPause />}
                </button>
                <span className="p-1"></span>
                <button
                  onClick={handleStop}
                  title="Stop Task"
                  className="p-2 bg-green-500 text-white rounded"
                >
                  <FaCheck />
                </button>
              </div>
            )}
            <div
              className={`pt-2 text-right font-mono ${task.isRunning() ? "text-red-500" : "dark:text-gray-400 text-gray-600"}`}
            >
              <div className="flex align-center whitespace-nowrap">
                {task.isPaused() && <FaPause className="inline-block w-2 h-2 mx-2 my-auto" />}
                {task.isRunning() && (
                  <span className="inline-block w-2 h-2 bg-red-600 rounded-full mx-2 my-auto"></span>
                )}
                <span>{formattedTime}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
