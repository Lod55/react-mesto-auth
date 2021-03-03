import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = (props) => {
  // Диструктуризированная переменная с пропсами
  const {
    onUpdateAvatar,
    isOpen,
    onClose
  } = props;

  // Дефолтное значение инпутов
  const initialData = {
    avatar: ''
  };

  // Дефолтное значение валидации
  const initialInputsValid = {
    avatar: false,
    form: false
  }

  // Дефолтное значение ошибок валидации и сабмита
  const initialErrorsValid = {
    avatar: ''
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
    if (!validations.avatar) {
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

    onUpdateAvatar(data)
    resetForm();
  }

  return (
    <PopupWithForm
      name="add-avatar"
      title="Обновить аватар"
      textButton="Обновить"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      validationForm={validations.form}
    >
      <input
        className={`popup__input popup__input_type_photo 
        ${!validations.avatar
            ? ('popup__input_state_invalid')
            : ('')
          }`}
        type="url"
        placeholder="Ссылка на аватар"
        name='avatar'
        id="popup-input-url-avatar"
        onChange={handleChange}
        minLength="7"
        maxLength="300"
        value={data.avatar}
        required
      />
      <span
        id="popup-input-url-avatar-error"
        className="popup__error">
        {errorsValid.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

