import React, { FormEvent, useState, useContext } from "react";
import ReactDOM from "react-dom";

import BackDrop from "../UI/BackDrop/BackDrop";
import { Expense } from "../../models/Expense";
import ExpensesContext from "../../store/expenses-context";

import styles from "./AddExpenseModal.module.css";

const AddExpenseModal: React.FC<{
  toggleAdding: () => void;
  year: number;
  month: number;
}> = ({ toggleAdding, year, month }) => {
  const AddExpenseModal: React.FC = () => {
    const ctx = useContext(ExpensesContext);
    const [title, setTitle] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [tag, setTag] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [date, setDate] = useState<string>(
      `${year}-${month < 10 ? "0" : ""}${month}-01`
    );

    const titleChangeHandler = (event: FormEvent) => {
      const target = event.target as HTMLInputElement;
      setTitle(target.value);
    };

    const amountChangeHandler = (event: FormEvent) => {
      const target = event.target as HTMLInputElement;
      setAmount(target.value);
    };

    const tagChangeHandler = (event: FormEvent) => {
      const target = event.target as HTMLInputElement;
      setTag(target.value);
    };

    const dateChangeHandler = (event: FormEvent) => {
      const target = event.target as HTMLInputElement;
      setDate(target.value);
    };

    const descChangeHandler = (event: FormEvent) => {
      const target = event.target as HTMLSelectElement;
      setDesc(target.value);
    };

    const submitHandler = (event: FormEvent) => {
      event.preventDefault();
      if (!title.trim()||isNaN(+amount)||!tag.trim()) {
        alert("Please fill in title, amount and tag in right format.");
        return;
      }
      const dateObj = new Date(date);
      const inputYear = dateObj.getFullYear();
      const inputMonth = dateObj.getMonth() + 1;
      const inputDate = dateObj.getDate();

      const newExpense = new Expense(
        title,
        +amount,
        tag,
        desc,
        inputYear,
        inputMonth,
        inputDate
      );

      ctx.addExpense(newExpense);
      setTitle("");
      setAmount("");
      setTag("");
      setDesc("");
      setDate("");
      toggleAdding();
    };

    return (
      <form className={styles.modal} onSubmit={submitHandler}>
        <h1>Add your new expense!</h1>
        <div className={styles.control}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="what did you spend for?"
            onChange={titleChangeHandler}
            value={title}
          />
        </div>
        <div className={styles.inline}>
          <div className={styles.control}>
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              placeholder="how much?"
              onChange={amountChangeHandler}
              value={amount}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="tag">Tag:</label>
            <input
              type="text"
              id="tag"
              placeholder="what kind of product?"
              onChange={tagChangeHandler}
              value={tag}
            />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor="desc">Description:</label>
          <textarea
            id="desc"
            rows={5}
            placeholder="give some extra info"
            onChange={descChangeHandler}
            value={desc}
          ></textarea>
        </div>
        <div className={styles.control}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            onChange={dateChangeHandler}
            value={date}
          />
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={toggleAdding}>Close</button>
          <button type="submit">Add</button>
        </div>
      </form>
    );
  };

  const portal = document.getElementById("modal-root");

  return (
    <>
      {portal &&
        ReactDOM.createPortal(<BackDrop onClick={toggleAdding} />, portal)}
      {portal && ReactDOM.createPortal(<AddExpenseModal />, portal)}
    </>
  );
};

export default AddExpenseModal;
