import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const HeaderWithRegister = () => {

  return (
    <Header>
      <Link
        className="button header__button header__button_type_login"
        to="/sign-in">
        Войти
        </Link>
    </Header>
  );
}

export default HeaderWithRegister;