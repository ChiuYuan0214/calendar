import React, { useState } from "react";

import { Task } from "../models/Task";
import { convertIntoTime } from "../lib/date";

import {DUMMY_TASK_DATA} from '../data/dummy-tasks';

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
  const [tasks, setTasks] = useState<Task[]>(DUMMY_TASK_DATA);

  const addTaskHandler = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const removeTaskHandler = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTaskHandler = (newTask: Task) => {
    setTasks((prev) => {
      const targetIndex = prev.findIndex((task) => task.id === newTask.id);
      prev.splice(targetIndex, 1);
      prev.push(newTask);

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

    const curTime = convertIntoTime(year, month, date);
    const newTime = convertIntoTime(tYear, tMonth, tDate);
    const timeChange = curTime - newTime;

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
