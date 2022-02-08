import React, { useState, useEffect } from "react";

import SelectBar from "./components/SelectBar/SelectBar";
import Calendar from "./components/Calendar/Calendar";
import TodoList from "./components/TodoList/TodoList";
import Expenses from "./components/Expenses/Expenses";

const App: React.FC = () => {
  const [year, setYear] = useState<number>(2022);
  const [month, setMonth] = useState<number>(2);
  const [isTodoList, setIsTodoList] = useState<boolean>(false);
  const [isExpenses, setIsExpenses] = useState<boolean>(false);
  const [isChart, setIsChart] = useState<boolean>(false);

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

  const toggleExpensesHandler = () => {
    setIsExpenses((prev) => !prev);
  };

  const toggleChartHandler = () => {
    setIsChart(prev => !prev);
  };

  useEffect(() => {
    if (isExpenses) {
      setIsTodoList(false);
    }
  }, [isExpenses]);

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
      />
      {isExpenses && <Expenses chart={isChart} year={year} month={month} />}
      {!isExpenses && !isTodoList && <Calendar year={year} month={month} />}
      {!isExpenses && isTodoList && <TodoList />}
    </section>
  );
};

export default App;
