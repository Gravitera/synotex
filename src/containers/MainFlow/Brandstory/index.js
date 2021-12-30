import React from 'react';
import Brandstory from './view';

const Storybrand = (props) => {

  const viewProps = {
    ...props,
  };

  return <Brandstory {...viewProps} />;
};

export default Storybrand;
