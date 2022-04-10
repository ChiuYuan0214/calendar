import React, { useState, useEffect } from "react";

import MemoModal from "../MemoModal/MemoModal";

import styles from "./SelectBar.module.css";

const SelectBar: React.FC<{
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
  toggleTodo: (isToggle: boolean) => void;
  toggleExpenses: () => void;
  toggleChart: () => void;
  toggleAddExpense: () => void;
  year: number;
  month: number;
  isTodo: boolean;
  isExpenses: boolean;
}> = ({
  changeYear,
  changeMonth,
  toggleTodo,
  toggleExpenses,
  toggleChart,
  toggleAddExpense,
  year,
  month,
  isTodo,
  isExpenses,
}) => {
  const [addMemo, setAddMemo] = useState(false);

  // input value state.
  const [yearInput, setYearInput] = useState("2022");
  const [monthInput, setMonthInput] = useState("2");

  const memoModalToggleHandler = () => {
    setAddMemo((prev) => !prev);
  };

  // change the year state in App.tsx from here.
  const yearChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYearInput(event.target.value);
    toggleTodo(false);
  };

  // change the month state in App.tsx from here.
  const monthChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonthInput(event.target.value);
    toggleTodo(false);
  };

  // set the states "year" and "month" in parent component to local input values.
  useEffect(() => {
    // lock the input values.
    const userPrevInput = { yearInput, monthInput };
    // compare current input value to values 500ms before.
    const timer = setTimeout(() => {
      if (
        yearInput === userPrevInput.yearInput &&
        monthInput === userPrevInput.monthInput
      ) {
        changeYear(+yearInput);
        changeMonth(+monthInput);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [yearInput, monthInput, changeYear, changeMonth]);

  return (
    <section className={styles.bar}>
      <div className={`${styles.actions} ${isTodo ? styles.calenBtn : ""}`}>
        {!isExpenses && (
          <>
            <button onClick={() => toggleTodo(true)}>
              {isTodo ? "Calendar" : "TodoList"}
            </button>
            <button onClick={memoModalToggleHandler}>Add Memo</button>
          </>
        )}
        {isExpenses && (
          <>
            <button onClick={toggleChart}>Chart</button>
            <button onClick={toggleAddExpense}>Add Expenses</button>
          </>
        )}
        <button className={styles.switch} onClick={toggleExpenses}>
          Switch to {isExpenses ? "Calendar" : "Expenses"}
        </button>
      </div>
      {addMemo && (
        <MemoModal
          onClick={memoModalToggleHandler}
          year={year}
          month={month}
          date={1}
        />
      )}
      <div className={styles.controls}>
        <div className={styles.inputControl}>
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            min="1900"
            max="2100"
            step="1"
            id="year"
            name="year"
            value={yearInput}
            onChange={yearChangeHandler}
          />
        </div>
        <div className={styles.inputControl}>
          <label htmlFor="month">Month:</label>
          <input
            type="number"
            min="1"
            max="12"
            step="1"
            id="month"
            name="month"
            value={monthInput}
            onChange={monthChangeHandler}
          />
        </div>
      </div>
    </section>
  );
};

export default SelectBar;
