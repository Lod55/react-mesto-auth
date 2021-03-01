import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const initialData = {
    email: '',
    password: '',
  };

  const initialInputsValid = {
    email: false,
    password: false,
    form: false
  };

  const initialErrorsValid = {
    email: '',
    password: '',
    submit: ''
  };

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

    if (!validations.email || !validations.password) {
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

    onLogin(data)
      .then(resetForm)
      .then(() => history.push('/'))
      .catch(err => {
        setErrorsValid((data) => ({
          ...data,
          submit: err.message || 'Что то пошло не так'
        }));
      })
  }

  return (
    <main className="login content page__content">
      <div className="login__container">
        <h2 className="login__title">Вход</h2>
        <form
          className="login__form"
          name="form"
          id="form-with-login"
          onSubmit={handleSubmit}>
          <input
            className={`login__input login__input_type_email
        ${!validations.email
                ? 'login__input_state_invalid'
                : ''
              }`}
            type="email"
            placeholder="Email"
            name="email"
            id="login-input-email"
            maxLength="100"
            value={data.email}
            onChange={handleChange}
            required
          />
          <span
            id="login-input-email-error"
            className="login__error">
            {errorsValid.email}
          </span>

          <input
            className={`login__input login__input_type_password
        ${!validations.password
                ? 'login__input_state_invalid'
                : ''
              }`}
            type="password"
            placeholder="Пароль"
            name="password"
            id="login-input-password"
            maxLength="50"
            value={data.password}
            onChange={handleChange}
            required
          />
          <span
            id="login-input-password-error"
            className="login__error">
            {errorsValid.password}
          </span>

          <button
            className={`button login__button-submit 
            ${!validations.form
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