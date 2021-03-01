import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
  const initialData = {
    email: '',
    password: '',
  };

  // const [data, setData] = useState(initialData);
  // const [message, setMessage] = useState('');
  // const history = useHistory();

  const [isFormValid, setIsFormValid] = useState(false)
  const [inputEmailValid, setInputEmailValid] = useState(true);
  const [inputPasswordValid, setInputPasswordValid] = useState(true);

  // const [errorName, setErrorName] = useState();
  // const [errorLink, setErrorLink] = useState();

  return (
    <main className="login content">
      <div className="login__container">
        <h2 className="login__title">Вход</h2>
        <form
          className="login__form"
          name="form-with-login"
          id="form-with-login">

          <input
            className={`login__input login__input_type_email
        ${!inputEmailValid
                ? 'login__input_state_invalid'
                : ''
              }`}
            type="email"
            placeholder="Email"
            name="login-input-email"
            minLength="2"
            maxLength="100"
            required
          />
          <span
            id="login-input-email-error"
            className="login__error">

          </span>

          <input
            className={`login__input login__input_type_password
        ${!inputPasswordValid
                ? 'login__input_state_invalid'
                : ''
              }`}
            type="password"
            placeholder="Пароль"
            name="login-input-password"
            minLength="6"
            maxLength="50"
            required
          />
          <span
            id="login-input-password-error"
            className="login__error">
          </span>

          <button
            className={`button login__button-submit 
            ${!isFormValid
                ? 'login__button-submit_invalid'
                : ''
              }`}
            type="submit">
            Войти
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;