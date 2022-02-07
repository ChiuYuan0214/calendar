import React, { useState } from "react";

import { Task } from "../models/Task";

type positionData = {
  year: number;
  month: number;
  date: number;
};

type taskContextObj = {
  tasks: Task[];
  addTask: (newTask: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (task: Task) => void;
  changeTask: (task: Task | undefined, data: positionData) => void;
};

export const TasksContext = React.createContext<taskContextObj>({
  tasks: [],
  addTask: () => {},
  removeTask: () => {},
  updateTask: () => {},
  changeTask: () => {},
});

const TasksProvider: React.FC = (props) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTaskHandler = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const removeTaskHandler = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTaskHandler = (newTask: Task) => {
    setTasks((prev) => {
      const targetIndex = prev.findIndex((task) => task.id === newTask.id);
      const task = { ...newTask };
      prev.splice(targetIndex, 1);
      prev.push(task);

      return prev;
    });
  };

  const changeTaskHandler = (
    currentTask: Task | undefined,
    newPosition: positionData
  ) => {
    if (!currentTask) {
      return;
    }
    const { year, month, date } = newPosition;
    const targetIndex = tasks.findIndex((task) => task.id === currentTask.id);
    const { year: tYear, month: tMonth, date: tDate, alertTime } = currentTask;

    const timeChange =
      new Date(
        `${year}-${month < 10 ? "0" : ""}${month}-${
          date < 10 ? "0" : ""
        }${date}`
      ).getTime() -
      new Date(
        `${tYear}-${tMonth < 10 ? "0" : ""}${tMonth}-${
          tDate < 10 ? "0" : ""
        }${tDate}`
      ).getTime();

    const newAlertTime = alertTime + timeChange;
    const newTask = {
      ...currentTask,
      year,
      month,
      date,
      alertTime: newAlertTime,
    };

    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[targetIndex] = newTask;
      return newTasks;
    });
  };

  const TasksContextValue: taskContextObj = {
    tasks,
    addTask: addTaskHandler,
    removeTask: removeTaskHandler,
    updateTask: updateTaskHandler,
    changeTask: changeTaskHandler,
  };

  return (
    <TasksContext.Provider value={TasksContextValue}>
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
