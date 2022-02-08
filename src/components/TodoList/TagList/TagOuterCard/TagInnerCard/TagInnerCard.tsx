import React from "react";
import { levelList } from "../../../../../lib/option";

import { LevelObj } from "../../../../../models/TaskObj";
import TaskCard from "../../../TaskCard/TaskCard";

import styles from "./TagInnerCard.module.css";

const InnerCard: React.FC<{ levelBox: LevelObj; expired: boolean }> = ({
  levelBox,
  expired,
}) => {
  const level = levelBox.level;
  const outputLevel = levelList[+level - 1];

  let contents = levelBox.tasks.map((task) => <TaskCard task={task} />);
  if (expired) {
    contents = contents.reverse();
  }
  return (
    <li className={`${styles.card} ${expired ? styles.expired : ""}`}>
      <h3>Level: {outputLevel}</h3>
      <ul>{contents}</ul>
    </li>
  );
};

export default InnerCard;
