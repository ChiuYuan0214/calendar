import React from "react";

import { LevelObj, TagObj } from "../../../../models/TaskObj";
import { sortTaskByLevel } from "../../../../lib/tasks";

import TagInnerCard from "./TagInnerCard/TagInnerCard";

import styles from "./TagOuterCard.module.css";

const OuterCard: React.FC<{ tagBox: TagObj; expired: boolean }> = ({
  tagBox,
  expired,
}) => {
  const tag = tagBox.tag;
  const outputTag = tag
    .split("")
    .map((c, idx) => (idx === 0 ? c.toUpperCase() : c))
    .join("");

  const levelSortedTasks = sortTaskByLevel(tagBox.tasks);
  const contents = levelSortedTasks.map((levelBox: LevelObj) => (
    <TagInnerCard key={levelBox.level} levelBox={levelBox} expired={expired} />
  ));

  return (
    <section
      className={`${styles.card} ${expired ? styles.expired : styles[tag]}`}
    >
      <h3>Tag: {outputTag}</h3>
      <ul>{contents}</ul>
    </section>
  );
};

export default OuterCard;
