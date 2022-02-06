import React, { useState, useEffect } from "react";

import MemoModal from "../MemoModal/MemoModal";

import styles from "./SelectBar.module.css";

const SelectBar: React.FC<{
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
  year: number;
  month: number;
}> = ({ changeYear, changeMonth, year, month }) => {
  const [addMemo, setAddMemo] = useState(false);
  const [yearInput, setYearInput] = useState("2022");
  const [monthInput, setMonthInput] = useState("2");

  const memoModalToggleHandler = () => {
    setAddMemo((prev) => !prev);
  };

  const yearChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYearInput(event.target.value);
  };

  const monthChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonthInput(event.target.value);
  };

  useEffect(() => {
    const userPrevInput = { yearInput, monthInput };

    const timer = setTimeout(() => {
      if (
        yearInput === userPrevInput.yearInput &&
        monthInput === userPrevInput.monthInput
      ) {
        changeYear(+yearInput);
        changeMonth(+monthInput);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [yearInput, monthInput, changeYear, changeMonth]);

  return (
    <section className={styles.bar}>
      <div className={styles.actions}>
        <button>Todo List</button>
        <button onClick={memoModalToggleHandler}>Add Memo</button>
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
