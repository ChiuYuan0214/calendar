import React, { useState } from "react";

import { CSSTransition } from "react-transition-group";

import { Expense } from "../../models/Expense";

import SortBar from "./SortBar/SortBar";
import Chart from "./Chart/Chart";
import ExpenseList from "./ExpenseList/ExpenseList";

import styles from "./Expenses.module.css";

interface Props {
  chart: boolean;
  year: number;
  month: number;
  expenses: Expense[];
  setChange: () => void;
}

const Expenses: React.FC<Props> = ({
  chart,
  year,
  month,
  expenses,
  setChange,
}) => {
  const [sort, setSort] = useState<string>("SORT_DAY");

  // switch between 'sort by day', 'sort by month' and 'sort by year'.
  const setSortHandler = (option: string) => {
    setSort(option);
  };

  let filteredExpenses = expenses.filter((expense) => expense.year === year);

  if (sort === "SORT_DAY") {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.month === month
    );
  }

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
      <ExpenseList
        year={year}
        month={month}
        expenses={filteredExpenses}
        setChange={setChange}
      />
    </section>
  );
};

export default Expenses;
