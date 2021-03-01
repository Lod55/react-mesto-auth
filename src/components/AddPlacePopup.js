import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = (props) => {
  let {
    onAddPlace,
    isOpen,
    onClose
  } = props;

  const initialData = {
    name: '',
    link: ''
  };

  const initialInputsValid = {
    name: false,
    link: false,
  }

  const initialErrorsValid = {
    name: '',
    link: '',
    submit: ''
  }

  const [data, setData] = useState(initialData);
  const [validations, setValidations] = useState(initialInputsValid);
  const [errorsValid, setErrorsValid] = useState(initialErrorsValid);

  const handleChange = (e) => {
    let { name, value, validity, validationMessage } = e.target;

    setData(data => ({
      ...data,
      [name]: value,
    }));

    setValidations(data => ({
      ...data,
      [name]: validity.valid,
    }));

    setErrorsValid(data => ({
      ...data,
      [name]: validationMessage,
    }));
  }

  const checkFalid = () => {
    if (!validations.name || !validations.link) {
      setValidations(data => ({
        ...data,
        form: false,
      }));
    } else {
      setValidations(data => ({
        ...data,
        form: true,
      }));
    }
  }

  const resetForm = () => {
    setData(initialData);
    setValidations(initialInputsValid);
    setErrorsValid(initialErrorsValid);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name: data.name,
      link: data.link
    })
    resetForm()
  }

  return (
    <PopupWithForm
      name="popup-add-card"
      title="Новое место"
      textButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validForm={validations.form}
    >
      <input
        className={`popup__input popup__input_type_place-name 
        ${!validations.name
            ? ('popup__input_state_invalid')
            : ('')
          }`}
        type="text"
        placeholder="Название"
        name="name"
        id="popup-input-place-name"
        minLength="2"
        maxLength="30"
        value={data.name}
        onChange={handleChange}
        required
      />
      <span id="popup-input-place-name-error" className="popup__error">{errorsValid.name}</span>
      <input
        className={`popup__input popup__input_type_photo 
        ${!validations.link
            ? ('popup__input_state_invalid')
            : ('')
          }`}
        type="url"
        placeholder="Ссылка на картинку"
        id="popup-input-url"
        name="link"
        minLength="7"
        maxLength="300"
        value={data.link}
        onChange={handleChange}
        required
      />
      <span id="popup-input-url-error" className="popup__error">{errorsValid.link}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;