import React from 'react';
import logo from '../images/Logo.svg';

const Header = (props) => {
  let { children } = props;

  return (
    <header className="header page__header">
      <img
        src={logo}
        alt="Логотип проекта Места России"
        className="header__logo"
      />
      {children}
    </header >
  );
}

export default Header;