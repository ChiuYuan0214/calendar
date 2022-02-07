import React from "react";

import styles from "./SortLink.module.css";

const SortLink: React.FC<{
  title: string;
  tag: string;
  sort: string;
  setSort: (tag: string) => void;
}> = ({ title, tag, sort, setSort }) => {
  const isSort = sort === tag;
  const classes = `${isSort ? styles.active : ""} ${styles.tag}`;

  return (
    <li onClick={() => setSort(tag)} className={classes}>
      {title}
    </li>
  );
};

export default SortLink;
