export class Expense {
  title: string;
  amount: number;
  tag: string;
  desc: string;
  year: number;
  month: number;
  date: number;
  id: string;

  constructor(
    expenseTitle: string,
    expenseAmount: number,
    expenseTag: string,
    expenseDesc: string,
    year: number,
    month: number,
    date: number
  ) {
    this.title = expenseTitle;
    this.amount = expenseAmount;
    this.desc = expenseDesc;
    this.tag = expenseTag;
    this.year = year;
    this.month = month;
    this.date = date;
    this.id = new Date().getTime().toString();
  }
}
