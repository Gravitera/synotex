import React from 'react';
import IntroView from './view';

const Intro = (props) => {

  const viewProps = {
    ...props,
  };

  return <IntroView {...viewProps} />;
};

export default Intro;
