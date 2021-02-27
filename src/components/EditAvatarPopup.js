import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({
  onUpdateAvatar,
  isOpen,
  onClose
}) => {
  const [inputValue, setInputValue] = useState('');

  const [inputValid, setInputValid] = useState(true);
  const [error, setError] = useState();


  const handleChangeAvatar = (e) => {
    setInputValue(e.target.value);
    setError(e.target.validationMessage);
    setInputValid(e.target.validity.valid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({ avatar: inputValue });
    setInputValue('');
  }

  return (
    <PopupWithForm
      name={"popup-add-avatar"}
      title={"Обновить аватар"}
      textButton={"Обновить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className={`popup__input popup__input_type_photo 
        ${!inputValid
            ? 'popup__input_state_invalid'
            : ''
          }`}
        type={"url"}
        placeholder={"Ссылка на аватар"}
        name={"popup-input-url-avatar"}
        onChange={handleChangeAvatar}
        minLength={"7"}
        maxLength={"300"}
        value={inputValue}
        required
      />

      <span id={"popup-input-url-avatar-error"} className={"popup__error"}>{error}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

