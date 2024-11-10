import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import { Task } from "../../../lib/model/task";
import TaskCard from "../TaskCard";
import PButton from "../../PButton";
import { DAY_NAMES } from "../../../lib/consts/days";

interface DatePaginationProps {
  tasks: Task[];
  className: string;
}

export default function TasksDateView({ tasks, className }: DatePaginationProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const updateDate = (diff: number) => {
    const d = new Date(currentDate);
    d.setDate(currentDate.getDate() + diff);
    setCurrentDate(d);
  };

  return (
    <div className={className}>
      <div className={"flex mb-2"}>
        <PButton
          className={"rounded-none rounded-l-full border-1 dark:border-dark-bg_primary"}
          onClick={() => updateDate(-1)}
        >
          <FaChevronLeft />
        </PButton>
        <PButton
          className={"rounded-none border-1 dark:border-dark-bg_primary"}
          onClick={() => setCurrentDate(new Date())}
        >
          Today
        </PButton>
        <PButton
          className={" rounded-none rounded-r-full border-1 dark:border-dark-bg_primary"}
          onClick={() => updateDate(1)}
        >
          <FaChevronRight />
        </PButton>
        <div className={"m-auto"}>
          <h4>{DAY_NAMES[currentDate.getDay()] + ", " + currentDate.toLocaleDateString()}</h4>
        </div>
      </div>
      {tasks.filter((task) => sameDay(task.startTime, currentDate)).length === 0 ? (
        <div className={"text-center"}>
          <p>No tasks for today</p>
        </div>
      ) : (
        <></>
      )}
      {tasks
        .filter((task) => sameDay(task.startTime, currentDate))
        .map((task) => (
          <TaskCard task={task} categories={[]} onDelete={() => ""} onUpdate={() => ""} />
        ))}
    </div>
  );
}

function sameDay(d1: Date, d2: Date): boolean {
  if (!d1 || !d2) {
    return false;
  }
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}
