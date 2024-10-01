import React from "react";
import styles from '../css/Modal.module.css';
export default function Modal ({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;
  
    return(
      <div className={styles['modal-overlay']}>
        <div className={styles['modal']}>
          <h2>Переход к списку проектов</h2>
          <p>Несохраненные данные будут потеряны. Вы готовы перейти?</p>
          <div className={styles['modal-buttons']}>
            <button onClick={onConfirm}>Да</button>
            <button onClick={onClose}>Нет, остаться</button>
          </div>
        </div>
      </div>
    );
  };