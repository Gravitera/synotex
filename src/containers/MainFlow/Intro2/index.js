import React from 'react';
import IntroView2 from './view';

const Intro2 = (props) => {

  const viewProps = {
    ...props,
  };

  return <IntroView2 {...viewProps} />;
};

export default Intro2;
