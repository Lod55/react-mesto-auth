import React, { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ onEditAvatar, onEditProfile, onAddPlace, isLoading, cards, onCardClick, onCardLike, onCardTrash }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className={"content page__content"}>
      <section className={"profile content__item"}>
        <div className={"profile__overlay"} onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt={`Аватар ${currentUser.name}`} className={"profile__avatar"} />
        </div>
        <div className={"profile__text-block"}>
          <div className={"profile__row-block"}>
            <h1 className={"profile__author"}>{currentUser.name}</h1>
            <button className={"button profile__button-edit"} type={"button"} onClick={onEditProfile}></button>
          </div>
          <p className={"profile__status"}>{currentUser.about}</p>
        </div>
        <button className={"button profile__button-add"} type={"button"} onClick={onAddPlace}></button>
      </section>
      {isLoading
        ? <p>Loading...</p>
        : (<section className={"places content__item"}>
          {cards.map(item => (
            <Card
              key={item._id}
              card={item}
              handleClick={onCardClick}
              onCardLike={onCardLike}
              onCardTrash={onCardTrash}
            />
          )
          )}
        </section>)
      }
    </main>
  );
}

export default Main;
