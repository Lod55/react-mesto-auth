import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const App = () => {

  return (
    <div className={"page__container"}>
      <Header />

      <Switch>
        <Route path={'/'} exact>
          <Main />
        </Route>

        {/* <Route path={'/sign-up'} exact>
            <Register />
          </Route>

          <Route path={'/sign-in'} exact>
            <Login />
          </Route> */}
      </Switch>

      <Footer />
    </div>

  );
}

export default App;
