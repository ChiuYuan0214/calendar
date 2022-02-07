import React, { useContext } from "react";

import OuterCard from "./OuterCard/OuterCard";
import { TasksContext } from "../../../store/tasks-context";
import { Task } from "../../../models/Task";
import { YearObj } from "../../../models/DateObj";

import styles from "./TimeList.module.css";

import { convertIntoTime } from "../../../lib/date";

// const timeSorter = (taskA: Task, taskB: Task) => {
//   const timeA = convertIntoTime(taskA.year, taskA.month, taskA.date);
//   const timeB = convertIntoTime(taskB.year, taskB.month, taskB.date);
//   return timeA < timeB ? -1 : 1;
// };

const filterExpireTask = (tasks: Task[]) => {
  const curTime = new Date().getTime();
  const passList: Task[] = [];
  const expireList: Task[] = [];
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const { year, month, date } = task;
    if (convertIntoTime(year, month, date) < curTime) {
      expireList.push(task);
    } else {
      passList.push(task);
    }
  }
  return [passList, expireList];
};

const sortTaskByYM = (tasks: Task[]) => {
  const list: YearObj[] = [];

  for (let i = 0; i < tasks.length; i++) {
    const curTask = tasks[i];
    const outertIndex = list.findIndex((y) => y.year === curTask.year);
    if (outertIndex >= 0) {
      const innerIndex = list[outertIndex].monthList.findIndex(
        (m) => m.month === curTask.month
      );
      if (innerIndex >= 0) {
        list[outertIndex].monthList[innerIndex].tasks.push(curTask);
      } else {
        list[outertIndex].monthList.push({
          month: curTask.month,
          tasks: [curTask],
        });
      }
    } else {
      list.push({
        year: curTask.year,
        monthList: [{ month: curTask.month, tasks: [curTask] }],
      });
    }
  }

  return list;
};

const TimeList: React.FC = () => {
  const ctx = useContext(TasksContext);
  const tasks: Task[] = ctx.tasks;
  const [passTasks, expireTasks] = filterExpireTask(tasks);
  let sortedTasks = sortTaskByYM(passTasks);
  let sortedExpiredTasks = sortTaskByYM(expireTasks);
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
      {contents && <h2 className={styles.headline}>Upcoming Tasks</h2>}
      <ul className={styles.list}>{contents}</ul>
      {expiredList && <h2 className={styles.headline}>Expired Tasks</h2>}
      <ul className={styles.list}>{expiredList}</ul>
    </>
  );
};

export default TimeList;
