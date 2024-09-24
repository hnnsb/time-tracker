import { useEffect, useState } from "react";
import { FaPause, FaPen, FaPlay, FaSave, FaStop, FaTimes, FaTrash } from "react-icons/fa";
import { Task } from "../../lib/model/task";
import { Category } from "../../lib/model/category";
import { timeAsString } from "../../lib/utils";

interface TaskCardProps {
  task: Task;
  categories: Category[];
  onDelete: any;
  onUpdate: any;
}

export default function TaskCard({
  task,
  categories,
  onDelete,
  onUpdate,
}: Readonly<TaskCardProps>) {
  const [formattedTime, setFormattedTime] = useState<string>(
    task.endTime !== undefined
      ? timeAsString(
          new Date(task.endTime).getTime() - new Date(task.startTime).getTime() - task.pauseTime
        )
      : timeAsString(new Date().getTime() - new Date(task.startTime).getTime() - task.pauseTime)
  );
  const [isRunning, setIsRunning] = useState<boolean>(
    task.endTime === undefined && task.pauseStart === undefined
  );
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(task.name);
  const [editedDescription, setEditedDescription] = useState<string>(task.description);

  useEffect(() => {
    let interval;
    if (isRunning && !task.pauseStart) {
      interval = setInterval(() => {
        const duration = task.getDuration();
        setFormattedTime(timeAsString(duration));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, task.pauseTime, task.pauseStart]);

  const handleStop = () => {
    task.endTime = new Date();
    setIsRunning(false);
    onUpdate(task);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handlePause = () => {
    const now = new Date();
    if (task.pauseStart) {
      if (task.pauseTime === undefined) {
        task.pauseTime = 0;
      }
      // Resuming from pause
      task.pauseTime += now.getTime() - new Date(task.pauseStart).getTime();
      task.pauseStart = undefined;
      console.debug("Resuming from pause", task.pauseTime, task.pauseStart, isRunning);
    } else {
      // Pausing
      task.pauseStart = now;
      console.debug("Pausing", task.pauseTime, new Date(task.pauseStart), isRunning);
    }
    setIsRunning(!isRunning);
    onUpdate(task);
  };

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

  const handelChangeCategory = (selectedId: string) => {
    task.category = categories.filter((c) => c.id === selectedId)[0];
  };

  return (
    <div
      className="flex justify-between items-center mt-2 p-4
            bg-light-bg_secondary
            dark:bg-dark-bg_secondary
            rounded"
    >
      {editMode ? (
        <>
          <form onSubmit={handleSave}>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col justify-between">
                <div className="m-auto">
                  <button
                    onClick={handleSave}
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
              <div className="flex flex-col lg:flex-row p-2">
                <div className="flex flex-col mb-2 mr-2">
                  <label htmlFor="titleInput" className="block text-sm font-medium">
                    Title
                  </label>
                  <input
                    id="titleInput"
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="px-2 py-1 border rounded"
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
                    className="px-2 py-1 border rounded"
                  />
                </div>
                <div className="flex flex-col mb-2 mr-2">
                  <label htmlFor="categoryInput" className="block text-sm font-medium">
                    Category
                  </label>
                  <select
                    className="px-2 py-1 border rounded"
                    value={task.category?.id}
                    onChange={(e) => handelChangeCategory(e.target.value)}
                  >
                    <option value={null}>Select Category</option>
                    {categories.map((category) => (
                      <option value={category.id} key={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
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

            <div className="ml-2">
              <p
                className={`text-sm font-semibold`}
                style={{ color: task.category ? task.category.color : "gray" }}
              >
                {task.category ? task.category.name : "No Category"}
              </p>
              <p className="text-lg font-semibold">{task.name}</p>
              <p className="text-gray-600 dark:text-gray-400">{task.description}</p>
            </div>
          </div>
          <div className="flex items-center flex-col sm:flex-row">
            {!task.endTime && (
              <>
                <button
                  onClick={handlePause}
                  title={isRunning ? "Pause Task" : "Resume Task"}
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  {isRunning ? <FaPause /> : <FaPlay />}
                </button>
                <button
                  onClick={handleStop}
                  title="Stop Task"
                  className="my-2 sm:my-0 sm:mx-2 p-2 bg-red-500 text-white rounded"
                >
                  <FaStop />
                </button>
              </>
            )}
            <span
              className={`text-right font-mono ${isRunning ? "text-red-500" : "dark:text-gray-400 text-gray-600"}`}
            >
              <div className="flex align-center whitespace-nowrap">
                {!isRunning && !task.endTime && (
                  <FaPause className="inline-block w-2 h-2 mx-2 my-auto" />
                )}
                {isRunning && (
                  <span className="inline-block w-2 h-2 bg-red-600 rounded-full mx-2 my-auto"></span>
                )}
                <span>{formattedTime}</span>
              </div>
            </span>
          </div>
        </>
      )}
    </div>
  );
}
