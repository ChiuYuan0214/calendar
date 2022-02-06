import React from "react";

import styles from "./TimeLine.module.css";

const TimeLine: React.FC<{ onExpand: boolean }> = ({ onExpand }) => {
  const timeArr = [];
  for (let i = 1; i <= 24; i++) {
    timeArr.push(i);
  }

  const content = timeArr.map((time, index) => (
    <span
      key={index}
      style={{ top: `${2 + index * 1.42}rem` }}
    >{`${time}:00`}</span>
  ));
  return (
    <div className={`${styles.timeline} ${onExpand ? styles.onExpand : ""}`}>
      {onExpand && content}
    </div>
  );
};

export default TimeLine;
