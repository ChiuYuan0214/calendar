import React from "react";

import { Expense } from "../../../../models/Expense";

import styles from "./ExpenseItem.module.css";

const ExpenseItem: React.FC<{ expense: Expense; index: number }> = ({
  expense,
  index,
}) => {
  const { title, amount, tag, desc, year, month, date } = expense;

  const style = { animationDelay: `${index * 0.2}s` };

  return (
    <li className={styles.expense} style={style}>
      <div className={styles.info}>
        <div className={styles.title}>
          <h3>{title}</h3>
          {"\xa0\xa0/\xa0\xa0NT$"}
          {amount}
        </div>
        <p>Tag: {tag}</p>
        <p>
          Date: {year}/{month}/{date}
        </p>
      </div>
      <div className={styles.desc}>
        <p>Description:</p>
        <p>{desc}</p>
      </div>
    </li>
  );
};

export default ExpenseItem;
