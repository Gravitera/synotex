import React from 'react';
import { useEffect } from 'react';
import RecommendationView from './view';

const Recommendation = (props) => {

  const sendFeedback = async (data) => {
    setLoading(false);
    console.log(" =============== sendFeedback data    ", data);
    
    fetch('http://52.79.235.238:3030/feedback', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(
        {
          "ID": data.ID,
          "MaskSize": data.MaskSize
        })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('SUCCESS =>', res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log('ERROR =>', err);
      });

  };

  const viewProps = {
    ...props,
    sendFeedback
  };

  return <RecommendationView {...viewProps} />;
};

export default Recommendation;
