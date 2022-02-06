import React, { useState, DragEvent, MouseEvent } from "react";

import TaskModal from "../TaskModal/TaskModal";
import { Task } from "../../../../models/Task";
import StringReducer from "../../../UI/StringReducer/StringReducer";

import styles from "./TaskContent.module.css";

const TaskContent: React.FC<{
  task: Task;
  index: number;
  isExpand: boolean;
}> = ({ task, index, isExpand }) => {
  const [onModal, setOnModal] = useState<boolean>(false);

  const { title, desc, level, id } = task;
  // console.log("index:", index);


  const modalToggleHandler = () => {
    setOnModal(prev => !prev);
  };

  const modalOpenHandler = (event: MouseEvent<HTMLElement>) => {
    setOnModal(true);
  };

  const itemStyle = {
    backgroundColor: `rgb(${180 + +level * 10}, ${140 - +level * 20}, ${
      140 - +level * 20
    })`,
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

  

  return (
    <>
      {onModal && <TaskModal onClick={modalToggleHandler} task={task} />}
      <li
        className={styles.task}
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
