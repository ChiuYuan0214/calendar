import React, { useState } from "react";

import { Expense } from "../../models/Expense";

import SortBar from "./SortBar/SortBar";
import Chart from "./Chart/Chart";
import ExpenseList from "./ExpenseList/ExpenseList";

const DUMMY_DATA = [
  new Expense(
    "Buy a bicycle",
    8000,
    "tool",
    "Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to referenceWarning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference",
    2022,
    2,
    8
  ),
  new Expense(
    "Buy a bicycle",
    8000,
    "tool",
    "Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference",
    2022,
    2,
    9
  ),
  new Expense(
    "Buy a bicycle",
    8000,
    "tool",
    "Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference",
    2022,
    2,
    10
  ),
  new Expense(
    "Buy a bicycle",
    8000,
    "tool",
    "Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference",
    2022,
    2,
    11
  ),
  new Expense(
    "Buy a bicycle",
    8000,
    "tool",
    "Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference",
    2022,
    2,
    12
  ),
  new Expense(
    "Buy a bicycle",
    8000,
    "tool",
    "Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference",
    2022,
    2,
    20
  ),
  new Expense(
    "Buy a bicycle",
    8000,
    "tool",
    "Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference",
    2022,
    2,
    25
  ),
  new Expense(
    "Buy a bicycle",
    8000,
    "tool",
    "Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference",
    2022,
    2,
    26
  ),
  new Expense(
    "Buy a bicycle",
    8000,
    "tool",
    "Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference",
    2022,
    2,
    27
  ),
  new Expense(
    "Buy a bicycle",
    8000,
    "tool",
    "Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference",
    2022,
    2,
    27
  ),
];

const Expenses: React.FC<{ chart: boolean; year: number; month: number }> = ({
  chart,
  year,
  month,
}) => {
  const [sort, setSort] = useState<string>("SORT_DAY");

  const setSortHandler = (option: string) => {
    setSort(option);
  };

  const filteredExpenses = DUMMY_DATA.filter(
    (expense) => expense.year === year && expense.month === month
  );

  return (
    <section>
      {chart && <SortBar setSort={setSortHandler} sort={sort} />}
      {chart && <Chart year={year} month={month} sort={sort} expenses={filteredExpenses} />}
      <ExpenseList year={year} month={month} expenses={filteredExpenses} />
    </section>
  );
};

export default Expenses;
