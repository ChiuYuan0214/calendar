import React from "react";


import styles from './StringReducer.module.css';

const StringReducer: React.FC<{ string: string }> = ({ string }) => {
  let stringArr = string.split("");
  if (stringArr.length > 20) {
    stringArr = stringArr.splice(0, 15);
    stringArr = stringArr.concat("...".split(""));
  }

  const content = stringArr.map((char, index) => (
    <span key={index} className={styles.fadeIn} style={{animationDelay: `${50 * index}ms`}}>{char}</span>
  ));

  return <>{content}</>;
};

export default StringReducer;
