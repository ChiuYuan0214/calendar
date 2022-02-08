import React, { useContext} from "react";

import ExpensesContext from "../../../store/expenses-context";
import { Expense } from "../../../models/Expense";
import { createLength } from "../../../lib/date";

import ChartScale from "./ChartScale/ChartScale";
import ChartContent from "./ChartContent/ChartContent";
import ChartTitle from "./ChartTitle/ChartTitle";

import styles from "./Chart.module.css";

const Chart: React.FC<{
  year: number;
  month: number;
  sort: string;
  expenses: Expense[];
}> = ({ sort, year, month, expenses }) => {
  const ctx = useContext(ExpensesContext);
  let barNum = 0;
  let numList: number[] = [];

  if (sort === "SORT_DAY") {
    const isLeap = (year - 2020) % 4 === 0;
    barNum = createLength(month - 1, isLeap);
    for (let i = 0; i < barNum; i++) {
      numList.push(0);
    }
    for (const expense of expenses) {
      const index = expense.date - 1;
      numList[index] += expense.amount;
    }
  } else if (sort === "SORT_MONTH") {
    barNum = 12;
    for (let i = 0; i < barNum; i++) {
      numList.push(0);
    }
    for (const expense of expenses) {
      const index = expense.month - 1;
      numList[index] += expense.amount;
    }
  } else if (sort === "SORT_YEAR") {
    barNum = 7;
    for (let i = 0; i < barNum; i++) {
      numList.push(0);
    }
    const expenses = ctx.expenses;
    const filteredList = expenses.filter(
      (expense) => expense.year >= year - 3 && expense.year <= year + 3
    );
    filteredList.forEach((expense) => {
      const index = expense.year - year + 3;
      numList[index] += expense.amount;
    });
  }

  const maxVal = numList.length > 0 ? Math.ceil(Math.max(...numList)) : 0;

  return (
    <section className={styles.box}>
      <div className={styles.chart}>
        <ChartScale maxVal={maxVal} />
        <div className={styles.contentBox}>
          <ChartContent
            sort={sort}
            maxVal={maxVal}
            numList={numList}
            year={year}
            month={month}
          />
          <ChartTitle sort={sort} year={year} barNum={barNum} />
        </div>
      </div>
    </section>
  );
};

export default Chart;
