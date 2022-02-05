import React from "react";
import ReactDOM from "react-dom";

import MemoForm from "./MemoForm/MemoForm";

import styles from "./MemoModal.module.css";

const MemoModal: React.FC<{
  onClick: () => void;
  year: number;
  month: number;
}> = ({ onClick, year, month }) => {
  const BackDrop: React.FC = () => {
    return <div className={styles.backdrop} onClick={onClick}></div>;
  };

  let portal: Element | null = document.getElementById("modal-root");
  if (portal) {
    return (
      <>
        {ReactDOM.createPortal(<BackDrop />, portal)}
        {ReactDOM.createPortal(
          <MemoForm onClose={onClick} year={year} month={month} />,
          portal
        )}
      </>
    );
  } else {
    return null;
  }
};

export default MemoModal;
