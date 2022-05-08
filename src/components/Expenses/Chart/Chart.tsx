import React, { useContext} from "react";

import ExpensesContext from "../../../store/expenses-context";
import { Expense } from "../../../models/Expense";
import { createLength } from "../../../lib/date";

import ChartScale from "./ChartScale/ChartScale";
import ChartContent from "./ChartContent/ChartContent";
import ChartTitle from "./ChartTitle/ChartTitle";

import styles from "./Chart.module.css";

interface Props {
  year: number;
  month: number;
  sort: string;
  expenses: Expense[];
};

const Chart: React.FC<Props> = ({ sort, year, month, expenses }) => {
  const ctx = useContext(ExpensesContext);
  let barNum = 0;
  let numList: number[] = [];

  if (sort === "SORT_DAY") {
    // determine the number of bar based whether the year is leap or not.
    const isLeap = (year - 2020) % 4 === 0;
    barNum = createLength(month - 1, isLeap);
    // fill all the space with initial value 0.
    for (let i = 0; i < barNum; i++) {
      numList.push(0);
    }
    // add the amount into respective day.
    for (const expense of expenses) {
      const index = expense.date - 1;
      numList[index] += expense.amount;
    }
  } else if (sort === "SORT_MONTH") {
    barNum = 12;
    // fill all the space with initial value 0.
    for (let i = 0; i < barNum; i++) {
      numList.push(0);
    }
    // add the amount into respective month.
    for (const expense of expenses) {
      const index = expense.month - 1;
      numList[index] += expense.amount;
    }
  } else if (sort === "SORT_YEAR") {
    barNum = 7;
    // fill all the space with initial value 0.
    for (let i = 0; i < barNum; i++) {
      numList.push(0);
    }
    // retrieve the data from context again. (data from props only contains specified year)
    const expenses = ctx.expenses;
    // find previous and afterward 3 years of current year.
    const filteredList = expenses.filter(
      (expense) => expense.year >= year - 3 && expense.year <= year + 3
    );
    // add the amount into respective year.
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
