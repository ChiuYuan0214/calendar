import React, { useState, DragEvent } from "react";
import ReactDOM from "react-dom";

import { Task } from "../../../../models/Task";
import StringReducer from "../../../UI/StringReducer/StringReducer";
import BackDrop from "../../../UI/StringReducer/BackDrop/BackDrop";

import styles from "./TaskContent.module.css";

const TaskContent: React.FC<{
  task: Task;
  index: number;
  isExpand: boolean;
}> = ({ task, index, isExpand }) => {
  const [onModal, setOnModal] = useState<boolean>(false);

  const { title, desc, level, id } = task;
  // console.log("index:", index);

  const itemStyle = {
    backgroundColor: `rgb(${180 + +level * 10}, ${140 - +level * 20}, ${
      140 - +level * 20
    })`,
  };

  // const ModalContent: React.FC = () => {
  //   return (
  //     <>
  //       <h4>Level:</h4>
  //       <p>{level}</p>
  //       <p>
  //         {year}/{month}/{date}
  //       </p>
  //       <h4>Alert Time:</h4>
  //       <p>{alertTime}</p>
  //       <h4>Tag:</h4>
  //       <p>{tag}</p>
  //     </>
  //   );
  // };

  const dragStartHandler = (event: DragEvent<HTMLLIElement>) => {
    event.dataTransfer.setData("text/plain", id);
    event.dataTransfer.effectAllowed = "move";
  };

  const dragEndHandler = (event: DragEvent<HTMLLIElement>) => {
    if (event.dataTransfer.dropEffect === "none") {
      alert("Please drag into right place!");
    }
  };

  const portal: Element | null = document.getElementById("modal-root");

  return (
    <>
      {onModal &&
        portal &&
        ReactDOM.createPortal(
          <BackDrop onClick={() => setOnModal(false)} />,
          portal
        )}
      <li
        className={`${styles.task} ${onModal ? styles.onModal : ""}`}
        style={itemStyle}
        id={id}
        onDoubleClick={() => setOnModal(true)}
        draggable="true"
        onDragStart={dragStartHandler}
        onDragEnd={dragEndHandler}
      >
        <h4>{title}</h4>
        <p>
          <StringReducer string={desc} enlarge={isExpand} onModal={onModal} />
        </p>
      </li>
    </>
  );
};

export default TaskContent;
