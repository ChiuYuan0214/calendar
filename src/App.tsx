import React, { useState, useEffect, useContext } from "react";

import SelectBar from "./components/SelectBar/SelectBar";
import Calendar from "./components/Calendar/Calendar";
import TodoList from "./components/TodoList/TodoList";
import Expenses from "./components/Expenses/Expenses";
import AddExpenseModal from "./components/AddExpenseModal/AddExpenseModal";

import ExpensesContext from "./store/expenses-context";

import styles from "./App.module.css";

const App: React.FC = () => {
  // selected date.
  const [year, setYear] = useState<number>(2022);
  const [month, setMonth] = useState<number>(2);

  // state logic below really need to be enhanced....
  // todoList tab.
  const [isTodoList, setIsTodoList] = useState<boolean>(false);

  // expenses page.
  const [isExpenses, setIsExpenses] = useState<boolean>(false);

  // Chart tab of expenses page.
  const [isChart, setIsChart] = useState<boolean>(false);
  const [addExpense, setAddExpense] = useState(false);
  const [expenseIsChange, setExpenseIsChange] = useState<boolean>(false);

  const { expenses } = useContext(ExpensesContext);

  const changeYearHandler = (year: number) => {
    setYear(year);
  };

  const changeMonthHandler = (month: number) => {
    setMonth(month);
  };

  // close the todolist after clicking for 550ms delay.
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

  // toggle between expenses page and calendar page.
  const toggleExpensesHandler = () => {
    setIsExpenses((prev) => !prev);
  };

  const toggleChartHandler = () => {
    setIsChart((prev) => !prev);
  };

  const checkExpenseChange = () => {
    setExpenseIsChange(true);
  };

  // if is on expenses page, turn the todo-list to unshown.
  // if is on calendar page, turn the chart to unshown.
  useEffect(() => {
    if (isExpenses) {
      setIsTodoList(false);
    } else {
      setIsChart(false);
    }
  }, [isExpenses]);

  // auto reset change state.
  useEffect(() => {
    if (expenseIsChange) {
      setExpenseIsChange(false);
    }
  }, [expenseIsChange]);

  return (
    <section className={styles.container}>
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
