import React, {
  useState,
  DragEvent,
  useContext,
  useEffect,
  MouseEvent,
} from "react";

import { Task, TaskBox } from "../../../models/Task";
import TaskContent from "./Task/TaskContent";
import { TasksContext } from "../../../store/tasks-context";
import MemoModal from "../../MemoModal/MemoModal";

import styles from "./CalendarBox.module.css";

interface Props {
  index: number;
  year: number;
  month: number;
  box: TaskBox;
  isExpand: boolean;
};

const CalendarBox: React.FC<Props> = ({ index, year, month, box, isExpand }) => {
  const [droppable, setDroppable] = useState<boolean>(false);
  const [addTask, setAddTask] = useState<boolean>(false);
  const [onExpand, setOnExpand] = useState<boolean>(false);
  const [isChange, setIsChange] = useState<boolean>(false);
  const { isEmpty, date } = box;
  const ctx = useContext(TasksContext);

  // render if any tasks exist on this day. (same year, month and date)
  let tasks: Task[] | null = null;
  if (!isEmpty) {
    tasks = ctx.tasks.filter(
      (task) => task.date === date && task.year === year && task.month === month
    );
  }

  // to trigger re-rendering of TaskContent after updating context
  useEffect(() => {
    if (isChange) {
      setIsChange(false);
    }
  }, [isChange]);

  const setChangeHandler = () => {
    setIsChange(true);
  };

  const dragEnterHandler = (event: DragEvent<HTMLLIElement>) => {
    if (event.dataTransfer.types[0] === "text/plain" && !isEmpty) {
      setDroppable(true);
      event.preventDefault();
    }
  };

  const dragOverHandler = (event: DragEvent<HTMLLIElement>) => {
    if (event.dataTransfer.types[0] === "text/plain" && !isEmpty) {
      event.preventDefault();
    }
  };

  // turn off droppable when leaved.
  const dragLeaveHandler = (event: DragEvent<HTMLLIElement>) => {
    setDroppable(false);
  };

  // turn off droppable if the day box should be empty or it's already exist on this day box.
  const dropHandler = (event: DragEvent<HTMLLIElement>) => {
    const taskId = event.dataTransfer.getData("text/plain");
    if (isEmpty || (tasks && tasks.some((task) => task.id === taskId))) {
      setDroppable(false);
      return;
    }
    // the id was set by application itself, sure to be exist.
    const targetTask = ctx.tasks.find((task) => task.id === taskId) as Task;
    const newPosition = {
      year: targetTask!.year,
      month: targetTask!.month,
      date: +date,
    };
    ctx.changeTask(targetTask, newPosition);
    // turn off droppable when finished data transfer.
    setDroppable(false);
  };

  // listener function for double click event. (on every box)
  // add new task on specified day box.
  const startAddTaskHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    // if double click was occurred on task, won't trigger the function.
    if (onExpand || target.closest("li")) {
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

  let contents;
  if (tasks && tasks.length > 0) {
    contents = tasks.map((task, index) => {
      return (
        <TaskContent
          key={index}
          index={index}
          task={task}
          isExpand={isExpand}
          setChange={setChangeHandler}
        />
      );
    });
  }

  return (
    <section
      className={`${styles.box} ${index > 4 && styles.weekendBox} ${
        isEmpty && styles.empty
      } ${droppable ? styles.onDrop : ""}`}
      onDragEnter={dragEnterHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dropHandler}
      onDoubleClick={startAddTaskHandler}
    >
      {addTask && (
        <MemoModal
          onClick={cancelAddTaskHandler}
          year={year}
          month={month}
          date={+date}
        />
      )}
      <h3>{isEmpty ? "" : date}</h3>
      <ul>{contents}</ul>
    </section>
  );
};

export default CalendarBox;
