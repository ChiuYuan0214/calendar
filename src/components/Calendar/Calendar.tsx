import React, { useContext } from "react";

import { TasksContext } from "../../store/tasks-context";
import { createCalendar } from "../../lib/date";
import { getCalendarTable } from "../../lib/date";

import CalendarRow from './CalendarRow/CalendarRow';
import WeekTitle from "./WeekTitle/WeekTitle";

import styles from "./Calendar.module.css";

const Calendar: React.FC<{
  year: number;
  month: number;
}> = ({ year, month }) => {
  const ctx = useContext(TasksContext);
  const targetTasks = ctx.tasks.filter(
    (task) => task.year === year && task.month === month
  );

  const { startDay, length } = createCalendar(year, month);
  const table = getCalendarTable(startDay, length);

  const content = table.map((row, index) => {
    if (row.length === 0) {
      return null;
    }
    const startDate = row[0].date === 0 ? 1 : row[0].date;
    const range = [startDate, startDate + 6];
    const taskRow = targetTasks.filter(
      (task) => range[0] <= task.date && task.date <= range[1]
    );

    return <CalendarRow key={index} boxRow={row} taskRow={taskRow} />;
  });

  return (
    <section className={styles.container}>
      <WeekTitle />
      <ul>{content}</ul>
    </section>
  );
};

export default Calendar;
