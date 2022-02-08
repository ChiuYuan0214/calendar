import React, { useState } from "react";

import { CSSTransition } from "react-transition-group";

import { Expense } from "../../models/Expense";

import SortBar from "./SortBar/SortBar";
import Chart from "./Chart/Chart";
import ExpenseList from "./ExpenseList/ExpenseList";

import styles from './Expenses.module.css';

const Expenses: React.FC<{
  chart: boolean;
  year: number;
  month: number;
  expenses: Expense[];
}> = ({ chart, year, month, expenses }) => {
  const [sort, setSort] = useState<string>("SORT_DAY");

  const setSortHandler = (option: string) => {
    setSort(option);
  };

  const filteredExpenses = expenses.filter(
    (expense) => expense.year === year && expense.month === month
  );

  const animationTiming = {
    enter: 800,
    exit: 800,
  };

  return (
    <section>
      <CSSTransition
        in={chart}
        timeout={animationTiming}
        mountOnEnter
        unmountOnExit
        classNames={{
          enterActive: styles.dropdown,
          exitActive: styles.pullup,
        }}
      >
        <section className={styles.box}>
          <SortBar setSort={setSortHandler} sort={sort} />
          <Chart
            year={year}
            month={month}
            sort={sort}
            expenses={filteredExpenses}
          />
        </section>
      </CSSTransition>
      <ExpenseList year={year} month={month} expenses={filteredExpenses} />
    </section>
  );
};

export default Expenses;
