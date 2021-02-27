import React, { useState, useEffect } from 'react';
import api from '../utils/api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Card from './Card.js';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import RemovePlacePopup from './RemovePlacePopup';


const Main = () => {
  // стейты компонента 
  const [currentUser, setCurrentUser] = useState({
    name: 'Loading...',
    about: ''
  });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isRemovePlacePopupOpen, setIsRemovePlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    owner: { name: '' }
  });
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [useCardId, setUseCardId] = useState('');

  // функции открытия попапов
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleCardClick = (data) => setSelectedCard({
    isOpen: true,
    ...data
  });
  const handleTrashClick = (card) => {
    setIsRemovePlacePopupOpen(true)
    setUseCardId(card._id)
  }

  // функция закрытия всех попапов
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsRemovePlacePopupOpen(false)
    setSelectedCard({
      isOpen: false,
      owner: { name: '' }
    });
  }

  // функции отправки информации на сервер
  const handleUpdateUser = ({ name, about }) => {
    api.setInfoUser({ name, about })
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  const handleUpdateAvatar = ({ avatar }) => {
    api.setUserAvatar({ avatar })
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  const handleAddPlaceSubmit = ({ name, link }) => {
    api.setCard({ name, link })
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  // функция контоля состояния лайка и работа с состоянием на сервере
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(item => item._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then(res => {
        const newCards = cards.map(item => item._id === card._id ? res : item);
        setCards(newCards);
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  // функция удаления карточки с сервера
  const handleCardDelete = () => {
    api.removeCard(useCardId)
      .then(res => {
        const newCards = cards.filter(item => item._id === useCardId ? null : item);
        setCards(newCards);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  useEffect(() => {
    api.getInfoUser()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => console.log(`Error: ${err}`));
  }, []);

  useEffect(() => {
    setIsLoading(true)
    api.getInitialCards()
      .then(res => {
        setCards(res)
      })
      .catch(err => console.log(`Error: ${err}`))
      .finally(() => setIsLoading(false))
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <main className={"content page__content"}>
        <section className={"profile content__item"}>
          <div className={"profile__overlay"} onClick={handleEditAvatarClick}>
            <img src={currentUser.avatar} alt={`Аватар ${currentUser.name}`} className={"profile__avatar"} />
          </div>
          <div className={"profile__text-block"}>
            <div className={"profile__row-block"}>
              <h1 className={"profile__author"}>{currentUser.name}</h1>
              <button className={"button profile__button-edit"} type={"button"} onClick={handleEditProfileClick}></button>
            </div>
            <p className={"profile__status"}>{currentUser.about}</p>
          </div>
          <button className={"button profile__button-add"} type={"button"} onClick={handleAddPlaceClick}></button>
        </section>
        {isLoading
          ? <p>Loading...</p>
          : (<section className={"places content__item"}>
            {cards.map(item => (
              <Card
                key={item._id}
                card={item}
                handleClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardTrash={handleTrashClick}
              />
            )
            )}
          </section>)
        }

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <RemovePlacePopup
          isOpen={isRemovePlacePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

      </main>

    </CurrentUserContext.Provider>
  );
}

export default Main;
