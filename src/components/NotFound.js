import React from 'react';
import { Link } from 'react-router-dom';
import Error from '.././images/404.png'

const NotFound = () => {
  return (
    <div className="not-found content">
      <img className="not-found__image" src={Error} alt="Error 404" />
      <h2 className="not-found__title">
        <span>404</span> - Страница не найдена
      </h2>
      <p className="not-found__text">
        Ой, здесь ничего нет
      </p>
      <Link className="button not-found__button-to-main" to="/">Назад</Link>
    </div>
  );
}

export default NotFound;