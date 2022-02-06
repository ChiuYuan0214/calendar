import React, { useState, DragEvent, useContext, useEffect } from "react";

import { Task, TaskBox } from "../../../models/Task";
import TaskContent from "./Task/TaskContent";
import { TasksContext } from "../../../store/tasks-context";
import MemoModal from "../../MemoModal/MemoModal";

import styles from "./CalendarBox.module.css";

const CalendarBox: React.FC<{
  index: number;
  tasks: Task[];
  year: number;
  month: number;
  boxData: TaskBox;
  isExpand: boolean;
}> = ({ index, tasks, year, month, boxData, isExpand }) => {
  const [droppable, setDroppable] = useState<boolean>(false);
  const [addTask, setAddTask] = useState<boolean>(false);
  const [onExpand, setOnExpand] = useState<boolean>(false);

  const ctx = useContext(TasksContext);

  const date = boxData.date ? boxData.date : "";

  let contents;
  if (tasks.length > 0) {
    contents = tasks.map((task, index) => (
      <TaskContent index={index} task={task} isExpand={isExpand} />
    ));
  }

  const dragEnterHandler = (event: DragEvent<HTMLLIElement>) => {
    if (event.dataTransfer.types[0] === "text/plain" && date !== "") {
      setDroppable(true);
      event.preventDefault();
    }
  };

  const dragOverHandler = (event: DragEvent<HTMLLIElement>) => {
    if (event.dataTransfer.types[0] === "text/plain" && date !== "") {
      event.preventDefault();
    }
  };

  const dragLeaveHandler = (event: DragEvent<HTMLLIElement>) => {
    setDroppable(false);
  };

  const dropHandler = (event: DragEvent<HTMLLIElement>) => {
    const taskId = event.dataTransfer.getData("text/plain");
    if (tasks.some((task) => task.id === taskId) || date === "") {
      setDroppable(false);
      return;
    }
    const targetTask: Task | undefined = ctx.tasks.find(
      (task) => task.id === taskId
    );
    const newPosition = {
      year: targetTask!.year,
      month: targetTask!.month,
      date: +date,
    };
    ctx.changeTask(targetTask, newPosition);
    setDroppable(false);
  };

  const startAddTaskHandler = () => {
    if (onExpand) {
      return;
    }
    setAddTask(true);
  };

  const cancelAddTaskHandler = () => {
    setAddTask(false);
  };

  useEffect(() => {
    if (isExpand) {
      setOnExpand(true);
      setTimeout(() => {
        setOnExpand(false);
      }, 500);
    }
  }, [isExpand]);

  return (
    <section
      className={`${styles.box} ${index > 4 && styles.weekendBox} ${
        date === "" && styles.empty
      } ${droppable ? styles.onDrop : ""}`}
      onDragEnter={dragEnterHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dropHandler}
      onDoubleClick={startAddTaskHandler}
    >
      {addTask && <MemoModal onClick={cancelAddTaskHandler} year={year} month={month} date={+date} />}
      <h3>{date}</h3>
      <ul>{contents}</ul>
    </section>
  );
};

export default CalendarBox;
