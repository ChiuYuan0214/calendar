import React from "react";
import { CSSTransition } from "react-transition-group";

import { Task, TaskBox } from "../../../models/Task";
import CalendarBox from "../CalendarBox/CalendarBox";
import styles from "./CalendarRow.module.css";

const indexTracker: (number | null)[] = [];

const CalendarRow: React.FC<{
  expandWeek: number | null;
  setExpand: (row: number | null) => void;
  boxRow: TaskBox[];
  taskRow: Task[];
  index: number;
}> = ({ boxRow, taskRow, index, expandWeek, setExpand }) => {
  const rowIndex = index;
  const isExpand = expandWeek === rowIndex;

  if (indexTracker.length > 5) {
    indexTracker.splice(0, 4);
  }
  if (indexTracker[indexTracker.length - 1] !== expandWeek) {
    indexTracker.push(expandWeek);
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

  const animationTiming = {
    enter: 500,
    exit: 500,
  };

  const prevExpand =
    indexTracker.length === 1
      ? false
      : indexTracker[indexTracker.length - 2] === rowIndex;

  console.log(`${rowIndex}'s indexTracker:`, indexTracker);

  return (
    <CSSTransition
      in={expandWeek !== null}
      timeout={animationTiming}
      classNames={{
        enter: "",
        enterActive: isExpand ? "" : styles.shrinkOut,
        exitActive: prevExpand ? "" : styles.shrinkBack,
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
