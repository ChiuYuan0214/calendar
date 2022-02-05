import React from "react";

import { Task, TaskBox } from "../../../models/Task";
import CalendarBox from "../CalendarBox/CalendarBox";
import styles from "./CalendarRow.module.css";

const CalendarRow: React.FC<{
  expandWeek: number | null;
  setExpand: (row: number | null) => void;
  boxRow: TaskBox[];
  taskRow: Task[];
  index: number;
}> = ({ boxRow, taskRow, index, expandWeek, setExpand }) => {
  const rowIndex = index;
  const isExpand = expandWeek === rowIndex;

  if (expandWeek !== rowIndex && expandWeek !== null) {
    return null;
  }

  const expandHandler = () => {
    if (isExpand) {
      return;
    }
    setExpand(rowIndex);
  };

  const list = boxRow.map((box, index) => {
    const tasks = taskRow.filter((task) => task.date === box.date);
    return (
      <CalendarBox
        key={index}
        index={index}
        isExpand={isExpand}
        tasks={tasks}
        boxData={box}
      />
    );
  });
  return (
    <ul
      className={`${styles.row} ${isExpand && styles.isExpand}`}
      onClick={expandHandler}
    >
      {list}
    </ul>
  );
};

export default CalendarRow;
