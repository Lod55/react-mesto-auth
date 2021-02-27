import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from './Register';
import Login from './Login';
import NotFound from './NotFound';
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

        <Route path={'/sign-up'} exact>
          <Register />
        </Route>

        <Route path={'/sign-in'} exact>
          <Login />
        </Route>

        <Route path={'*'}>
          <NotFound />
        </Route>

      </Switch>

      <Footer />
    </div >

  );
}

export default App;
