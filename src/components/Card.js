import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


const Card = (props) => {
  // Диструктуризированная переменная с пропсами
  const {
    card,
    onCardLike,
    onImageClick,
    onCardTrash
  } = props;

  // Контекст с данными о пользователе
  const currentUser = useContext(CurrentUserContext);

  // Переменная с подтвержденным авторством 
  const isOwn = card.owner._id === currentUser._id;

  // Проверка авторских лайков
  const isLiked = card.likes
    .some(item => item._id === currentUser._id);

  // Функции компонента
  // -- Нажатие на лайк
  // -- Нажатие на фото
  // -- Нажатие на урну
  const handleLikeClick = () => onCardLike(card);
  const handleImageClick = () => onImageClick(card);
  function handleDeleteClick() { onCardTrash(card) }

  return (
    <article className="place">
      <img
        className="place__image"
        alt={card.name}
        src={card.link}
        onClick={handleImageClick}
      />
      {isOwn
        ? (<button
          className="button place__button-remove"
          type="button"
          onClick={handleDeleteClick} />)
        : null}
      <div className="place__row-block">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__column-block">
          <button
            className={`button place__button-like 
            ${isLiked
                ? ('place__button-like_active')
                : ''}`}
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