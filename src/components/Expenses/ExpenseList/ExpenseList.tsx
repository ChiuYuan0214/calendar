import React from "react";

import { Expense } from "../../../models/Expense";

import ExpenseItem from "./ExpenseItem/ExpenseItem";

import styles from "./ExpenseList.module.css";

const ExpenseList: React.FC<{
  expenses: Expense[];
  year: number;
  month: number;
}> = ({ expenses, year, month }) => {
  let contents = null;
  if (expenses.length > 0) {
    const sortedExpenses = expenses.sort((a: Expense, b: Expense) =>
      a.date > b.date ? -1 : 1
    );
    contents = sortedExpenses.map((expense, index) => (
      <ExpenseItem key={index} index={index} expense={expense} />
    ));
  }

  let inform = `No expenses in ${year} - ${month}`;
  if (contents) {
    inform = `Expenses in ${year} - ${month}`;
  }

  return (
    <>
      <ul className={styles.board}>
        <h1>{inform}</h1>
        {contents}
      </ul>
    </>
  );
};

export default ExpenseList;
