import React from 'react';
import Appexit from './view';
import {BackHandler, Platform} from "react-native";

const Exitapp = (props) => {

  const viewProps = {
    ...props,
  };

  if (Platform.OS === "android"){
    BackHandler.exitApp();
  }
  if (Platform.OS === "ios"){
    RNExitApp.exitApp();
  }

  return <Appexit {...viewProps} />;
};

export default Exitapp;
