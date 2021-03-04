
import React, { useContext, useState } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

// popup components
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import RemovePlacePopup from './RemovePlacePopup';

const Main = (props) => {
  // Диструктуризированная переменная с пропсами
  const {
    isLoading,
    cards,
    onCardDelete,
    onCardLike,
    onAddPlaceSubmit,
    onUpdateAvatar,
    onUpdateUser

  } = props

  const currentUser = useContext(CurrentUserContext);

  // Стейт переменные компонента
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isRemovePlacePopupOpen, setIsRemovePlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    owner: { name: '' }
  });
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
    })
  }

  const handleUpdateUser = (data) => {
    onUpdateUser(data)
      .then(closeAllPopups)
      .catch(err => console.log(`Error: ${err}`));
  }

  const handleUpdateAvatar = (data) => {
    onUpdateAvatar(data)
      .then(closeAllPopups)
      .catch(err => console.log(`Error: ${err}`));
  }

  const handleAddPlaceSubmit = (data) => {
    onAddPlaceSubmit(data)
      .then(closeAllPopups)
      .catch(err => console.log(`Error: ${err}`));
  }

  const handleCardLike = (card) => {
    onCardLike(card)
      .catch(err => console.log(`Error: ${err}`));
  }

  const handleCardDelete = () => {
    onCardDelete(useCardId)
      .then(closeAllPopups)
      .catch(err => console.log(`Error: ${err}`));
  }

  return (
    <>
      <main className={"content page__content"}>
        <section className={"profile content__item"}>
          <div
            className={"profile__overlay"}
            onClick={handleEditAvatarClick}>
            <img
              src={currentUser.avatar || "#"}
              alt={`Аватар ${currentUser.name || ""}`}
              className={"profile__avatar"} />
          </div>
          <div className={"profile__text-block"}>
            <div className={"profile__row-block"}>
              <h1
                className={"profile__author"}>
                {currentUser.name || "Загрузка..."}
              </h1>
              <button
                className={"button profile__button-edit"}
                type={"button"}
                onClick={handleEditProfileClick}>
              </button>
            </div>
            <p
              className={"profile__status"}>
              {currentUser.about || "пожалуйста, подождите"}
            </p>
          </div>
          <button
            className="button profile__button-add"
            type="button"
            onClick={handleAddPlaceClick}>
          </button>
        </section>

        {isLoading
          ? (<p>Загрузка...</p>)
          : (<section className={"places content__item"}>
            {cards.map(item => (
              <Card
                key={item._id}
                card={item}
                onImageClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardTrash={handleTrashClick}
              />
            )
            )}
          </section>)
        }
      </main>

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
    </>
  )
}

export default Main;
