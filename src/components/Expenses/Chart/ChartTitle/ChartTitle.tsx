import React from "react";

import styles from "./ChartTitle.module.css";

const ChartTitle: React.FC<{ sort: string; year: number; barNum: number }> = ({
  year,
  sort,
  barNum,
}) => {
  let titleList = [];
  if (sort === "SORT_YEAR") {
    let curYear = year - 3;
    while (curYear <= year + 3) {
      titleList.push(curYear);
      curYear++;
    }
  } else {
    for (let i = 1; i <= barNum; i++) {
      titleList.push(i);
    }
  }

  const titleStyle = {width: `${100 / barNum}%`};

  const list = titleList.map((title,idx) => <li key={idx} style={titleStyle}>{title}</li>);

  return <ul className={styles.list}>{list}</ul>;
};

export default ChartTitle;
