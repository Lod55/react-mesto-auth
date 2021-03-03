import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import RemovePlacePopup from './RemovePlacePopup';
import ProtectedRoute from "./ProtectedRoute";
import Places from "./Places";
import Register from './Register';
import Login from './Login';
import HeaderWithRegister from './HeaderWithRegister';
import HeaderWithLogin from './HeaderWithLogin'
import Footer from './Footer';
import * as auth from '../utils/auth';
import api from '../utils/api.js'

const App = () => {
  // Дефолтные значение данных пользователя для api/auth
  const initialData = {
    email: ''
  }

  // Стейт переменные компонента
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
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState(initialData);

  const history = useHistory();


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
  const handleUpdateUser = ({ author, about }) => {
    api.setInfoUser({ author, about })
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
    setIsLoading(true)
    api.getInitialCards()
      .then(res => {
        setCards(res)
      })
      .catch(err => console.log(`Error: ${err}`))
      .finally(() => setIsLoading(false))
  }, []);

  useEffect(() => {
    api.getInfoUser()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => console.log(`Error: ${err}`));
  }, []);

  // Функции запросов api/auth
  // -- Запрос на проверку токера
  // -- Использование проверки токена вызывает юз эффект
  // -- Запрос Регистрации
  // -- Запрос Авторизации
  // -- Обнуление данных, выход из системы
  const tokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setData({
              email: res.data.email
            })
            history.push('/places');
          }
        })
        .catch(() => history.push('/sign-in'));
    }
  }, [history])

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck])

  const handleRegister = ({ password, email }) => {
    return auth.register(password, email)
      .then(res => {
        if (!res || res.statusCode === 400) throw new Error(`Ошибка: ${res.message}`);
        return res;
      })
  }

  const handleLogin = ({ password, email }) => {
    return auth.authorize(password, email)
      .then(res => {
        if (!res || res.statusCode === 400 || res.statusCode === 401) throw new Error(`Ошибка: ${res.message}`);
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
        };
      })
      .then(res => tokenCheck())
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setData(initialData);
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute
            path="/places"
            component={Places}
            loggedIn={loggedIn}
            userEmail={data.email}
            onSignOut={handleSignOut}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardTrash={handleTrashClick}
            isLoading={isLoading} />

          <Route exact path="/">
            {loggedIn
              ? <Redirect to="/places" />
              : <Redirect to="/sign-in" />}
          </Route>

          <Route path='/sign-in' exact>
            <HeaderWithLogin />
            <Login onLogin={handleLogin} />
          </Route>

          <Route path='/sign-up' exact>
            <HeaderWithRegister />
            <Register onRegister={handleRegister} />
          </Route>
        </Switch>

        <Footer />

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
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App;

