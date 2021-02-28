import React, { useState } from 'react';
import Header from './Header';

const HeaderWithMain = () => {

  const [isActive, setIsActive] = useState(false);

  const handleButton = () => {
    setIsActive(!isActive)
  }


  return (
    <Header>
      <button
        type="button"
        className={`header__burger button ${isActive ? "active" : ""}`}
        onClick={handleButton}>
        <span></span>
      </button>
      <nav className={`header__menu ${isActive ? "active" : ""}`}>
        <ul className="header__list">
          <li>
            <p className="header__email">Email@email.ru</p>
          </li>
          <li>
            <button
              className="header__button button"
              type="button"
            > Выйти
            </button>
          </li>
        </ul>
      </nav>
    </Header>
  );
}

export default HeaderWithMain;