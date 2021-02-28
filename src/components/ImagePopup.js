import React from 'react';

const ImagePopup = (props) => {
  let {
    card,
    onClose
  } = props;

  const className = `popup popup_blackout ${card.isOpen
    ? 'popup_opened'
    : ''
    }`;

  return (
    <section className={className} id="popup-image">
      <figure className="popup__figure">
        <button
          className="button popup__button-close"
          type="button"
          onClick={onClose}
        />
        <img
          className="popup__image"
          alt={card.name}
          src={card.link}
        />
        <figcaption className="popup__caption">{card.name} / &copy; {card.owner.name}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;