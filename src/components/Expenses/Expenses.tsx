import React, { useState } from "react";

import { Expense } from "../../models/Expense";

import SortBar from "./SortBar/SortBar";
import Chart from "./Chart/Chart";
import ExpenseList from "./ExpenseList/ExpenseList";

const Expenses: React.FC<{
  chart: boolean;
  year: number;
  month: number;
  expenses: Expense[];
}> = ({ chart, year, month, expenses }) => {
  const [sort, setSort] = useState<string>("SORT_DAY");

  const setSortHandler = (option: string) => {
    setSort(option);
  };

  const filteredExpenses = expenses.filter(
    (expense) => expense.year === year && expense.month === month
  );

  return (
    <section>
      {chart && <SortBar setSort={setSortHandler} sort={sort} />}
      {chart && (
        <Chart
          year={year}
          month={month}
          sort={sort}
          expenses={filteredExpenses}
        />
      )}
      <ExpenseList year={year} month={month} expenses={filteredExpenses} />
    </section>
  );
};

export default Expenses;
