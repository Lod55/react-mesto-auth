import React from 'react';

function ImagePopup({ card, onClose }) {
  const className = `popup popup_blackout ${card.isOpen ? 'popup_opened' : ''}`;

  return (
    <section className={className} id="popup-image">
      <figure className="popup__figure">
        <button
          className="button popup__button-close"
          type="button"
          onClick={onClose}>
        </button>
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