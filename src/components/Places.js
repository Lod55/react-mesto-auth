import React from 'react';
import HeaderWithMain from './HeaderWithMain';
import Main from './Main';

const Places = ({ onSignOut: singOut, userEmail: email, ...props }) => {

  return (
    <>
      <HeaderWithMain
        onSignOut={singOut}
        userEmail={email}
      />

      <Main {...props} />
    </>
  );
}

export default Places;