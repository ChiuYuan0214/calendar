import React from "react";
import { CSSTransition } from "react-transition-group";

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

  const animationTiming = {
    enter: 500,
    exit: 500,
  };

  return (
    <CSSTransition
      in={expandWeek !== null && !isExpand}
      timeout={animationTiming}
      classNames={{
        enter: "",
        enterActive: styles.shrinkOut,
        exitActive: styles.shrinkBack,
        exitDone: styles.basic,
        appear: "",
        appearActive: "",
      }}
    >
      <ul
        className={`${styles.row} ${
          expandWeek === null ? styles.basic : isExpand ? styles.isExpand : ""
        }`}
        onClick={expandHandler}
      >
        <CSSTransition
          in={isExpand || expandWeek === null}
          timeout={animationTiming}
          unmountOnExit
        >
          <>{list}</>
        </CSSTransition>
      </ul>
    </CSSTransition>
  );
};

export default CalendarRow;
