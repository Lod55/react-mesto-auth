import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
            <Link className="button header__button header__button_type_exit" to="/sign-in">Выйти</Link>
          </li>
        </ul>
      </nav>
    </Header>
  );
}

export default HeaderWithMain;