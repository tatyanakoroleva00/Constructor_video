import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import styles from '../css/Modal.module.css';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles['modal-overlay']}>
      <div className={styles['modal']}>
        <h2>Переход к списку проектов</h2>
        <p>Несохраненные данные будут потеряны. Вы готовы перейти?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Да</button>
          <button onClick={onClose}>Нет, остаться</button>
        </div>
      </div>
    </div>,
    document.body
  );
};


const InitialData = ({ setInitialForm, initialForm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const confirmModal = () => {
    window.location.reload();
  };

  return (
    <>
      {initialForm && <div>
        <button onClick={openModal} >К списку проектов</button>
        <Modal isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmModal} />
      </div>}
      <div>
        <button onClick={() => { setInitialForm(!initialForm); }}>{initialForm ? 'Вперед' : 'Назад'}</button>
      </div>
    </>
  )
}

export default InitialData