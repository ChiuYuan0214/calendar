import React, { useState } from "react";

import SelectBar from './components/SelectBar/SelectBar';
import Calendar from "./components/Calendar/Calendar";

const App: React.FC = () => {
  const [year, setYear] = useState<number>(2022);
  const [month, setMonth] = useState<number>(2);

  const changeYearHandler = (year: number) => {
    setYear(year);
  };

  const changeMonthHandler = (month: number) => {
    setMonth(month);
  };

  return (
    <section>
      <SelectBar
        changeYear={changeYearHandler}
        changeMonth={changeMonthHandler}
        year={year}
        month={month}
      />
      <Calendar year={year} month={month} />
    </section>
  );
};

export default App;
