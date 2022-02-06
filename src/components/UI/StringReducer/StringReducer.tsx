import React, { useState, useEffect } from "react";

import styles from "./StringReducer.module.css";

let initial = true;

const StringReducer: React.FC<{
  string: string;
  enlarge: boolean;
}> = ({ string, enlarge = false }) => {
  const [fadeIndex, setFadeIndex] = useState(0);

  let stringArr = string.split("");

  if (enlarge && stringArr.length > 60) {
    stringArr = stringArr.splice(0, 55);
    stringArr = stringArr.concat("...".split(""));
  }
  if (!enlarge && stringArr.length > 20) {
    stringArr = stringArr.splice(0, 15);
    stringArr = stringArr.concat("...".split(""));
  }

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    if (enlarge) {
      setFadeIndex(15);
    } else {
      setFadeIndex(0);
    }
  }, [enlarge]);

  const content = stringArr.map((char, index) => (
    <span
      key={index}
      className={styles.fadeIn}
      style={
        index >= fadeIndex
          ? { animationDelay: `${30 * (index - fadeIndex)}ms` }
          : {}
      }
    >
      {char}
    </span>
  ));

  return <>{content}</>;
};

export default StringReducer;
