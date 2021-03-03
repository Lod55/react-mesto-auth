import React, { useState } from 'react';
import Header from './Header';

const HeaderWithMain = (props) => {
  let {
    onSignOut,
    userData
  } = props;

  // Стейт бургер-меню 
  const [isActive, setIsActive] = useState(false);

  // Функция переключения состояния бургер-меню
  const handleButton = () => {
    setIsActive(!isActive)
  }

  return (
    <Header>
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
            <p className="header__email">{userData}</p>
          </li>
          <li>
            <button
              className="button header__button header__button_type_exit"
              onClick={onSignOut}>
              Выйти
              </button>
          </li>
        </ul>
      </nav>
    </Header>
  );
}

export default HeaderWithMain;