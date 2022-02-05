import React from "react";

import { Task, TaskBox } from "../../../models/Task";
import CalendarBox from "../CalendarBox/CalendarBox";
import styles from "./CalendarRow.module.css";

const CalendarRow: React.FC<{ boxRow: TaskBox[]; taskRow: Task[] }> = ({
  boxRow,
  taskRow,
}) => {
    const list = boxRow.map((box, index) => {
        const tasks = taskRow.filter(task => task.date === box.date);
        return <CalendarBox key={index} index={index} tasks={tasks} boxData={box} />;
    });
    return <ul className={styles.row}>{list}</ul>;
};

export default CalendarRow;
