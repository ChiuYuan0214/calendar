import React from "react";

import { MonthObj } from "../../../../../models/TaskObj";
import TaskCard from "../../../TaskCard/TaskCard";

import styles from "./TimeInnerCard.module.css";

const InnerCard: React.FC<{ monthObj: MonthObj; expired: boolean }> = ({
  monthObj,
  expired,
}) => {
  const month = monthObj.month;

  let contents = monthObj.tasks.map((task) => <TaskCard task={task} />);
  if (expired) {
    contents = contents.reverse();
  }
  return (
    <li className={`${styles.card} ${expired ? styles.expired : ""}`}>
      <h3>Month: {month}</h3>
      <ul>{contents}</ul>
    </li>
  );
};

export default InnerCard;
