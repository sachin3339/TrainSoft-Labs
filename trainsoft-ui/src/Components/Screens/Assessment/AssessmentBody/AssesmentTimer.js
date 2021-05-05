import React, { useContext, useEffect, useState} from 'react';
import styles from "./AssessmentBody.module.css";

export const AssessmentTimer = ({ startTime = 0, timeLimit = 0 }) => {
    const [time, setTime] = useState(timeLimit - startTime);
  
    const pad = (n, width, z) => {
      z = z || "0";
      n = n + "";
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };
  
    const updateTime = () => {
      if (time > 0) {
        setTime(time - 1);
      }
    };
  
    useEffect(() => {
      setTimeout(updateTime, 1000);
    }, [time]);
  
    const formatTime = () => {
      const minutes = pad(parseInt(time / 60), 2);
      const seconds = pad(parseInt(time % 60), 2);
  
      return `${minutes} : ${seconds}`;
    };
  
    return <div className={styles.timer}>{formatTime()}</div>;
  };