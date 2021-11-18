import React from 'react';
import Mallonline from './view';

const Onlinemall = (props) => {

  const viewProps = {
    ...props,
  };

  return <Mallonline {...viewProps} />;
};

export default Onlinemall;
