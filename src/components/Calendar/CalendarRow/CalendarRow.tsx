import React, { MouseEvent } from "react";
import { CSSTransition } from "react-transition-group";

import { TaskBox } from "../../../models/Task";
import CalendarBox from "../CalendarBox/CalendarBox";
import styles from "./CalendarRow.module.css";

interface Props {
  expandWeek: number | null;
  setExpand: (row: number) => void;
  year: number;
  month: number;
  rowBox: TaskBox[];
  index: number;
};

const CalendarRow: React.FC<Props> = ({ year, month, rowBox, index, expandWeek, setExpand }) => {
  const rowIndex = index;
  const isExpand = expandWeek === rowIndex;

  // click listener function on unordered-list.
  const expandHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    // avoid expanding if the click event was occurred on task or modal.
    if (isExpand || target.closest("li") || target.closest("#modal-root")) {
      return;
    }
    setExpand(rowIndex);
  };

  const list = rowBox.map((box, index) => {
    return (
      <CalendarBox
        key={index}
        index={index}
        isExpand={isExpand}
        year={year}
        month={month}
        box={box}
      />
    );
  });

  const animationTiming = {
    enter: 500,
    exit: 500,
  };

  return (
    <CSSTransition
    // only shrink out when calendar is expanding but not this row.
    // vice versa.
      in={expandWeek !== null && !isExpand}
      timeout={animationTiming}
      classNames={{
        enter: "",
        enterActive: styles.shrinkOut,
        exitActive: styles.shrinkBack,
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
