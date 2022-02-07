import React, { useState, DragEvent, MouseEvent, useContext, useEffect } from "react";

import TaskModal from "../../../TaskModal/TaskModal";
import { Task } from "../../../../models/Task";
import StringReducer from "../../../UI/StringReducer/StringReducer";
import { TasksContext } from "../../../../store/tasks-context";

import styles from "./TaskContent.module.css";

const TaskContent: React.FC<{
  task: Task;
  index: number;
  isExpand: boolean;
}> = ({ task, index, isExpand }) => {
  const [onModal, setOnModal] = useState<boolean>(false);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [curTask, setCurTask] = useState<Task>(task);
  const ctx = useContext(TasksContext);

  const { title, desc, level, tag, id } = curTask;

  const modalToggleHandler = () => {
    setOnModal((prev) => !prev);
  };

  const modalOpenHandler = (event: MouseEvent<HTMLElement>) => {
    setOnModal(true);
  };

  const dragStartHandler = (event: DragEvent<HTMLLIElement>) => {
    event.dataTransfer.setData("text/plain", id);
    event.dataTransfer.effectAllowed = "move";
  };

  const dragEndHandler = (event: DragEvent<HTMLLIElement>) => {
    if (event.dataTransfer.dropEffect === "none") {
      alert("Please drag into right place!");
    }
  };

  const setChangeHandler = () => {
    setIsChange(true);
  };

  useEffect(() => {
    if (isChange) {
      const newTask = ctx.tasks.find(t => t.id === id);
      if (newTask) {
        setCurTask(newTask);
      }
      setIsChange(false);
    }
  }, [isChange, ctx, id]);

  const itemStyle = {
    opacity: 0.5 + +level * 0.1,
  };

  return (
    <>
      {onModal && (
        <TaskModal
          setChange={setChangeHandler}
          onClick={modalToggleHandler}
          task={curTask}
        />
      )}
      <li
        className={`${styles.task} ${styles[tag]}`}
        style={itemStyle}
        id={id}
        onDoubleClick={modalOpenHandler}
        draggable="true"
        onDragStart={dragStartHandler}
        onDragEnd={dragEndHandler}
      >
        <h4>{title}</h4>
        <p>
          <StringReducer string={desc} enlarge={isExpand} />
        </p>
      </li>
    </>
  );
};

export default TaskContent;
