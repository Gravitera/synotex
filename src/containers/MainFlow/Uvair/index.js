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
  BackHandler,
  TouchableOpacity
} from 'react-native';

//Screens
// import Policy from './Policy';
import { getStorageItem } from '../../../utils';
import io from 'socket.io-client';
import Geolocation from 'react-native-geolocation-service';
// import { requestLocationPermission } from './../../utils'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  NavigationContainer,
  DarkTheme,
  DrawerActions,
} from '@react-navigation/native';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Image, Platform } from "react-native";

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Uvairview from "./view";


const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();

let socket;


const Uvair = (props) => {

    const viewProps = {
      ...props,
    };
  
    return <Uvairview {...viewProps} />;
};
  
  export default Uvair;