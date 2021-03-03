import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../images/Logo.svg';

const Header = (props) => {
  const {
    onSignOut,
    userEmail,
    loggedIn
  } = props

  const path = useLocation().pathname

  // Стейт бургер-меню 
  const [isActive, setIsActive] = useState(false);

  // Функция переключения состояния бургер-меню
  const handleButton = () => {
    setIsActive(!isActive)
  }

  return (
    <header className="header page__header">
      <img
        src={logo}
        alt="Логотип проекта Места России"
        className="header__logo"
      />
      {loggedIn
        ? (<>
          <button
            type="button"
            className={`header__burger button 
        ${isActive
                ? "active"
                : ""}`}
            onClick={handleButton}>
            <span></span>
          </button>
          <nav
            className={`header__menu 
      ${isActive
                ? "active"
                : ""}`}>
            <ul className="header__list">
              <li>
                <p className="header__email">{userEmail}</p>
              </li>
              <li>
                {path === "/mesto"}
                <button
                  className="button header__button header__button_type_exit"
                  onClick={onSignOut}>
                  Выйти
              </button>
              </li>
            </ul>
          </nav></>)
        : (<Link
          className="button header__button"
          to={path === "/sign-in" ? "/sign-up" : "/sign-in"}>
          {path === "/sign-in" ? "Регистрация" : "Вход"}
        </Link>)}


    </header >
  );
}

export default Header;