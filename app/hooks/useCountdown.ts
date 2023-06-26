import { useEffect, useRef, useState } from "react";

const useCountdown = (time: number) => {
  const [timer, setTimer] = useState(time); // Initial countdown value
  let intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startCountdown = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
  };

  const stopCountdown = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
  };

  return { timer, startCountdown, stopCountdown };
};

export default useCountdown;
