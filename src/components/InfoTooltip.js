import React from 'react';
import fail from '../images/fail.svg';
import success from '../images/success.svg';
import { useLocation } from 'react-router-dom';

const InfoTooltip = (props) => {
  // Диструктуризированная переменная с пропсами
  const {
    isOpen,
    onClose,
    isSuccess
  } = props;

  const path = useLocation().pathname

  const tooltip = isSuccess
    ? path === "/sign-up"
      ? "Вы успешно зарегистрировались!"
      : "Вы успешно авторизовались!"
    : path === "/sign-up"
      ? "Что-то пошло не так! Попробуйте ещё раз."
      : "Убедитесь в правильности введенных данных. Попробуйте ещё раз."

  const image = isSuccess
    ? success
    : fail

  return (
    <section className={`popup popup_type_info-tooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          className="button popup__button-close"
          type="button"
          onClick={onClose}
        />
        <img className="popup__image-tooltip" src={image} alt={"Картинка подсказки"}></img>
        <p className="popup__tooltip">{tooltip}</p>
      </div>
    </section>
  )
}

export default InfoTooltip;