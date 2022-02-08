import React from "react";

import styles from "./ChartScale.module.css";

const ChartScale: React.FC<{ maxVal: number }> = ({ maxVal }) => {
  const valueList: number[] = [];
  const partion = Math.floor(maxVal / 10);

  console.log("maxVal:", maxVal);
  console.log("partion:", partion);

  let counter = partion;
  while (counter < maxVal) {
    valueList.push(counter);
    counter += partion;
  }
  valueList.push(maxVal);

  const scaleColumn = valueList.reverse().map((val) => <li>{val ? val : ""}</li>);

  return <ul className={styles.scale}>{scaleColumn}</ul>;
};

export default ChartScale;
