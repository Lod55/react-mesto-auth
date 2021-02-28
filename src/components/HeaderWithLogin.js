import React from 'react';
import Header from './Header';

const HeaderWithLogin = () => {
  return (
    <Header>
      <button
        className="header__button button"
        type="button">
        Регистрация
      </button>
    </Header>
  );
}

export default HeaderWithLogin;