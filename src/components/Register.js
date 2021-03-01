import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const initialData = {
    email: '',
    password: '',
    confirmation: ''
  };

  const initialInputsValid = {
    email: false,
    password: false,
    confirmation: false,
    form: false
  }

  const initialErrorsValid = {
    email: '',
    password: '',
    confirmation: '',
    submit: ''
  }

  const [data, setData] = useState(initialData);
  const [validations, setValidations] = useState(initialInputsValid);
  const [errorsValid, setErrorsValid] = useState(initialErrorsValid);
  const history = useHistory();

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

    // Проверяем валидность инпутов для кнопки
    if (!validations.email || !validations.password || !validations.confirmation) {
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

    // Проверяем совпадение паролей
    if (data.password !== data.confirmation) {
      setValidations((data) => ({
        ...data,
        password: false,
        confirmation: false
      }));
      setData((data) => ({
        ...data,
        password: '',
        confirmation: ''
      }));
      setErrorsValid((data) => ({
        ...data,
        password: 'Пароли не совпадают',
        confirmation: 'Пароли не совпадают'
      }));
      return;
    }

    onRegister(data)
      .then(resetForm)
      .then(() => history.push('/sign-in'))
      .catch(err => {
        setErrorsValid((data) => ({
          ...data,
          submit: err.message || 'Что то пошло не так'
        }));
      })
  }

  return (
    <main className="register content page__content">
      <div className="register__container">
        <h2 className="register__title">Регистрация</h2>
        <form
          className="register__form"
          name="form"
          id="form-with-register"
          onSubmit={handleSubmit}>

          <input
            className={`register__input register__input_type_email
        ${!validations.email
                ? 'register__input_state_invalid'
                : ''
              }`}
            type="email"
            placeholder="Email"
            name="email"
            id="register-input-email"
            maxLength="100"
            value={data.email}
            onChange={handleChange}
            required
          />
          <span
            id="register-input-email-error"
            className="register__error">
            {errorsValid.email}
          </span>

          <input
            className={`register__input register__input_type_password
        ${!validations.password
                ? 'register__input_state_invalid'
                : ''
              }`}
            type="password"
            placeholder="Пароль"
            name="password"
            id="register-input-password"
            minLength="6"
            maxLength="50"
            value={data.password}
            onChange={handleChange}
            required
          />
          <span
            id="register-input-password-error"
            className="register__error">
            {errorsValid.password}
          </span>

          <input
            className={`register__input register__input_type_confirm-password
        ${!validations.confirmation
                ? 'register__input_state_invalid'
                : ''
              }`}
            type="password"
            placeholder="Подтвердите пароль"
            name="confirmation"
            id="register-input-confirm-password"
            maxLength="50"
            value={data.confirmation}
            onChange={handleChange}
            required
          />
          <span
            id="register-input-confirm-password-error"
            className="register__error">
            {errorsValid.confirmation}
          </span>

          <button
            className={`button register__button-submit 
            ${!validations.form
                ? 'register__button-submit_invalid'
                : ''
              }`}
            type="submit">
            Зарегистрироваться
          </button>
        </form>
        <div className="register__signin">
          <p>Уже зарегистрированы? <Link to="/sign-in" className="register__login-link">Войти</Link></p>
        </div>
      </div>
    </main>
  );
}

export default Register;