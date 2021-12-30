import React from 'react';
import { useEffect } from 'react';
import RecommendationView from './view';

const Recommendation = (props) => {



  const sendFeedback = (data) => {

    console.log(" =============== sendFeedback data    ", data);
    
    //fetch('http://52.79.235.238:3030/feedback', {
    fetch("https://a96d26d9839f933f1.awsglobalaccelerator.com/feedback",{
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

      })
      .catch((err) => {

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
