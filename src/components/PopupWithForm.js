import React from 'react';

const PopupWithForm = (props) => {
  const {
    children,
    name,
    title,
    textButton,
    isOpen,
    onClose,
    onSubmit,
    validationForm
  } = props;

  return (
    <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          className="button popup__button-close"
          type="button"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className={"popup__form"}
          name={name}
          id={name}
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`button popup__button-submit 
            ${!validationForm
                ? 'popup__button-submit_invalid'
                : ''
              }`}
            type={"submit"}>
            {textButton}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;