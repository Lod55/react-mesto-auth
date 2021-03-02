import React from 'react';
import PopupWithForm from './PopupWithForm';

const RemovePlacePopup = (props) => {
  // Диструктуризированная переменная с пропсами
  let {
    onDeleteCard,
    isOpen,
    onClose
  } = props;

  // функция отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      name="popup-remove-card"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <form
        className="popup__form"
        name="popup-remove-card"
        id="popup-remove-card"
        onSubmit={handleSubmit}
      >
        <button
          className="button popup__button-submit"
          type="submit">
          Да
        </button>
      </form>
    </PopupWithForm>
  );
}

export default RemovePlacePopup;