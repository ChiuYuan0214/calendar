import React from "react";

import { Task } from "../../../../models/Task";
import StringReducer from "../../../UI/StringReducer/StringReducer";

import styles from "./TaskContent.module.css";

const TaskContent: React.FC<{ task: Task; index: number }> = ({
  task,
  index,
}) => {
  const { title, desc, level, id } = task;
  // console.log("index:", index);

  const itemStyle = {
    backgroundColor: `rgb(${180 + +level * 10}, ${140 - +level * 20}, ${
      140 - +level * 20
    })`,
  };

  return (
    <li className={styles.task} style={itemStyle} id={id}>
      <h4>{title}</h4>
      <p><StringReducer string={desc} /></p>
    </li>
  );
};

export default TaskContent;
