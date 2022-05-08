import React, { useState, useEffect } from "react";

import { Expense } from "../../../models/Expense";

import ExpenseItem from "./ExpenseItem/ExpenseItem";

import styles from "./ExpenseList.module.css";

interface Props {
  expenses: Expense[];
  year: number;
  month: number;
  setChange: () => void;
};

const ExpenseList: React.FC<Props> = ({ expenses, year, month, setChange }) => {
  const [isFade, setIsFade] = useState<boolean>(false);

  let contents = null;

  // set content to expense item if data was not empty.
  if (expenses.length > 0) {
    const sortedExpenses = expenses.sort((a: Expense, b: Expense) =>
      a.date > b.date ? -1 : 1
    );
    contents = sortedExpenses.map((expense, index) => (
      <ExpenseItem key={index} index={index} expense={expense} setChange={setChange} />
    ));
  }

  // to create topmost information of this component.
  let inform = `No expenses in ${year} - ${month}`;
  if (contents) {
    inform = `Expenses in ${year} - ${month}`;
  }

  // auto toggle the fade-in animation whenever 'year' and 'month' has changed.
  useEffect(() => {
    setIsFade(true);
    const timer = setTimeout(() => {
      setIsFade(false);
    }, 700);
    return () => {
      clearTimeout(timer);
    }
  }, [year, month]);

  return (
    <>
      <ul className={styles.board}>
        <h1 className={isFade ? styles.fill : ""}>{inform}</h1>
        {contents}
      </ul>
    </>
  );
};

export default ExpenseList;
