import React from 'react';
import PopupWithForm from './PopupWithForm';

const RemovePlacePopup = (props) => {
  let {
    onDeleteCard,
    isOpen,
    onClose
  } = props;

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