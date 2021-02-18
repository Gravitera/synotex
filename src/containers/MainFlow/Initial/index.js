import React from 'react';
import InitialView from './view';

const Initial = (props) => {

  const viewProps = {
    ...props
  };

  return <InitialView {...viewProps} />;
};

export default Initial;
