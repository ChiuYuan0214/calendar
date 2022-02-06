import React from "react";
import ReactDOM from "react-dom";

import MemoForm from "./MemoForm/MemoForm";
import BackDrop from "../UI/StringReducer/BackDrop/BackDrop";

const MemoModal: React.FC<{
  onClick: () => void;
  year: number;
  month: number;
}> = ({ onClick, year, month }) => {

  let portal: Element | null = document.getElementById("modal-root");
  if (portal) {
    return (
      <>
        {ReactDOM.createPortal(<BackDrop onClick={onClick} />, portal)}
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
