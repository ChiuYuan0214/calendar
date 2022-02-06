import React from "react";
import ReactDOM from "react-dom";

import MemoForm from "./MemoForm/MemoForm";
import BackDrop from "../UI/BackDrop/BackDrop";

const MemoModal: React.FC<{
  onClick: () => void;
  year: number;
  month: number;
  date: number;
}> = ({ onClick, year, month, date }) => {

  let portal: Element | null = document.getElementById("modal-root");
  if (portal) {
    return (
      <>
        {ReactDOM.createPortal(<BackDrop onClick={onClick} />, portal)}
        {ReactDOM.createPortal(
          <MemoForm onClose={onClick} year={year} month={month} date={date} />,
          portal
        )}
      </>
    );
  } else {
    return null;
  }
};

export default MemoModal;
