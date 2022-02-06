import React, { useState, DragEvent, useContext } from "react";

import { Task, TaskBox } from "../../../models/Task";
import TaskContent from "./Task/TaskContent";
import { TasksContext } from "../../../store/tasks-context";

import styles from "./CalendarBox.module.css";

const CalendarBox: React.FC<{
  index: number;
  tasks: Task[];
  boxData: TaskBox;
  isExpand: boolean;
}> = ({ index, tasks, boxData, isExpand }) => {
  const [droppable, setDroppable] = useState<boolean>(false);
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

  return (
    <section
      className={`${styles.box} ${index > 4 && styles.weekendBox} ${
        date === "" && styles.empty
      } ${droppable ? styles.onDrop : ""}`}
      data-date={date}
      onDragEnter={dragEnterHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dropHandler}
    >
      <h3>{date}</h3>
      <ul>{contents}</ul>
    </section>
  );
};

export default CalendarBox;
