import React, { ChangeEvent } from "react";

import styles from "./SortBar.module.css";

interface Props {
  setSort: (option: string) => void;
  sort: string;
}

const SortBar: React.FC<Props> = ({ setSort, sort }) => {
  const selectChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
  };

  return (
    <div className={styles.bar}>
      <select defaultValue={sort} onChange={selectChangeHandler}>
        <option value="SORT_DAY">Sort by day</option>
        <option value="SORT_MONTH">Sort by month</option>
        <option value="SORT_YEAR">Sort by year</option>
      </select>
    </div>
  );
};

export default SortBar;
