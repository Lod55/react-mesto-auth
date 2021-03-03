import React from 'react';
import HeaderWithMain from './HeaderWithMain';
import Main from './Main';


const Places = ({ onSignOut, userData }) => {
  return (
    <>
      <HeaderWithMain onSignOut={onSignOut} userData={userData} />
      <Main />
    </>
  );
}

export default Places;