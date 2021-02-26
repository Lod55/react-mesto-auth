import React from 'react';
import PopupWithForm from './PopupWithForm';

function RemovePlacePopup({ onDeleteCard, isOpen, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      name={"popup-remove-card"}
      title={"Вы уверены?"}
      textButton={"Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />

  );
}

export default RemovePlacePopup;