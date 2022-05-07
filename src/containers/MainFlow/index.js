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
import Uvair from "./Uvair";
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

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Bottomtab from "./bottomtab";

const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();

let socket;


const MainFlow2 = (props) => {
  return (
    <>
      <Stack.Navigator
        headerMode="none"
        initialRouteName={'intro'}
        >
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

const MainFlow = (props) => {
  const [driverData, setDriverData] = useState({});


  const [homeclicked, sethomeclicked] = useState(true);

  return (
    <>
      <Stack.Navigator
        headerMode="none"
        initialRouteName={'splash'}
        >
          <Stack.Screen name="splash" component={Splash} />
          <Stack.Screen name="tabflow" component={TabFlow} />

      </Stack.Navigator>
    </>
  );   

}

const TabBarIcon = ({ isFocus, focusImage, unFocusImage }) => {
  return (
    <Image source={isFocus ? focusImage : unFocusImage} style={styles.icon} />
  );
};

const Tab = createBottomTabNavigator();

var exit = (props) => {
  var [exited, setexited] = useState(true);
  console.log(" ========================== exited state    ", exited);
  console.log(" ========================== exited state2    ", exited);
  console.log(" ========================== exited state3    ", exited);

  return null;
}

const TabFlow = (props) => {
  return (
      <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: "#8082FF",
          tabBarLabelStyle: { fontSize: 12, lineHeight: 16},
          tabBarStyle: {height: 500, position: 'absolute' },
        }}
        tabBarOptions={{
          style: {height: hp("8%"), position: "absolute"},
          labelStyle: {fontSize: 12, marginBottom: 8}
        }}
      >
        <Tab.Screen
          name='Home'
          component={MainFlow2}
          options={{
            headerShown: false,
            tabBarLabel: '홈',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                isFocus={focused}
                focusImage={require('./../../assets/images/newdesign/bottomtab_home_icon_checked.png')}
                unFocusImage={require('./../../assets/images/newdesign/bottomtab_home_icon.png')}
              />
            ),
          }}
        />
        <Tab.Screen
          name='BrandStory'
          component={Storybrand}
          options={{
            headerShown: false,
            tabBarLabel: '브랜드스토리',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                isFocus={focused}
                focusImage={require('./../../assets/images/newdesign/bottomtab_brandstory_icon_checked.png')}
                unFocusImage={require('./../../assets/images/newdesign/bottomtab_brandstory_icon.png')}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Store'
          component={Synotexmall}
          options={{
            headerShown: false,
            tabBarLabel: '스토어',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                isFocus={focused}
                focusImage={require('./../../assets/images/newdesign/bottomtab_store_icon_checked.png')}
                unFocusImage={require('./../../assets/images/newdesign/bottomtab_store_icon.png')}
              />
            ),
          }}
        />
        {/*<Tab.Screen
          name='Offlinestore'
          component={Offlinestore}
          options={{
            headerShown: false,
            tabBarLabel: '오프라인매장',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                isFocus={focused}
                focusImage={require('./../../assets/images/newdesign/bottomtab_offline_icon_checked.png')}
                unFocusImage={require('./../../assets/images/newdesign/bottomtab_offline_icon.png')}
              />
            ),
          }}
        />*/}
        <Tab.Screen
          name='Uvair'
          component={Uvair}
          options={{
            headerShown: false,
            tabBarLabel: 'UV & Air',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                isFocus={focused}
                focusImage={require('./../../assets/images/newdesign/bottomtab_uvair_checked.png')}
                unFocusImage={require('./../../assets/images/newdesign/bottomtab_uvair.png')}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Exit'
          component={exit}
          options={{
            headerShown: false,
            tabBarLabel: '종료',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                isFocus={focused}
                focusImage={require('./../../assets/images/newdesign/bottomtab_exit_icon_checked.png')}
                unFocusImage={require('./../../assets/images/newdesign/bottomtab_exit_icon.png')}
              />
            ),
          }}
        />


      </Tab.Navigator>
      <TouchableOpacity onPress={() => {BackHandler.exitApp()}} style={{bottom: 0, right: 0,position:"absolute", width: wp("20%"), height: hp("8%"), zIndex:10000}}>

      </TouchableOpacity>
      </>

  );


}



export default MainFlow;
//export default createAppContainer(TabNavigator);


const styles = StyleSheet.create({
  icon: {
    width: "55%",
    height: "55%",
    resizeMode: "contain",
    marginTop: 7,
  },
});

