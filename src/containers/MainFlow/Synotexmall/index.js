import React from 'react';
import Mallsynotex from './view';

const Synotexmall = (props) => {

  const viewProps = {
    ...props,
  };

  return <Mallsynotex {...viewProps} />;
};

export default Synotexmall;
