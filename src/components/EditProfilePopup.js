import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

const EditProfilePopup = ({
  onUpdateUser,
  isOpen,
  onClose
}) => {
  const currentUser = useContext(CurrentUserContext);

  const [inputName, setInputName] = useState(currentUser.name);
  const [inputAbout, setInputAbout] = useState(currentUser.about);

  const handleChangeName = (e) => setInputName(e.target.value);
  const handleChangeAbout = (e) => setInputAbout(e.target.value);

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
      name={"popup-profile"}
      title={"Редактировать профиль"}
      textButton={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className={"popup__input popup__input_type_author"}
        type={"text"}
        placeholder={"Ваше имя"}
        name={"popup-input-name"}
        minLength={"2"}
        maxLength={"40"}
        value={inputName}
        onChange={handleChangeName}
        required
      />
      <span id={"popup-input-name-error"} className={"popup__error"}></span>
      <input
        className={"popup__input popup__input_type_status"}
        type={"text"}
        placeholder={"Расскажите о себе"}
        name={"popup-input-status"}
        minLength={"2"}
        maxLength={"200"}
        value={inputAbout}
        onChange={handleChangeAbout}
        required
      />
      <span id={"popup-input-status-error"} className={"popup__error"}></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
