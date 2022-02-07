import React, { useCallback, useEffect, useState } from "react";

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

    return (
      <CalendarRow
        key={index}
        index={index}
        expandWeek={expandWeek}
        setExpand={expandWeekHandler}
        year={year}
        month={month}
        rowBox={row}
      />
    );
  });

  return (
    <section className={styles.container}>
      <div className={styles.titleBox}>
        {expandWeek !== null && (
          <div className={`${styles.back}`} onClick={resetExpandHandler}>
            Back
          </div>
        )}
        <WeekTitle isExpand={expandWeek !== null} />
      </div>
      <div
        className={`${styles.calendarBox} ${
          expandWeek !== null ? styles.isExpand : ""
        }`}
      >
        <TimeLine onExpand={expandWeek !== null} />
        <ul>{content}</ul>
      </div>
    </section>
  );
};

export default Calendar;
