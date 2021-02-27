import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

const EditProfilePopup = (props) => {
  let {
    onUpdateUser,
    isOpen,
    onClose
  } = props;

  const currentUser = useContext(CurrentUserContext);

  const [inputName, setInputName] = useState(currentUser.name);
  const [inputAbout, setInputAbout] = useState(currentUser.about);
  const [inputNameValid, setInputNameValid] = useState(true);
  const [inputAboutValid, setInputAboutValid] = useState(true);
  const [errorName, setErrorName] = useState();
  const [errorAbout, setErrorAbout] = useState();

  const handleChangeName = (e) => {
    setInputName(e.target.value)
    setErrorName(e.target.validationMessage)
    setInputNameValid(e.target.validity.valid)
  };

  const handleChangeAbout = (e) => {
    setInputAbout(e.target.value)
    setErrorAbout(e.target.validationMessage)
    setInputAboutValid(e.target.validity.valid)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name: inputName,
      about: inputAbout
    });
  }

  useEffect(() => {
    setInputName(currentUser.name);
    setInputAbout(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="popup-profile"
      title="Редактировать профиль"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validForm={false}
    >
      <input
        className={`popup__input popup__input_type_author 
        ${!inputNameValid
            ? 'popup__input_state_invalid'
            : ''
          }`}
        type="text"
        placeholder="Ваше имя"
        name="popup-input-name"
        minLength="2"
        maxLength="40"
        value={inputName}
        onChange={handleChangeName}
        required
      />
      <span id="popup-input-name-error" className="popup__error">{errorName}</span>
      <input
        className={`popup__input popup__input_type_status 
        ${!inputAboutValid
            ? 'popup__input_state_invalid'
            : ''
          }`}
        type="text"
        placeholder="Расскажите о себе"
        name="popup-input-status"
        minLength="2"
        maxLength="200"
        value={inputAbout}
        onChange={handleChangeAbout}
        required
      />
      <span id="popup-input-status-error" className="popup__error">{errorAbout}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
