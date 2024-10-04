import { useEffect, useState } from "react";
import { timeAsString } from "../../lib/utils";

interface UseTaskTimerProps {
  start: boolean;
  getTime: () => number;
}

export function useTaskTimer({ start, getTime }: UseTaskTimerProps) {
  const [isRunning, setIsRunning] = useState<boolean>(start);
  const [formattedTime, setFormattedTime] = useState<string>(timeAsString(getTime()));

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setFormattedTime(timeAsString(getTime()));
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, getTime]);

  const startTimer = () => {
    setIsRunning(true);
  };
  const stopTimer = () => {
    setIsRunning(false);
  };

  return {
    formattedTime,
    startTimer,
    stopTimer,
  };
}
