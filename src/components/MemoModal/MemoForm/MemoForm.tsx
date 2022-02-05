import React, {
  FormEvent,
  RefObject,
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";

import { TasksContext } from "../../../store/tasks-context";
import { Task } from "../../../models/Task";
import { createLength } from "../../../lib/date";

import styles from "./MemoForm.module.css";

const MemoForm: React.FC<{
  onClose: () => void;
  year: number;
  month: number;
}> = ({ onClose, year, month }) => {
  const [initial, setInitial] = useState(true);
  const [alertManual, setAlertManual] = useState(false);

  const ctx = useContext(TasksContext);

  const titleRef: RefObject<HTMLInputElement> = useRef(null);
  const descRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const levelRef: RefObject<HTMLInputElement> = useRef(null);
  const tagRef: RefObject<HTMLInputElement> = useRef(null);
  const alertTimeRef: RefObject<HTMLInputElement> = useRef(null);
  const dateRef: RefObject<HTMLInputElement> = useRef(null);

  const dateChangeHandler = useCallback(() => {
    if (alertManual) {
      return;
    }
    const dateObj = new Date(dateRef.current!.value);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();

    let alertDate = date - 1;
    let alertMonth = month;
    if (alertDate === 0) {
      alertDate = createLength(month - 2, (year - 2020) % 4 === 0);
      alertMonth--;
    }
    const monthSmaller = alertMonth < 10;
    const dateSmaller = alertDate < 10;

    alertTimeRef.current!.value = `${year}-${
      monthSmaller ? "0" : ""
    }${alertMonth}-${dateSmaller ? "0" : ""}${alertDate}`;
  }, [alertManual]);

  const alertChangeHandler = () => {
    if (alertManual) {
      return;
    }
    setAlertManual(true);
  };

  useEffect(() => {
    if (initial) {
      const smaller = month < 10;
      dateRef.current!.value = `${year}-${smaller && "0"}${month}-01`;
      setInitial(false);
    }
  }, [year, month, initial]);

  useEffect(() => {
    dateChangeHandler();
  }, [dateChangeHandler]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    const title = titleRef.current!.value;
    const desc = descRef.current!.value;
    const level = levelRef.current!.value;
    const tag = tagRef.current!.value;
  
    const dateObj = new Date(dateRef.current!.value);
    const year = +dateObj.getFullYear().toString();
    const month = +dateObj.getMonth().toString() + 1;
    const date = +dateObj.getDate().toString();

    const alertObj = new Date(alertTimeRef.current!.value);
    const alertTime = Math.floor(
      (alertObj.getTime() - dateObj.getTime()) / 1000 / 60 / 60 / 24
    );
    const newTask = new Task(
      title,
      desc,
      level,
      tag,
      alertTime,
      year,
      month,
      date
    );

    ctx.addTask(newTask);
    titleRef.current!.value = "";
    descRef.current!.value = "";
    levelRef.current!.value = "";
    tagRef.current!.value = "";
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" ref={titleRef} />
      </div>
      <div className={styles.control}>
        <label htmlFor="desc">Description</label>
        <textarea id="desc" name="desc" rows={7} ref={descRef}></textarea>
      </div>
      <div className={styles.dblControl}>
        <div className={styles.control}>
          <label htmlFor="level">Task Level</label>
          <input
            id="level"
            type="number"
            name="level"
            min="1"
            max="5"
            step="1"
            ref={levelRef}
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="tag">Tag</label>
          <input id="tag" type="text" name="tag" ref={tagRef} />
        </div>
      </div>
      <div className={styles.timeControl}>
        <div className={styles.control}>
          <label htmlFor="date">Date</label>
          <input id="date" type="date" name="date" ref={dateRef} onChange={dateChangeHandler} />
        </div>
        <div className={styles.control}>
          <label htmlFor="alert">Alert Time</label>
          <input id="alert" type="date" name="alert" ref={alertTimeRef} onChange={alertChangeHandler} />
        </div>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={onClose}>
          Close
        </button>
        <button type="submit">Confirm</button>
      </div>
    </form>
  );
};

export default MemoForm;
