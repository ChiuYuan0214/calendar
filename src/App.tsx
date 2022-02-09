import React, { useState, useEffect, useContext } from "react";

import SelectBar from "./components/SelectBar/SelectBar";
import Calendar from "./components/Calendar/Calendar";
import TodoList from "./components/TodoList/TodoList";
import Expenses from "./components/Expenses/Expenses";
import AddExpenseModal from "./components/AddExpenseModal/AddExpenseModal";

import ExpensesContext from "./store/expenses-context";

const App: React.FC = () => {
  const [year, setYear] = useState<number>(2022);
  const [month, setMonth] = useState<number>(2);
  const [isTodoList, setIsTodoList] = useState<boolean>(false);
  const [isExpenses, setIsExpenses] = useState<boolean>(false);
  const [isChart, setIsChart] = useState<boolean>(false);
  const [addExpense, setAddExpense] = useState(false);
  const [expenseIsChange, setExpenseIsChange] = useState<boolean>(false);

  const ctx = useContext(ExpensesContext);
  const expenses = ctx.expenses;

  const changeYearHandler = (year: number) => {
    setYear(year);
  };

  const changeMonthHandler = (month: number) => {
    setMonth(month);
  };

  const toggleTodoListHandler = (isToggle: boolean) => {
    if (isToggle) {
      setIsTodoList((prev) => !prev);
    } else {
      setTimeout(() => {
        setIsTodoList(false);
      }, 550);
    }
  };

  const ToggleAddExpenseHandler = () => {
    setAddExpense((prev) => !prev);
  };

  const toggleExpensesHandler = () => {
    setIsExpenses((prev) => !prev);
  };

  const toggleChartHandler = () => {
    setIsChart((prev) => !prev);
  };

  const checkExpenseChange = () => {
    setExpenseIsChange(true);
  };

  useEffect(() => {
    if (isExpenses) {
      setIsTodoList(false);
    } else {
      setIsChart(false);
    }
  }, [isExpenses]);

  useEffect(() => {
    if (expenseIsChange) {
      setExpenseIsChange(false);
    }
  }, [expenseIsChange]);

  return (
    <section>
      <SelectBar
        year={year}
        month={month}
        isTodo={isTodoList}
        isExpenses={isExpenses}
        changeYear={changeYearHandler}
        changeMonth={changeMonthHandler}
        toggleTodo={toggleTodoListHandler}
        toggleExpenses={toggleExpensesHandler}
        toggleChart={toggleChartHandler}
        toggleAddExpense={ToggleAddExpenseHandler}
      />
      {addExpense && (
        <AddExpenseModal
          year={year}
          month={month}
          toggleAdding={ToggleAddExpenseHandler}
        />
      )}
      {isExpenses && (
        <Expenses
          expenses={expenses}
          chart={isChart}
          year={year}
          month={month}
          setChange={checkExpenseChange}
        />
      )}
      {!isExpenses && !isTodoList && <Calendar year={year} month={month} />}
      {!isExpenses && isTodoList && <TodoList />}
    </section>
  );
};

export default App;
