import React from 'react';

const PopupWithForm = (props) => {
  let {
    children,
    name,
    title,
    isOpen,
    onClose
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
        {children}
      </div>
    </section>
  );
}

export default PopupWithForm;