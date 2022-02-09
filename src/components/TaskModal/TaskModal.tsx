import React, { ChangeEvent, useReducer, useContext, MouseEvent } from "react";
import ReactDOM from "react-dom";

import BackDrop from "../UI/BackDrop/BackDrop";
import { Task } from "../../models/Task";
import { TasksContext } from "../../store/tasks-context";
import { levelList } from "../../lib/option";

import styles from "./TaskModal.module.css";

type InputAction = { type: string; input: string | number };

type ChangeState = {
  title: boolean;
  desc: boolean;
  level: boolean;
  date: boolean;
  alertTime: boolean;
  tag: boolean;
};

const initialChangeState: ChangeState = {
  title: false,
  desc: false,
  level: false,
  date: false,
  alertTime: false,
  tag: false,
};

const inputReducer = (state: Task, action: InputAction) => {
  return { ...state, [action.type]: action.input };
};

const changeReducer = (state: ChangeState, action: { type: string }) => {
  if (action.type === "clear") {
    return initialChangeState;
  }
  return { ...initialChangeState, [action.type]: true };
};

const TaskModal: React.FC<{
  task: Task;
  onClick: () => void;
  setChange: () => void;
}> = ({ task, onClick, setChange }) => {
  const ctx = useContext(TasksContext);
  const [inputState, dispatchInput] = useReducer(inputReducer, task);
  const [changeState, dispatchChange] = useReducer(
    changeReducer,
    initialChangeState
  );
  const { title, desc, level, year, month, date, alertTime, tag } = inputState;

  const alertObj = new Date(alertTime);
  const alertYear = alertObj.getFullYear();
  const alertMonth = alertObj.getMonth() + 1;
  const alertDate = alertObj.getDate();

  const inputChangeHandler = (type: string, event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    let inputValue = target.value;

    if (type === "date") {
      const dateObj = new Date(inputValue);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const date = dateObj.getDate();
      dispatchInput({ type: "year", input: year });
      dispatchInput({ type: "month", input: month });
      dispatchInput({ type: "date", input: date });
      return;
    }
    if (type === "alertTime") {
      const alertTime = new Date(inputValue).getTime();
      dispatchInput({ type, input: alertTime });
      return;
    }
    dispatchInput({ type, input: inputValue });
  };

  const startEditHandler = (type: string, event: MouseEvent) => {
    event.stopPropagation();
    dispatchChange({ type });
  };

  const blurHandler = () => {
    const updatedState = { ...inputState };
    ctx.updateTask(updatedState);
    setChange();
  };

  const removeTaskHandler = () => {
    ctx.removeTask(task.id);
    onClick();
  };

  const clearFocusHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT"
    ) {
      return;
    }
    if (target.closest("div")) dispatchChange({ type: "clear" });
  };

  const stopPropagationHandler = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const tagText = tag
    ? tag
        .split("")
        .map((char, index) => (index === 0 ? char.toUpperCase() : char))
        .join("")
    : "";

  const taskContent = (
    <section
      className={styles.card}
      onClick={clearFocusHandler}
      onDoubleClick={stopPropagationHandler}
    >
      <div className={styles.control}>
        <h4>Title:</h4>
        {changeState.title ? (
          <input
            type="text"
            value={title}
            onChange={inputChangeHandler.bind(null, "title")}
            onBlur={blurHandler}
          />
        ) : (
          <p onDoubleClick={startEditHandler.bind(null, "title")}>{title}</p>
        )}
      </div>
      <div className={styles.control}>
        <h4>Description:</h4>
        {changeState.desc ? (
          <textarea
            value={desc}
            rows={6}
            onChange={inputChangeHandler.bind(null, "desc")}
            onBlur={blurHandler}
          ></textarea>
        ) : (
          <p onDoubleClick={startEditHandler.bind(null, "desc")}>{desc}</p>
        )}
      </div>
      <div className={styles.mark}>
        <h4>Level:</h4>
        {changeState.level ? (
          <select
            className={styles.level}
            id="level"
            name="level"
            onChange={inputChangeHandler.bind(null, "level")}
            onBlur={blurHandler}
            defaultValue={level}
          >
            <option value="1">Easy</option>
            <option value="2">Normal</option>
            <option value="3">Important</option>
            <option value="4">Super Important</option>
            <option value="5">Hell</option>
          </select>
        ) : (
          <p onDoubleClick={startEditHandler.bind(null, "level")}>{levelList[+level - 1]}</p>
        )}
      </div>
      <div className={styles.mark}>
        <h4>Date:</h4>
        {changeState.date ? (
          <input
            type="date"
            value={`${year}-${month < 10 ? "0" : ""}${month}-${
              date < 10 ? "0" : ""
            }${date}`}
            onChange={inputChangeHandler.bind(null, "date")}
            onBlur={blurHandler}
          />
        ) : (
          <p onDoubleClick={startEditHandler.bind(null, "date")}>
            {year}/{month}/{date}
          </p>
        )}
      </div>
      <div className={styles.mark}>
        <h4>Alert Time:</h4>
        {changeState.alertTime ? (
          <input
            type="date"
            value={`${alertYear}-${alertMonth < 10 ? "0" : ""}${alertMonth}-${
              alertDate < 10 ? "0" : ""
            }${alertDate}`}
            onChange={inputChangeHandler.bind(null, "alertTime")}
            onBlur={blurHandler}
          />
        ) : (
          <p onDoubleClick={startEditHandler.bind(null, "alertTime")}>
            {alertYear}/{alertMonth}/{alertDate}
          </p>
        )}
      </div>
      <div className={styles.mark}>
        <h4>Tag:</h4>
        {changeState.tag ? (
          <select
            className={styles.tag}
            id="tag"
            name="tag"
            onChange={inputChangeHandler.bind(null, "tag")}
            onBlur={blurHandler}
            defaultValue={tag}
          >
            <option value="work">Work</option>
            <option value="family">Family</option>
            <option value="friends">Friends</option>
            <option value="entertainment">Entertainment</option>
            <option value="learning">Learing</option>
          </select>
        ) : (
          <p onDoubleClick={startEditHandler.bind(null, "tag")}>{tagText}</p>
        )}
      </div>
      <div className={styles.actions}>
        <button onClick={removeTaskHandler}>Delete</button>
        <button onClick={onClick}>Confirm</button>
      </div>
    </section>
  );

  const portal: Element | null = document.getElementById("modal-root");

  return (
    <>
      {portal && ReactDOM.createPortal(<BackDrop onClick={onClick} />, portal)}
      {portal && ReactDOM.createPortal(taskContent, portal)}
    </>
  );
};

export default TaskModal;
