import React, { useState } from "react";

import SortLink from "./SortLink/SortLink";
import TimeList from "./TimeList/TimeList";
import LevelList from "./LevelList/LevelList";
import TagList from "./TagList/TagList";

import styles from "./TodoList.module.css";

const TIME_SORT = "TIME_SORT";
const LEVEL_SORT = "LEVEL_SORT";
const TAG_SORT = "TAG_SORT";

const TodoList: React.FC = () => {
  const [sort, setSort] = useState(TIME_SORT);

  const setSortHandler = (tag: string) => {
    setSort(tag);
  };

  return (
    <section className={styles.container}>
      <ul>
        <SortLink
          title="Time Limit"
          tag={TIME_SORT}
          sort={sort}
          setSort={setSortHandler}
        />
        <SortLink
          title="Priority"
          tag={LEVEL_SORT}
          sort={sort}
          setSort={setSortHandler}
        />
        <SortLink
          title="Tags"
          tag={TAG_SORT}
          sort={sort}
          setSort={setSortHandler}
        />
      </ul>
      <section className={styles.board}>
        {sort === TIME_SORT && <TimeList />}
        {sort === LEVEL_SORT && <LevelList />}
        {sort === TAG_SORT && <TagList />}
      </section>
    </section>
  );
};

export default TodoList;
