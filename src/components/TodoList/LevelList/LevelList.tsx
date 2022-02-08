import React, { useContext } from "react";

import { TasksContext } from "../../../store/tasks-context";
import { filterExpireTask } from "../../../lib/tasks";
import { Task } from "../../../models/Task";
import { LevelObj } from "../../../models/TaskObj";
import { sortTaskByLevel } from "../../../lib/tasks";

import LevelOuterCard from "./LevelOuterCard/LevelOuterCard";

import styles from "./LevelList.module.css";

const LevelList: React.FC = () => {
  const ctx = useContext(TasksContext);
  const tasks: Task[] = ctx.tasks;
  const levelSortedTasks: Task[] = tasks.sort((a: Task, b: Task) =>
    a.level > b.level ? -1 : 1
  );
  const [passTasks, expireTasks] = filterExpireTask(levelSortedTasks);
  let sortedTasks: LevelObj[] = sortTaskByLevel(passTasks);
  let sortedExpiredTasks: LevelObj[] = sortTaskByLevel(expireTasks);

  let contents = null;
  if (sortedTasks.length > 0) {
    contents = sortedTasks.map((levelBox) => (
      <li>
        <LevelOuterCard levelBox={levelBox} expired={false} />
      </li>
    ));
  }

  let expiredList = null;
  if (sortedExpiredTasks.length > 0) {
    expiredList = sortedExpiredTasks.map((levelBox) => (
      <li>
        <LevelOuterCard levelBox={levelBox} expired={true} />
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

export default LevelList;
