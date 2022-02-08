import { Task } from "./Task";

export type MonthObj = {
  month: number;
  tasks: Task[];
};

export type YearObj = {
  year: number;
  monthList: MonthObj[];
};

export type LevelObj = {
  level: number;
  tasks: Task[];
};

export type TagObj = {
  tag: string;
  tasks: Task[];
};