import React from 'react';
import { useState } from 'react';
import Modal from '../modal_windows/Modal';

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