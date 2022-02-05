import React, { useCallback, useContext, useEffect, useState } from "react";

import { TasksContext } from "../../store/tasks-context";
import { createCalendar } from "../../lib/date";
import { getCalendarTable } from "../../lib/date";

import CalendarRow from "./CalendarRow/CalendarRow";
import WeekTitle from "./WeekTitle/WeekTitle";
import TimeLine from "./TimeLine/TimeLine";

import styles from "./Calendar.module.css";

const Calendar: React.FC<{
  year: number;
  month: number;
}> = ({ year, month }) => {
  const ctx = useContext(TasksContext);
  const targetTasks = ctx.tasks.filter(
    (task) => task.year === year && task.month === month
  );
  const [expandWeek, setExpandWeek] = useState<number | null>(null);

  const { startDay, length } = createCalendar(year, month);
  const table = getCalendarTable(startDay, length);

  const expandWeekHandler = (row: number | null) => {
    setExpandWeek(row);
  };

  const resetExpandHandler = useCallback(() => {
    setExpandWeek(null);
  }, []);

  useEffect(() => {
    resetExpandHandler();
  }, [year, month, resetExpandHandler]);

  const content = table.map((row, index) => {
    if (row.length === 0) {
      return null;
    }
    const startDate = row[0].date === 0 ? 1 : row[0].date;
    const range = [startDate, startDate + 6];
    const taskRow = targetTasks.filter(
      (task) => range[0] <= task.date && task.date <= range[1]
    );

    return (
      <CalendarRow
        key={index}
        index={index}
        expandWeek={expandWeek}
        setExpand={expandWeekHandler}
        boxRow={row}
        taskRow={taskRow}
      />
    );
  });

  return (
    <section className={styles.container}>
      <div className={styles.titleBox}>
        {expandWeek !== null && (
          <div className={styles.back} onClick={resetExpandHandler}>
            Back
          </div>
        )}
        <WeekTitle isExpand={expandWeek !== null} />
      </div>
      <div className={styles.calendarBox}>
        {expandWeek !== null && <TimeLine />}
        <ul>{content}</ul>
      </div>
    </section>
  );
};

export default Calendar;
