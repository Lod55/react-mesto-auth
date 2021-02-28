import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from './Register';
import Login from './Login';
import NotFound from './NotFound';
import HeaderWithMain from './HeaderWithMain';
import HeaderWithRegister from './HeaderWithRegister';
import HeaderWithLogin from './HeaderWithLogin'
import Main from './Main';
import Footer from './Footer';

const App = () => {

  return (
    <div className="page__container">
      <Switch>

        <Route path='/' exact>
          <HeaderWithMain />
          <Main />
        </Route>

        <Route path='/sign-up' exact>
          <HeaderWithRegister />
          <Register />
        </Route>

        <Route path='/sign-in' exact>
          <HeaderWithLogin />
          <Login />
        </Route>

        <Route path='*'>
          <HeaderWithRegister />
          <NotFound />
        </Route>

      </Switch>

      <Footer />
    </div >

  );
}

export default App;
