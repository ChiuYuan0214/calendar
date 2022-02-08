import React, { useContext } from "react";

import { TasksContext } from "../../../store/tasks-context";
import { filterExpireTask } from "../../../lib/tasks";
import { Task } from "../../../models/Task";
import { TagObj } from "../../../models/TaskObj";
import { sortTaskByTag } from "../../../lib/tasks";

import TagOuterCard from "./TagOuterCard/TagOuterCard";

import styles from "./TagList.module.css";

const TagList: React.FC = () => {
  const ctx = useContext(TasksContext);
  const tasks: Task[] = ctx.tasks;
  const levelSortedTasks: Task[] = tasks.sort((a: Task, b: Task) =>
    a.level > b.level ? -1 : 1
  );
  const [passTasks, expireTasks] = filterExpireTask(levelSortedTasks);
  let sortedTasks: TagObj[] = sortTaskByTag(passTasks);
  let sortedExpiredTasks: TagObj[] = sortTaskByTag(expireTasks);

  let contents = null;
  if (sortedTasks.length > 0) {
    contents = sortedTasks.map((tagBox) => (
      <li>
        <TagOuterCard tagBox={tagBox} expired={false} />
      </li>
    ));
  }

  let expiredList = null;
  if (sortedExpiredTasks.length > 0) {
    expiredList = sortedExpiredTasks.map((tagBox) => (
      <li>
        <TagOuterCard tagBox={tagBox} expired={true} />
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

export default TagList;
