import React from 'react';

import styles from './BackDrop.module.css';


const BackDrop: React.FC<{onClick: () => void}> = ({onClick}) => {
  return <div className={styles.backdrop} onClick={onClick}></div>;
};

export default BackDrop;
