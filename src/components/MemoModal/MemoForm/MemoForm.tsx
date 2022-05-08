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

interface Props {
  onClose: () => void;
  year: number;
  month: number;
  date: number;
};

const MemoForm: React.FC<Props> = ({ onClose, year, month, date }) => {
  const [initial, setInitial] = useState(true);
  const [alertManual, setAlertManual] = useState(false);

  const ctx = useContext(TasksContext);

  // form input refs
  const titleRef: RefObject<HTMLInputElement> = useRef(null);
  const descRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const levelRef: RefObject<HTMLSelectElement> = useRef(null);
  const tagRef: RefObject<HTMLSelectElement> = useRef(null);
  const alertTimeRef: RefObject<HTMLInputElement> = useRef(null);
  const dateRef: RefObject<HTMLInputElement> = useRef(null);

  // function scope
  // auto set the alertDate whenever the date has changed.
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
    // when the alertDate should be the last day of previous month.
    if (alertDate === 0) {
      alertDate = createLength(month - 2, (year - 2020) % 4 === 0);
      alertMonth--;
    }

    // if the number is smaller than 10, should put a "0" in front of it.
    const monthSmaller = alertMonth < 10;
    const dateSmaller = alertDate < 10;

    alertTimeRef.current!.value = `${year}-${
      monthSmaller ? "0" : ""
    }${alertMonth}-${dateSmaller ? "0" : ""}${alertDate}`;
  }, [alertManual]);
  // function end

  // once the alert input has changed, set alertManual to true to stop auto-adjusting.
  const alertChangeHandler = () => {
    if (alertManual) {
      return;
    }
    setAlertManual(true);
  };

  // auto set the value of date input only after first rendering.
  useEffect(() => {
    if (initial) {
      const smaller = month < 10;
      dateRef.current!.value = `${year}-${smaller ? "0" : ""}${month}-${
        date < 10 ? "0" : ""
      }${date}`;
      setInitial(false);
    }
  }, [year, month, date, initial]);

  // why does tis useEffect exist???
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
    const alertTime = alertObj.getTime();
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
    onClose();
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
          <select id="level" name="level" ref={levelRef}>
            <option value="1">Easy</option>
            <option value="2">Normal</option>
            <option value="3">Important</option>
            <option value="4">Super Important</option>
            <option value="5">Hell</option>
          </select>
        </div>
        <div className={styles.control}>
          <label htmlFor="tag">Tag</label>
          <select id="tag" name="tag" ref={tagRef}>
            <option value="work">Work</option>
            <option value="family">Family</option>
            <option value="friends">Friends</option>
            <option value="entertainment">Entertainment</option>
            <option value="learning">Learing</option>
          </select>
        </div>
      </div>
      <div className={styles.timeControl}>
        <div className={styles.control}>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            ref={dateRef}
            onChange={dateChangeHandler}
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="alert">Alert Time</label>
          <input
            id="alert"
            type="date"
            name="alert"
            ref={alertTimeRef}
            onChange={alertChangeHandler}
          />
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
