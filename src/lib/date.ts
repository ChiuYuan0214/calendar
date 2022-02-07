import { TaskBox } from "../models/Task";

const baseData = {
  year: 2020,
  startDayIndex: 2,
  isLeap: true,
};

export const getCurrentYearData = (year: number) => {
  if (year === 2020) {
    return baseData;
  }

  let yearNum = year - baseData.year;
  let isLarger = yearNum >= 0;
  let isLeap = yearNum % 4 === 0;

  let startDayIndex = baseData.startDayIndex + yearNum;

  let leapNum = Math.floor(Math.abs(yearNum) / 4);

  if (isLarger && isLeap) {
    startDayIndex += leapNum;
  } else if (isLarger) {
    startDayIndex += leapNum + 1;
  } else {
    startDayIndex -= leapNum;
  }

  while (startDayIndex > 6) {
    startDayIndex -= 7;
  }

  while (startDayIndex < 0) {
    startDayIndex += 7;
  }

  const currentYearData = {
    year,
    startDayIndex,
    isLeap,
  };

  return currentYearData;
};

export const createStartDay = (startDayIndex: number, isLeap: boolean) => {
  const x = startDayIndex;
  const startDayList: number[] = [
    x,
    x + 3,
    x + 3,
    x + 6,
    x + 1,
    x + 4,
    x + 6,
    x + 2,
    x + 5,
    x,
    x + 3,
    x + 5,
  ];
  if (isLeap) {
    for (let i = 1; i < 12; i++) {
      startDayList[i] = startDayList[i] + 1;
    }
  }

  const newList: number[] = [];
  for (const startDay of startDayList) {
    let newStartDay = startDay;
    while (newStartDay > 6) {
      newStartDay -= 7;
    }
    newList.push(newStartDay);
  }

  return newList;
};

export const createLength = (monthIndex: number, isLeap: boolean) => {
  const list = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let length = list[monthIndex];
  if (isLeap) {
    length++;
  }

  return length;
};

export const createCalendar = (year: number, month: number) => {
  const { startDayIndex, isLeap } = getCurrentYearData(year);
  const monthIndex = month - 1;
  const monthStartDay = createStartDay(startDayIndex, isLeap)[monthIndex];
  const length = createLength(monthIndex, isLeap);
  return {
    startDay: monthStartDay,
    length,
  };
};

export const getCalendarTable = (startDay: number, length: number) => {
  const weekNum = Math.ceil((length - (6 - startDay)) / 7) + 1;

  const calendar: TaskBox[][] = [];
  for (let i = 0; i < weekNum; i++) {
    calendar.push([]);
  }
  let monthLength = length;
  for (let i = 0; i < startDay; i++) {
    calendar[0][i] = new TaskBox(true, 0);
  }

  let row = 0;

  for (let i = startDay; monthLength > 0; i++) {
    if (i > 6) {
      i -= 7;
      row++;
    }
    calendar[row][i] = new TaskBox(false, length - monthLength + 1);
    monthLength--;
    if (monthLength === 0) {
      const lastWeekEmptyNum = 6 - i;
      for (let r = 0; r < lastWeekEmptyNum; r++) {
        calendar[row].push(new TaskBox(true, 0));
      }
    }
  }

  return calendar;
};

export const convertIntoTime = (year: number, month: number, date: number) => {
  const dateString = `${year}-${month < 10 ? "0" : ""}${month}-${
    date < 10 ? "0" : ""
  }${date}`;
  const timeNum = new Date(dateString).getTime();
  return timeNum;
};

export const convertIntoString = (year: number, month: number, date: number) => {
  const dateString = `${year}-${month < 10 ? "0" : ""}${month}-${
    date < 10 ? "0" : ""
  }${date}`;
  return dateString;
};