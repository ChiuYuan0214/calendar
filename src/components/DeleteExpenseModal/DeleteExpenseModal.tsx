import React, { useContext } from "react";
import ReactDOM from "react-dom";

import ExpensesContext from "../../store/expenses-context";
import BackDrop from "../UI/BackDrop/BackDrop";

import styles from "./DeleteExpenseModal.module.css";

const DeleteExpenseModal: React.FC<{ onClick: () => void; id: string; setChange: () => void }> = ({
  onClick,
  id,
  setChange
}) => {
  const ctx = useContext(ExpensesContext);
  const portal = document.getElementById("modal-root");

  const cancelHandler = () => {
    ctx.removeExpense(id);
    setChange();
    onClick();
  };
  const ConfirmModal: React.FC = () => {
    return (
      <section className={styles.modal}>
        <div className={styles.message}>
          <h3>Are you sure you want to delete this expense?</h3>
        </div>
        <div className={styles.actions}>
          <button onClick={onClick}>No</button>
          <button onClick={cancelHandler}>Yes</button>
        </div>
      </section>
    );
  };
  return (
    <>
      {portal && ReactDOM.createPortal(<BackDrop onClick={onClick} />, portal)}
      {portal && ReactDOM.createPortal(<ConfirmModal />, portal)}
    </>
  );
};

export default DeleteExpenseModal;
