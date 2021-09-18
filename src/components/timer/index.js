import { useCallback, useEffect, useState, memo } from "react";

/**
 * Renders countdown timer, accepts minutes and seconds
 *
 * @param {object} props - Timer props
 * @param {number} seconds - seconds to countdown
 * @param {number} minutes - minutes to countdown
 * @returns
 */
const Timer = ({ seconds, minutes, setReset }) => {
  const initState = {
    seconds: seconds || 0,
    minutes: minutes || 0,
  };

  const [time, setTime] = useState(initState);

  /**
   * manages the countdown state, updates based on set interval
   */
  const counter = useCallback(() => {
    const { seconds, minutes } = time;
    if (!minutes && seconds === 1) {
      setReset(true);
      return;
    }

    if (!seconds) {
      setTime({ minutes: minutes - 1, seconds });
      return;
    }

    setTime({ minutes, seconds: seconds - 1 });
    return;
  }, [time, setTime, setReset]);

  /**
   * converts minutes and seconds to human readable string
   */
  const prefixZero = useCallback(({ seconds, minutes }) => {
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return `${minutes}:${seconds}`;
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => counter(), 1000);
    return () => clearInterval(timerId);
  });

  return <span>{prefixZero(time)}</span>;
};

export default memo(Timer);
