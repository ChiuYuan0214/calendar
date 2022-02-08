import React, { useState, useEffect } from "react";

import styles from "./ChartBox.module.css";

const ChartBox: React.FC<{
  index: number;
  num: number;
  maxVal: number;
  sort: string;
  year: number;
  month: number;
  colNum: number;
}> = ({ index, num, maxVal, sort, year, month, colNum }) => {
  const [isStart, setIsStart] = useState(false);
  const [isFill, setIsFill] = useState(false);

  const scale = [];
  for (let i = 0; i < 10; i++) {
    scale.push(<div></div>);
  }

  const sideBar = <div className={styles.sidebar}>{scale}</div>;
  const fillHeight = `${(num / maxVal) * 100}%`;
  const fillOpacity = `${num / maxVal}`;

  useEffect(() => {
    if (isStart) {
      setIsStart(false);
    }
    if (year && month && sort) {
      setTimeout(() => {
        setIsStart(true);
      }, index * 50);
    }
  }, [year, month, sort]);

  useEffect(() => {
    if (isStart) {
      setTimeout(() => {
        setIsFill(true);
      }, 50);
    } else {
      setIsFill(false);
    }
  }, [isStart]);

  return (
    <div className={styles.box} style={{width: `${100 / colNum}%`}}>
      {sideBar}
      <div className={styles.bar}>
        <div
          className={isStart ? styles.fill : ""}
          style={{ height: isFill ? fillHeight : 0, opacity: fillOpacity }}
        ></div>
      </div>
      {sideBar}
    </div>
  );
};

export default ChartBox;
