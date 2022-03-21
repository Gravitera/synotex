import React from 'react';
import Storeoffline from './view';

const Offlinestore = (props) => {

  const viewProps = {
    ...props,
  };

  return <Storeoffline {...viewProps} />;
};

export default Offlinestore;
