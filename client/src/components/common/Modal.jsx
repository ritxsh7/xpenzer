import React from "react";
import styles from "./styles";

const Modal = ({ open, onToggle, text, onConfirm }) => {
  return (
    open && (
      <div className={styles.modal.wrapper} onClick={() => onToggle(false)}>
        <div
          className={styles.modal.content(open)}
          onClick={(e) => e.stopPropagation()}
        >
          <p className={styles.modal.text}>{text}</p>
          <div className={styles.modal.buttons}>
            <button className={styles.modal.button("blue")} onClick={onConfirm}>
              Confirm
            </button>
            <button
              className={styles.modal.button()}
              onClick={() => onToggle(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
