import React, {useState} from "react";

import { Expense } from "../../../../models/Expense";
import DeleteExpenseModal from "../../../DeleteExpenseModal/DeleteExpenseModal";

import styles from "./ExpenseItem.module.css";

const ExpenseItem: React.FC<{ expense: Expense; index: number; setChange: () => void }> = ({
  expense,
  index,
  setChange,
}) => {
  const [onModal, setOnModal] = useState<boolean>(false);
  const { title, amount, tag, desc, year, month, date, id } = expense;
  const style = { animationDelay: `${index * 0.2}s` };

  const toggleModalHandler = () => {
    setOnModal(prev => !prev);
  };

  return (
    <>
    {onModal && <DeleteExpenseModal onClick={toggleModalHandler} id={id} setChange={setChange} />}
      <li className={styles.expense} style={style} onClick={toggleModalHandler}>
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
    </>
  );
};

export default ExpenseItem;
