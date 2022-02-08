import React from "react";
import ReactDOM from 'react-dom';

import BackDrop from "../UI/BackDrop/BackDrop";

import styles from "./AddExpenseModal.module.css";

const AddExpenseModal: React.FC<{ toggleAdding: () => void }> = ({
  toggleAdding,
}) => {
    const AddExpenseModal: React.FC = () => {
        return (
          <section className={styles.modal}>
            <h1>This is Adding Modal!</h1>
            <div className={styles.actions}>
                <button onClick={toggleAdding}>Close</button>
                <button>Delete</button>
            </div>
          </section>
        );
    };

    const portal = document.getElementById('modal-root');

  return (
    <>
      {portal && ReactDOM.createPortal(<BackDrop onClick={toggleAdding} />, portal)}
      {portal && ReactDOM.createPortal(<AddExpenseModal />, portal)}
    </>
  );
};

export default AddExpenseModal;
