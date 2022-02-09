import React from "react";

import { LevelObj, TagObj } from "../../../../models/TaskObj";
import { sortTaskByTag } from "../../../../lib/tasks";
import { levelList } from "../../../../lib/option";

import LevelInnerCard from "./LevelInnerCard/LevelInnerCard";

import styles from "./LevelOuterCard.module.css";

const OuterCard: React.FC<{ levelBox: LevelObj; expired: boolean }> = ({
  levelBox,
  expired,
}) => {
  const level = levelBox.level;
  const outputLevel = levelList[+level - 1];
  const tagSortedTasks = sortTaskByTag(levelBox.tasks);
  const contents = tagSortedTasks.map((tagBox: TagObj) => (
    <LevelInnerCard key={tagBox.tag} tagBox={tagBox} expired={expired} />
  ));

  const style = expired
    ? {}
    : { backgroundColor: `rgb(${180 - level * 20}, 8, ${80 - level * 10})` };

  return (
    <section
      className={`${styles.card} ${expired ? styles.expired : ""}`}
      style={style}
    >
      <h3>Level: {outputLevel}</h3>
      <ul>{contents}</ul>
    </section>
  );
};

export default OuterCard;
