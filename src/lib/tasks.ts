import { Task } from "../models/Task";
import { YearObj, LevelObj, TagObj } from "../models/TaskObj";
import { convertIntoTime } from "./date";

export const filterExpireTask = (tasks: Task[]) => {
  const curTime = new Date().getTime();
  const passList: Task[] = [];
  const expireList: Task[] = [];
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const { year, month, date } = task;
    if (convertIntoTime(year, month, date) < curTime) {
      expireList.push(task);
    } else {
      passList.push(task);
    }
  }
  return [passList, expireList];
};

export const sortTaskByYM = (tasks: Task[]) => {
  const list: YearObj[] = [];

  for (let i = 0; i < tasks.length; i++) {
    const curTask = tasks[i];
    const outertIndex = list.findIndex((y) => y.year === curTask.year);
    if (outertIndex >= 0) {
      const innerIndex = list[outertIndex].monthList.findIndex(
        (m) => m.month === curTask.month
      );
      if (innerIndex >= 0) {
        list[outertIndex].monthList[innerIndex].tasks.push(curTask);
      } else {
        list[outertIndex].monthList.push({
          month: curTask.month,
          tasks: [curTask],
        });
      }
    } else {
      list.push({
        year: curTask.year,
        monthList: [{ month: curTask.month, tasks: [curTask] }],
      });
    }
  }

  return list;
};

export const sortTaskByLevel = (tasks: Task[]) => {
  const list: LevelObj[] = [];
  
  for (let i = 0; i < tasks.length; i++) {
    const curTask = tasks[i];
    const index = list.findIndex((l) => l.level === +curTask.level);
    if (index >= 0) {
      list[index].tasks.push(curTask);
    } else {
      list.push({
        level: +curTask.level,
        tasks: [curTask],
      });
    }
  }

  return list;
};

export const sortTaskByTag = (tasks: Task[]) => {
  const list: TagObj[] = [];

  for (let i = 0; i < tasks.length; i++) {
    const curTask = tasks[i];
    const index = list.findIndex((t) => t.tag === curTask.tag);
    if (index >= 0) {
      list[index].tasks.push(curTask);
    } else {
      list.push({
        tag: curTask.tag,
        tasks: [curTask],
      });
    }
  }

  return list;
};
