import React from 'react';

function PopupWithForm({ children, name, title, textButton, isOpen, onClose, onSubmit }) {
  const className = `popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`;

  return (
    <section className={className}>
      <div className={"popup__container"}>
        <button
          className={"button popup__button-close"}
          type={"button"}
          onClick={onClose}>
        </button>
        <h2 className={"popup__title"}>
          {title}</h2>
        <form
          className={"popup__form"}
          name={name}
          id={"popup-form-edit"}
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={"button popup__button-submit"}
            type={"submit"}>
            {textButton}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;