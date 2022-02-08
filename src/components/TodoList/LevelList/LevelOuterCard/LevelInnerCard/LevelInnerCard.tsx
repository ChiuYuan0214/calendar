import React from "react";

import { TagObj } from "../../../../../models/TaskObj";
import TaskCard from "../../../TaskCard/TaskCard";

import styles from "./LevelInnerCard.module.css";

const InnerCard: React.FC<{ tagBox: TagObj; expired: boolean }> = ({
  tagBox,
  expired,
}) => {
  const tag = tagBox.tag;

  let contents = tagBox.tasks.map((task) => <TaskCard task={task} />);
  if (expired) {
    contents = contents.reverse();
  }
  return (
    <li className={`${styles.card} ${expired ? styles.expired : ""}`}>
      <h3>Tag: {tag}</h3>
      <ul>{contents}</ul>
    </li>
  );
};

export default InnerCard;
