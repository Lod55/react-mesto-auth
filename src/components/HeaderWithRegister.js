import React from 'react';
import Header from './Header';

const HeaderWithRegister = () => {
  return (
    <Header>
      <button
        className="header__button button"
        type="button">
        Войти
      </button>
    </Header>
  );
}

export default HeaderWithRegister;