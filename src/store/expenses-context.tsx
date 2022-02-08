import React, { useState } from "react";

import { Expense } from "../models/Expense";
import { DUMMY_EXPENSES_DATA } from "../data/dummy-expenses";

type expenseContextObj = {
  expenses: Expense[];
  addExpense: (newExpense: Expense) => void;
  removeExpense: (id: string) => void;
};

const ExpensesContext = React.createContext<expenseContextObj>({
  expenses: [],
  addExpense: () => {},
  removeExpense: () => {},
});

export const ExpensesProvider: React.FC = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(DUMMY_EXPENSES_DATA);

  const addExpenseHandler = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const removeExpenseHandler = (id: string) => {
    setExpenses((prev) => {
      const targetIndex = prev.findIndex((e) => e.id === id);
      if (targetIndex >= 0) {
        prev.splice(targetIndex, 1);
      }
      return prev;
    });
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        addExpense: addExpenseHandler,
        removeExpense: removeExpenseHandler,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContext;
