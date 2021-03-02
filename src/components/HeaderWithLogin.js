import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const HeaderWithLogin = () => {

  return (
    <Header>
      <Link
        className="button header__button header__button_type_register"
        to="/sign-up">
        Регистрация
        </Link>
    </Header>
  );
}

export default HeaderWithLogin;