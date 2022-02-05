import React from "react";

import styles from "./TimeLine.module.css";

const TimeLine: React.FC = () => {
  const timeArr = [];
  for (let i = 1; i <= 24; i++) {
    timeArr.push(i);
  }
  console.log("timeArr:", timeArr);
  const content = timeArr.map((time, index) => (
    <span
      style={{ top: `${3 + index * 1.42}rem` }}
    >{`${time}:00`}</span>
  ));
  return <div className={styles.timeline}>{content}</div>;
};

export default TimeLine;
