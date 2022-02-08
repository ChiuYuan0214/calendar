import React, { useContext } from "react";

import OuterCard from "./TimeOuterCard/TimeOuterCard";
import { TasksContext } from "../../../store/tasks-context";
import { Task } from "../../../models/Task";
import { YearObj } from "../../../models/TaskObj";

import styles from "./TimeList.module.css";

import { filterExpireTask, sortTaskByYM } from "../../../lib/tasks";

const TimeList: React.FC = () => {
  const ctx = useContext(TasksContext);
  const tasks: Task[] = ctx.tasks;
  const [passTasks, expireTasks] = filterExpireTask(tasks);
  let sortedTasks: YearObj[] = sortTaskByYM(passTasks);
  let sortedExpiredTasks: YearObj[] = sortTaskByYM(expireTasks);
  sortedTasks = sortedTasks.sort((a: YearObj, b: YearObj) =>
    a.year > b.year ? 1 : -1
  );
  sortedExpiredTasks = sortedExpiredTasks.sort((a: YearObj, b: YearObj) =>
    a.year > b.year ? -1 : 1
  );

  let contents = null;
  if (sortedTasks.length > 0) {
    contents = sortedTasks.map((yearBox) => (
      <li>
        <OuterCard yearBox={yearBox} expired={false} />
      </li>
    ));
  }

  let expiredList = null;
  if (sortedExpiredTasks.length > 0) {
    expiredList = sortedExpiredTasks.map((yearBox) => (
      <li>
        <OuterCard yearBox={yearBox} expired={true} />
      </li>
    ));
  }

  return (
    <>
      <h2 className={styles.headline}>Upcoming Tasks</h2>
      <ul className={styles.list}>{contents || <p>No upcoming tasks.</p>}</ul>
      <h2 className={styles.headline}>Expired Tasks</h2>
      <ul className={styles.list}>{expiredList || <p>No expired tasks.</p>}</ul>
    </>
  );
};

export default TimeList;
