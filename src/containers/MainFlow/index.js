import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createStackNavigator } from 'react-navigation';
// import { createStackNavigator } from "react-navigation-stack";
const { height, width } = Dimensions.get('window');
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';

//Screens
// import Policy from './Policy';
import Scanner from './Scanner';
import { getStorageItem } from '../../utils';
import io from 'socket.io-client';
import Geolocation from 'react-native-geolocation-service';
import Intro from './Intro';
import InputFeatures from './InputFeatures';
import Response from './Response';
import Recommendation from './Recommendation';
import IntroView2 from './Intro2';
import Storybrand from './Brandstory';
import ArCamera from './ArCamera';
import ArCamera2 from './ArCamera2';
import Synotexmall from './Synotexmall';
import Offlinestore from './Offlinestore';
import Exitapp from './Exit';
import Onlinemall from "./Onlinemall";
import Splash from "./Splash";
// import { requestLocationPermission } from './../../utils'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  NavigationContainer,
  DarkTheme,
  DrawerActions,
} from '@react-navigation/native';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Image, Platform } from "react-native";

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';




let socket;

const MainFlow = (props) => {
  const [driverData, setDriverData] = useState({});

  const Stack = createStackNavigator();
  
  return (

    <>

      <Stack.Navigator
        headerMode="none"
        initialRouteName={'splash'}
        >
          <Stack.Screen name="splash" component={Splash} />
          <Stack.Screen name="intro" component={Intro} />
          <Stack.Screen name="scanner" component={Scanner} />
          <Stack.Screen name="input" component={InputFeatures} />
          <Stack.Screen name="response" component={Response} />
          <Stack.Screen name="recommendation" component={Recommendation} />
          <Stack.Screen name="intro2" component={IntroView2} />
          <Stack.Screen name="ArCamera" component={ArCamera} />
          <Stack.Screen name="ArCamera2" component={ArCamera2} />
          <Stack.Screen name="Onlinemall" component={Onlinemall} />
          <Stack.Screen name="Brandstory" component={Storybrand} />
          <Stack.Screen name="Store" component={Synotexmall} />
          <Stack.Screen name="OfflineStore" component={Offlinestore} />
      </Stack.Navigator>

      
    </>
  );


};



export default MainFlow;
//export default createAppContainer(TabNavigator);
