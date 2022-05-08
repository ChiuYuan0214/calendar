import React from "react";

import ChartBox from "./ChartBox/ChartBox";

import styles from "./ChartContent.module.css";

interface Props {
  numList: number[];
  maxVal: number;
  sort: string;
  year: number;
  month: number;
};

const ChartContent: React.FC<Props> = ({ numList, maxVal, sort, year, month }) => {
  const contents = numList.map((num, index) => (
    <ChartBox
      key={index}
      index={index}
      sort={sort}
      colNum={numList.length}
      num={num}
      maxVal={maxVal}
      year={year}
      month={month}
    />
  ));

  return <div className={styles.board}>{contents}</div>;
};

export default ChartContent;
