import React, { useState } from 'react';

const PopupWithForm = ({
  children,
  name,
  title,
  textButton,
  isOpen,
  onClose,
  onSubmit
}) => {
  const [isFormValid, setIsFormValid] = useState(false)

  const className = {
    section: `popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`,
    button: `button popup__button-submit ${!isFormValid ? 'popup__button-submit_invalid' : ''}`
  };

  const handleChangeForm = (e) => {
    setIsFormValid(e.target.validity.valid)
  }

  return (
    <section className={className.section}>
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
          onChange={handleChangeForm}
        >
          {children}
          <button
            className={className.button}
            type={"submit"}>
            {textButton}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;