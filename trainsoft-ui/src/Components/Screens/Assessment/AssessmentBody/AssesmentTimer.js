import React, { useEffect, useState } from 'react';
import { IcnTimer } from '../../../Common/Icon';
import styles from "./AssessmentBody.module.css";

export const AssessmentTimer = ({ startTime = 0, timeLimit = 0, callback = () => { } }) => {
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
    if (time === 0) callback(time);
  }, [time]);

  const formatTime = () => {
    const minutes = pad(parseInt(time / 60), 2);
    const seconds = pad(parseInt(time % 60), 2);

    return `${minutes}:${seconds}`;
  };

  return <div className={time >= 240 ? styles.timer : (time >= 120 ? styles.fourMinLeft : styles.twoMinLeft)}>
    <div className="aic">
      <div className="mr10">
        <IcnTimer {...{ color: time >= 240 ? "#917618" : (time >= 120 ? "#A86F3E" : "#ffffff") }} />
      </div>
      <div className="pt2">{formatTime()}</div>
    </div>
  </div>;
};