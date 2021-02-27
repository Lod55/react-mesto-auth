import React from 'react';
import logo from '../images/Logo.svg';

const Header = () => {
  return (
    <header className={"header page__header"}>
      <img src={logo} alt={"Логотип проекта Места России"} className={"header__logo"} />
    </header>
  );
}

export default Header;
