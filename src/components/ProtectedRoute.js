
import React from 'react';
import { Route, Redirect } from "react-router-dom";


const ProtectedRoute = (props) => {
  let {
    component: Component,
    ...props
  } = props;

  return (
    <Route>
      {
        () => props.loggedIn === true ? <Component {...props} /> : <Redirect to="./sign-in" />
      }
    </Route>
  )
}

export default ProtectedRoute;