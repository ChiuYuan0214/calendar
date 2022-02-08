import React, { useState, useEffect } from "react";

import { Task } from "../../../models/Task";
import StringReducer from "../../UI/StringReducer/StringReducer";
import { levelList } from "../../../lib/option";
import { convertIntoString } from "../../../lib/date";

import TaskModal from "../../TaskModal/TaskModal";

import styles from "./TaskCard.module.css";

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  const { title, desc, year, month, date, tag, level } = task;
  const [onModal, setOnModal] = useState(false);
  const [isChange, setIsChange] = useState(false);

  const toggleModalHandler = () => {
    setOnModal((prev) => !prev);
  };

  useEffect(() => {
    if (isChange) {
      setIsChange(false);
    }
  }, [isChange]);

  const outputTag = tag
    .split("")
    .map((char, idx) => (idx === 0 ? char.toUpperCase() : char))
    .join("");

  return (
    <>
      <li className={styles.card} onClick={toggleModalHandler}>
        <h4>{title}</h4>
        <p>
          <StringReducer string={desc} enlarge={true} reset={true} />
        </p>
        <p className={styles.tag}>Tag: {outputTag}</p>
        <div className={styles.controls}>
          <p>Level: {levelList[+level - 1]}</p>
          <p>Date: {convertIntoString(year, month, date)}</p>
        </div>
      </li>
      {onModal && (
        <TaskModal
          task={task}
          onClick={toggleModalHandler}
          setChange={() => setIsChange(true)}
        />
      )}
    </>
  );
};

export default TaskCard;
