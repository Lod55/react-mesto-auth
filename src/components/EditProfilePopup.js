import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

const EditProfilePopup = (props) => {
  // Диструктуризированная переменная с пропсами
  let {
    onUpdateUser,
    isOpen,
    onClose
  } = props;

  // Контекст с данными о пользователе
  const currentUser = useContext(CurrentUserContext);

  // Дефолтное значение инпутов
  const initialData = {
    author: currentUser.name || '',
    about: currentUser.about || ''
  };

  // Дефолтное значение валидации
  const initialInputsValid = {
    author: false,
    about: false,
    form: true
  }

  // Дефолтное значение ошибок валидации и сабмита
  const initialErrorsValid = {
    author: '',
    about: ''
  }

  // Стейты компонента
  const [data, setData] = useState(initialData);
  const [validations, setValidations] = useState(initialInputsValid);
  const [errorsValid, setErrorsValid] = useState(initialErrorsValid);

  // --Хук Юз Эффект для отображения актуальных данных о пользователе
  useEffect(() => {
    setData(data => ({
      author: currentUser.name || '',
      about: currentUser.about || ''
    }));
  }, [currentUser]);

  // Функции компонента
  // --Проверка валидности формы 
  // --Проверка валидности инпуты
  // --Ресет формы 
  // --Закрытие формы
  // --Сабмит формы
  const checkFormValid = () => {
    if (!validations.author || !validations.about) {
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
    let { name, value, validity, validationMessage } = e.target;

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

    onUpdateUser(data)
    resetForm()
  }

  return (
    <PopupWithForm
      name="popup-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={handleClose}
    >
      <form
        className="popup__form"
        name="popup-edit-profile"
        id="popup-edit-profile"
        onSubmit={handleSubmit}
      >
        <input
          className={`popup__input popup__input_type_author 
        ${!validations.author
              ? 'popup__input_state_invalid'
              : ''
            }`}
          type="text"
          placeholder="Ваше имя"
          id="popup-input-name"
          name='author'
          minLength="2"
          maxLength="40"
          value={data.author}
          onChange={handleChange}
          required
        />
        <span
          id="popup-input-name-error"
          className="popup__error">
          {errorsValid.author}
        </span>

        <input
          className={`popup__input popup__input_type_status 
        ${!validations.about
              ? 'popup__input_state_invalid'
              : ''
            }`}
          type="text"
          placeholder="Расскажите о себе"
          id="popup-input-status"
          name='about'
          minLength="2"
          maxLength="200"
          value={data.about}
          onChange={handleChange}
          required
        />
        <span
          id="popup-input-status-error"
          className="popup__error">
          {errorsValid.about}
        </span>

        <button
          className={`button popup__button-submit 
          ${!validations.form
              ? 'popup__button-submit_invalid'
              : ''
            }`}
          type="submit">
          Сохранить
        </button>
      </form>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
