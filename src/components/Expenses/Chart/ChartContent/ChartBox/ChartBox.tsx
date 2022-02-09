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
    scale.push(<div key={i}></div>);
  }

  const sideBar = <div className={styles.sidebar}>{scale}</div>;
  const fillHeight = num ? `${(num / maxVal) * 100}%` : 0;
  const fillOpacity = `${num / maxVal}`;

  // useEffect(() => {
  //   let timer: ReturnType<typeof setTimeout> | null = null;
  //   if (isStart) {
  //     setIsStart(false);
  //     setIsFill(false);
  //   }
  //   if (year && month && sort) {
  //     timer = setTimeout(() => {
  //       setIsStart(true);
  //     }, index * 30);
  //   }
  //   return () => {
  //     if (timer) {
  //       clearTimeout(timer);
  //     }
  //   };
  // }, [year, month, sort, index]);

  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setIsStart(true);
    }, index * 30);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [index]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (isStart) {
      timer = setTimeout(() => {
        setIsFill(true);
      }, 10);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isStart]);

  return (
    <div className={styles.box} style={{ width: `${100 / colNum}%` }}>
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
