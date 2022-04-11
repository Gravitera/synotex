import React from 'react';
import SplashView from './view';

const Splash = (props) => {

  const viewProps = {
    ...props,
  };

  return <SplashView {...viewProps} />;
};

export default Splash;