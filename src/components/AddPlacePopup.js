import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = (props) => {
  // Диструктуризированная переменная с пропсами
  const {
    onAddPlace,
    isOpen,
    onClose
  } = props;

  // Дефолтное значение инпутов
  const initialData = {
    name: '',
    link: ''
  };

  // Дефолтное значение валидации
  const initialInputsValid = {
    name: false,
    link: false,
    form: false
  }

  // Дефолтное значение ошибок валидации и сабмита
  const initialErrorsValid = {
    name: '',
    link: ''
  }

  // Стейты компонента
  const [data, setData] = useState(initialData);
  const [validations, setValidations] = useState(initialInputsValid);
  const [errorsValid, setErrorsValid] = useState(initialErrorsValid);

  // Функции компонента
  // --Проверка валидности формы 
  // --Проверка валидности инпуты
  // --Ресет формы 
  // --Закрытие формы
  // --Сабмит формы 
  const checkFormValid = () => {
    if (!validations.name || !validations.link) {
      return setValidations((data) => ({
        ...data,
        form: false
      }))
    } else {
      return setValidations((data) => ({
        ...data,
        form: true
      }))
    }
  }

  const handleChange = (e) => {
    const { name, value, validity, validationMessage } = e.target;

    checkFormValid();

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

  const resetForm = () => {
    setData(initialData);
    setValidations(initialInputsValid);
    setErrorsValid(initialErrorsValid);
  }

  const handleClose = () => {
    onClose()
    resetForm()
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace(data)
    resetForm()
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      textButton="Создать"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      validationForm={validations.form}
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
      <span
        id="popup-input-place-name-error"
        className="popup__error">
        {errorsValid.name}
      </span>

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
      <span
        id="popup-input-url-error"
        className="popup__error">
        {errorsValid.link}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;