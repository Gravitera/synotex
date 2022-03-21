import React from 'react';
import ResponseView from './view';

const Response = (props) => {


  const onNext = () => {
    props.navigation.navigate("recommendation", props.route.params)
  }

  const viewProps = {
    ...props,
    onNext
  };

  return <ResponseView {...viewProps} />;
};

export default Response;
