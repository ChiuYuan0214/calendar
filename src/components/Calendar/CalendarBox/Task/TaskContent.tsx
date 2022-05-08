import React, { useState, DragEvent, MouseEvent } from "react";

import TaskModal from "../../../TaskModal/TaskModal";
import { Task } from "../../../../models/Task";
import StringReducer from "../../../UI/StringReducer/StringReducer";

import styles from "./TaskContent.module.css";

interface Props {
  task: Task;
  index: number;
  isExpand: boolean;
  setChange: () => void;
};

const TaskContent: React.FC<Props> = ({ task, index, isExpand, setChange }) => {
  const [onModal, setOnModal] = useState<boolean>(false);

  const { title, desc, level, tag, id } = task;

  const modalToggleHandler = () => {
    setOnModal((prev) => !prev);
  };

  const modalOpenHandler = (event: MouseEvent<HTMLElement>) => {
    setOnModal(true);
  };

  // set the id to event data when drag event was fired.
  const dragStartHandler = (event: DragEvent<HTMLLIElement>) => {
    event.dataTransfer.setData("text/plain", id);
    event.dataTransfer.effectAllowed = "move";
  };

  // alert user when drag event was over (element was dropped) but no drop effect appeared.
  // equal to drop failed.
  const dragEndHandler = (event: DragEvent<HTMLLIElement>) => {
    if (event.dataTransfer.dropEffect === "none") {
      alert("Please drag into right place!");
    }
  };

  const itemStyle = {
    opacity: 0.5 + +level * 0.1,
  };

  return (
    <>
      {onModal && (
        <TaskModal
          onClick={modalToggleHandler}
          task={task}
          setChange={setChange}
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
          <StringReducer string={desc} enlarge={isExpand} reset={false} />
        </p>
      </li>
    </>
  );
};

export default TaskContent;
