import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';


import ProtectedRoute from "./ProtectedRoute";
import Places from "./Places";
import Register from './Register';
import Login from './Login';
import HeaderWithMain from './HeaderWithMain';
import HeaderWithRegister from './HeaderWithRegister';
import HeaderWithLogin from './HeaderWithLogin'
import Footer from './Footer';
import * as auth from '../utils/auth';
// import api from '../utils/api.js'

const App = () => {
  const initialData = {
    email: ''
  }
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState(initialData);
  const history = useHistory();


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
      <Switch>
        <ProtectedRoute
          path="/places"
          loggedIn={loggedIn}
          userData={data.email}
          onSignOut={handleSignOut}
          component={Places} />

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
    </div>
  )
}

export default App;
