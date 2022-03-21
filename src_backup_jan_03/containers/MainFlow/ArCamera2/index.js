import React from 'react';
import { useEffect } from 'react';
import ArCameraView from './view';

const ArCamera = (props) => {


  const viewProps = {
    ...props
  };

  return <ArCameraView {...viewProps} />;
};

export default ArCamera;
