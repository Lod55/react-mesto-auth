import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card({ card, onCardLike, handleClick, onCardTrash }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButton = isOwn
    ? (<button className="button place__button-remove" type="button" onClick={handleDeleteClick} />)
    : null;

  const isLiked = card.likes.some(item => item._id === currentUser._id);

  const cardLikeButtonClassName = `button place__button-like 
  ${isLiked
      ? ('place__button-like_active')
      : ''}`;

  const handleLikeClick = () => onCardLike(card);
  const handleImageClick = () => handleClick(card);
  function handleDeleteClick() { onCardTrash(card) }

  return (
    <article className="place">
      <img
        className="place__image"
        alt={card.name}
        src={card.link}
        onClick={handleImageClick}
      />
      {cardDeleteButton}
      <div className="place__row-block">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__column-block">
          <button className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          />
          <span className="place__score-like">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;