import React from 'react';
import { useEffect } from 'react';
import RecommendationView from './view';

const Recommendation = (props) => {

  const viewProps = {
    ...props
  };

  return <RecommendationView {...viewProps} />;
};

export default Recommendation;
