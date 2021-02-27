import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({
  onAddPlace,
  isOpen,
  onClose
}) => {
  const [inputName, setInputName] = useState('');
  const [inputLink, setInputLink] = useState('');

  const handleChangeName = (e) => setInputName(e.target.value);
  const handleChangeLink = (e) => setInputLink(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name: inputName,
      link: inputLink
    });

    setInputName('');
    setInputLink('');
  }

  return (
    <PopupWithForm
      name={"popup-add-card"}
      title={"Новое место"}
      textButton={"Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className={"popup__input popup__input_type_place-name"}
        type={"text"}
        placeholder={"Название"}
        name={"popup-input-place-name"}
        minLength={"2"}
        maxLength={"30"}
        value={inputName}
        onChange={handleChangeName}
        required
      />
      <span id={"popup-input-place-name-error"} className={"popup__error"}></span>
      <input
        className={"popup__input popup__input_type_photo"}
        type={"url"} placeholder={"Ссылка на картинку"}
        name={"popup-input-url"}
        minLength={"7"}
        maxLength={"300"}
        value={inputLink}
        onChange={handleChangeLink}
        required
      />
      <span id={"popup-input-url-error"} className={"popup__error"}></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;