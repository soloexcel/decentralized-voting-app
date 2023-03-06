import React, { useState, useEffect } from 'react';
import Style from "./CalculateVoteTime.module.css";

const CalculateVoteTime = ({ start, end }) => {
  const [msg, setMsg] = useState("");

  const formatTimeDiff = (diff) => {
    // Convert milliseconds to hours, minutes, and seconds
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours} hours and ${minutes % 60} minutes`;
    } else if (minutes > 0) {
      return `${minutes} minutes`;
    } else if (seconds > 0) {
      return `${seconds} seconds`;
    } else {
      return 'less than a second';
    }
  }
  

  useEffect(() => {
    const now = new Date();
    const startTime = new Date(start);
    const endTime = new Date(end);
    let diff;

    if (now < startTime) {
      // Task hasn't started yet
      diff = startTime.getTime() - now.getTime();
      const timeLeft = formatTimeDiff(diff);
      setMsg(`Voting starts in ${timeLeft}`);
    } else if (now > endTime) {
      // Task has ended
      setMsg('Voting has ended');
    } else {
      // Task is ongoing
      diff = endTime.getTime() - now.getTime();
      const timeLeft = formatTimeDiff(diff);
      setMsg(`Voting ends in ${timeLeft}`);
    }
  }, [start, end]);

  return (
    <h3 className={Style.timeLeft}>
      {msg}
    </h3>
  );
}

export default CalculateVoteTime;
