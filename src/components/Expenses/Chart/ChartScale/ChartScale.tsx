import React from "react";

import styles from "./ChartScale.module.css";

const ChartScale: React.FC<{ maxVal: number }> = ({ maxVal }) => {
  const valueList: number[] = [];
  const partion = Math.floor(maxVal / 10);

  if (maxVal > 0) {
    let counter = partion;
    while (counter <= maxVal) {
      valueList.push(counter);
      counter += partion;
    }
  } else {
    valueList.push(0);
  }

  const scaleColumn = valueList
    .reverse()
    .map((val, idx) => <li key={idx}>{val ? val : ""}</li>);

  return <ul className={styles.scale}>{scaleColumn}</ul>;
};

export default ChartScale;
