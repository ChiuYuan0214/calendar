import React from "react";

import { Expense } from "../../../../models/Expense";

import styles from "./ExpenseItem.module.css";

const ExpenseItem: React.FC<{ expense: Expense; index: number }> = ({ expense, index }) => {
  const { title, amount, tag, desc, year, month, date } = expense;

  const style = {animationDelay: `${index * 0.2}s`};

  return (
    <li className={styles.expense} style={style}>
      <div className={styles.title}>
        <h3>{title}</h3>
        {"\xa0\xa0/\xa0\xa0NT$"}
        {amount}
      </div>
      <p>{tag}</p>
      <p>
        {year}/{month}/{date}
      </p>
      <p>{desc}</p>
    </li>
  );
};

export default ExpenseItem;
