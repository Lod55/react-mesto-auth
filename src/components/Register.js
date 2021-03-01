import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Register = () => {
  const initialData = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  // const [data, setData] = useState(initialData);
  // const [message, setMessage] = useState('');
  // const history = useHistory();

  const [isFormValid, setIsFormValid] = useState(false)
  const [inputEmailValid, setInputEmailValid] = useState(true);
  const [inputPasswordValid, setInputPasswordValid] = useState(true);
  const [inputConfirmPasswordValid, setInputConfirmPasswordValid] = useState(true);

  // const [errorName, setErrorName] = useState();
  // const [errorLink, setErrorLink] = useState();

  return (
    <main className="register content">
      <div className="register__container">
        <h2 className="register__title">Регистрация</h2>
        <form
          className="register__form"
          name="form-with-register"
          id="form-with-register">

          <input
            className={`register__input register__input_type_email
        ${!inputEmailValid
                ? 'register__input_state_invalid'
                : ''
              }`}
            type="email"
            placeholder="Email"
            name="register-input-email"
            minLength="2"
            maxLength="100"
            required
          />
          <span
            id="register-input-email-error"
            className="register__error">

          </span>

          <input
            className={`register__input register__input_type_password
        ${!inputPasswordValid
                ? 'register__input_state_invalid'
                : ''
              }`}
            type="password"
            placeholder="Пароль"
            name="register-input-password"
            minLength="6"
            maxLength="50"
            required
          />
          <span
            id="register-input-password-error"
            className="register__error">
          </span>

          <input
            className={`register__input register__input_type_confirm-password
        ${!inputConfirmPasswordValid
                ? 'register__input_state_invalid'
                : ''
              }`}
            type="password"
            placeholder="Подтвердите пароль"
            name="register-input-confirm-password"
            minLength="6"
            maxLength="50"
            required
          />
          <span
            id="register-input-confirm-password-error"
            className="register__error">
          </span>

          <button
            className={`button register__button-submit 
            ${!isFormValid
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