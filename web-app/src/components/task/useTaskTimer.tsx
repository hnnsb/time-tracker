import { useEffect, useState } from "react";
import { timeAsString } from "../../lib/utils";

interface UseTaskTimerProps {
  start: boolean;
  getTime: () => number;
}

export function useTaskTimer({ start, getTime }: UseTaskTimerProps) {
  const [isRunning, setIsRunning] = useState<boolean>(start);
  const [time, setTime] = useState(getTime());
  const [formattedTime, setFormattedTime] = useState<string>(timeAsString(time));

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(getTime());
      }, 1000);
    } else {
      setTime(getTime());
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, getTime]);

  useEffect(() => {
    setFormattedTime(timeAsString(time));
  }, [time]);

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
