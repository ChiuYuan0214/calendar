export class Task {
  title: string;
  desc: string;
  level: string;
  tag: string;
  alertTime: number;
  year: number;
  month: number;
  date: number;
  id: string;

  constructor(
    taskTitle: string,
    taskDesc: string,
    taskLevel: string,
    taskTag: string,
    alertTime: number,
    year: number,
    month: number,
    date: number
  ) {
    this.title = taskTitle;
    this.desc = taskDesc;
    this.level = taskLevel;
    this.tag = taskTag;
    this.alertTime = alertTime;
    this.year = year;
    this.month = month;
    this.date = date;
    this.id = new Date().getTime().toString();
  }
}

export class TaskBox {
  isEmpty: boolean;
  tasks: Task[];
  date: number;

  constructor(isEmpty: boolean, date: number) {
    this.isEmpty = isEmpty;
    this.date = date;
    this.tasks = [];
  }
}
