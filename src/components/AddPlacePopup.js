import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({
  onAddPlace,
  isOpen,
  onClose
}) => {
  const [inputName, setInputName] = useState('');
  const [inputLink, setInputLink] = useState('');

  const [inputNameValid, setInputNameValid] = useState(true);
  const [inputLinkValid, setInputLinkValid] = useState(true);
  const [errorName, setErrorName] = useState();
  const [errorLink, setErrorLink] = useState();

  const handleChangeName = (e) => {
    setInputName(e.target.value)
    setErrorName(e.target.validationMessage)
    setInputNameValid(e.target.validity.valid)
  };

  const handleChangeLink = (e) => {
    setInputLink(e.target.value)
    setErrorLink(e.target.validationMessage)
    setInputLinkValid(e.target.validity.valid)
  };

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
        className={`popup__input popup__input_type_place-name 
        ${!inputNameValid
            ? 'popup__input_state_invalid'
            : ''
          }`}
        type={"text"}
        placeholder={"Название"}
        name={"popup-input-place-name"}
        minLength={"2"}
        maxLength={"30"}
        value={inputName}
        onChange={handleChangeName}
        required
      />
      <span id={"popup-input-place-name-error"} className={"popup__error"}>{errorName}</span>
      <input
        className={`popup__input popup__input_type_photo 
        ${!inputLinkValid
            ? 'popup__input_state_invalid'
            : ''
          }`}
        type={"url"} placeholder={"Ссылка на картинку"}
        name={"popup-input-url"}
        minLength={"7"}
        maxLength={"300"}
        value={inputLink}
        onChange={handleChangeLink}
        required
      />
      <span id={"popup-input-url-error"} className={"popup__error"}>{errorLink}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;