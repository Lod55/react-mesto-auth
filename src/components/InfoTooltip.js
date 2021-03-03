import React from 'react';
import fail from '../images/fail.svg';
import success from '../images/success.svg';

const InfoTooltip = (props) => {
  // Диструктуризированная переменная с пропсами
  let {
    isOpen,
    onClose,
    isSuccess
  } = props;

  const tooltip = isSuccess
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз."

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