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

const CalendarBox: React.FC<{
  index: number;
  year: number;
  month: number;
  box: TaskBox;
  isExpand: boolean;
}> = ({ index, year, month, box, isExpand }) => {
  const [droppable, setDroppable] = useState<boolean>(false);
  const [addTask, setAddTask] = useState<boolean>(false);
  const [onExpand, setOnExpand] = useState<boolean>(false);
  const [isChange, setIsChange]= useState<boolean>(false);
  const { isEmpty, date } = box;
  const ctx = useContext(TasksContext);
  let tasks: Task[]|null = null;
  if (!isEmpty) {
    tasks = ctx.tasks.filter((task) => task.date === date);
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

  const dragLeaveHandler = (event: DragEvent<HTMLLIElement>) => {
    setDroppable(false);
  };

  const dropHandler = (event: DragEvent<HTMLLIElement>) => {
    const taskId = event.dataTransfer.getData("text/plain");
    if (isEmpty || (tasks && tasks.some((task) => task.id === taskId))) {
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

  const startAddTaskHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
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
