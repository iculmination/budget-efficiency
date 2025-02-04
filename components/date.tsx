"use client";

import { months } from "@/constants";
import { useEffect, useState } from "react";

const DateComponent = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const minutes =
        date.getMinutes() > 10 ? "0" + date.getMinutes() : date.getMinutes();
      const hours =
        date.getHours() > 10 ? "0" + date.getHours() : date.getHours();

      const time = hours + ":" + minutes;
      setTime(time);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  const date = new Date();

  return (
    <div>
      <p className="text-6xl font-extrabold">
        {date.getDate()} {months[date.getMonth()]}
      </p>
      <p className="text-2xl font-medium text-gray-400">{time}</p>
    </div>
  );
};

export default DateComponent;
