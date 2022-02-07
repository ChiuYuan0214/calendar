import React, { useState } from "react";

import SelectBar from "./components/SelectBar/SelectBar";
import Calendar from "./components/Calendar/Calendar";
import TodoList from "./components/TodoList/TodoList";

const App: React.FC = () => {
  const [year, setYear] = useState<number>(2022);
  const [month, setMonth] = useState<number>(2);
  const [isTodoList, setIsTodoList] = useState<boolean>(false);

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

  return (
    <section>
      <SelectBar
        year={year}
        month={month}
        isTodo={isTodoList}
        changeYear={changeYearHandler}
        changeMonth={changeMonthHandler}
        toggleTodo={toggleTodoListHandler}
      />
      {!isTodoList && <Calendar year={year} month={month} />}
      {isTodoList && <TodoList />}
    </section>
  );
};

export default App;
