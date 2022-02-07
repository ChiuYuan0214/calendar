import { Task } from "./Task";

export type MonthObj = {
  month: number;
  tasks: Task[];
};

export type YearObj = {
  year: number;
  monthList: MonthObj[];
};
