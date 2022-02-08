import React from "react";

import { Expense } from "../../../models/Expense";

import styles from "./Chart.module.css";

const Chart: React.FC<{ sort: string; expenses: Expense[] }> = ({
  sort,
  expenses,
}) => {
  return (
    <section>
      <h1>This is Chart!</h1>
    </section>
  );
};

export default Chart;
