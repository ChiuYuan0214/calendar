import React from "react";

import { Task, TaskBox } from "../../../models/Task";

import styles from "./CalendarBox.module.css";
import TaskContent from "./Task/TaskContent";

const CalendarBox: React.FC<{ index: number; tasks: Task[]; boxData: TaskBox }> = ({
  index,
  tasks,
  boxData,
}) => {
    const date = boxData.date ? boxData.date : '';

    let contents;
    if (tasks.length > 0) {
      contents = tasks.map((task, index) => <TaskContent index={index} task={task} />);
    }
  return (
    <section
      className={`${styles.box} ${index > 4 && styles.weekendBox} ${
        date === "" && styles.empty
      }`}
    >
      <h3>{date}</h3>
      <ul>{contents}</ul>
    </section>
  );
};

export default CalendarBox;
