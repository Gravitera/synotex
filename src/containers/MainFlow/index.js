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
import Onlinemall from "./Onlinemall"
// import { requestLocationPermission } from './../../utils'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  NavigationContainer,
  DarkTheme,
  DrawerActions,
} from '@react-navigation/native';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Image } from "react-native";


const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();

let socket;

const MainFlow = (props) => {
  const [driverData, setDriverData] = useState({});

  useEffect(() => {
    (async () => {
      const driver_data = await getStorageItem('UserData');
      // console.log('ALREADY VERFIIFED PROPS', driver_data);
      setDriverData(driver_data);
      socket = io('https://xehen-lynx.herokuapp.com');
      // socket = io('http://192.168.18.174:4000');
      if (driver_data?.busId?._id) {
        // setInterval(() => {
        //   sendLocation(driver_data);
        // }, 9000);
      }
      // const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

      // if (granted) {
      //   console.log("You can use the ACCESS_FINE_LOCATION")
      // }
      // else {
      //   console.log("ACCESS_FINE_LOCATION permission denied")
      // }
    })();
  }, [sendLocation]);

  const sendLocation = (data) => {
    try {
      Geolocation.getCurrentPosition(
        (position) => {
          if (data?.busId?._id) {
            console.log('POSOTIO', data.busId._id);
            socket.emit('sendBusLocation', {
              location: position,
              busId: data.busId._id,
              busNo: data.busId.busNo,
            });
          }

          // socket.on('getBusLocation', (data) => {
          //   console.log('GET BUS', data);
          // });
          // )
          // socket.emit('sendBusLocation', {
          //   data: {
          //     location: position,
          //     busId: driverData?.busId?._id,
          //   }

          // },
          //   (data) => { console.log("DARTA", data) }

          // );
          // }
        },
        (error) => {
          // See error code charts below.
          console.log('SOKCKET MAINFLOW', error.code, error.message);
          // props.showAlert('Network Error');
          return;
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    } catch (error) {
      console.log(error.code, error.message);
      return;
    }
  };

  // console.log('object1 DRAWER TEST DRIVER', driverData);

  /*
  const createBottomTabs = () => {
    return (
      <MaterialBottomTabs.Navigator>
        <MaterialBottomTabs.Screen
          name="Home"
          style={{ marginBottom: 16 }}
          component={Intro}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: () => <Icon name="home" color="#fff" size={24} />
          }}
        />
        <MaterialBottomTabs.Screen
          name="Brandstory"
        />
        <MaterialBottomTabs.Screen
          name="Store"
        />
        <MaterialBottomTabs.Screen
          name="OfflineStore"
        />
        <MaterialBottomTabs.Screen
          name="Exit"
        />
      </MaterialBottomTabs.Navigator>
    );
  };
  */

  const createHomeStack = () => {
    return (
      <>
        <Stack.Navigator
        headerMode="none"
        initialRouteName={'intro'}
        drawerContent={(props) => (
          <StackContent
            {...props}
            driverData={driverData}
            logout={() => props.navigation.navigate('AuthFlow')}
          />
        )}>
          <Stack.Screen name="intro" component={Intro} />
          <Stack.Screen name="scanner" component={Scanner} />
          <Stack.Screen name="input" component={InputFeatures} />
          <Stack.Screen name="response" component={Response} />
          <Stack.Screen name="recommendation" component={Recommendation} />
          <Stack.Screen name="intro2" component={IntroView2} />
          <Stack.Screen name="ArCamera" component={ArCamera} />
          <Stack.Screen name="ArCamera2" component={ArCamera2} />
          <Stack.Screen name="Onlinemall" component={Onlinemall} />
        </Stack.Navigator>
      </>
    );   
  };


  
  return (
    <MaterialBottomTabs.Navigator
      initialRouteName="Home"
      activeColor="#0D3A71"
      barStyle={{ backgroundColor: "white", height: height*0.08 , paddingTop: 10}}
      shifting={false}
    >
      <MaterialBottomTabs.Screen
        name="Home"
        children={createHomeStack}
        options={{
          //tabBarLabel: "Home",
          tabBarLabel: <Text style={{fontFamily : "pacifico", textAlign : "center", marginLeft: 17, fontWeight: "bold"}}>Home</Text>,
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('./../../assets/images/round_chalet_black_36.png')}
              resizeMode="contain"
              style={{width: width*0.1, height: height*0.05, marginTop: -1*height*0.015}}
            />
          )
        }}
        
      />
      <MaterialBottomTabs.Screen
        name="Brandstory"
        component={Storybrand}
        options={{
          tabBarLabel: <Text style={{fontFamily : "pacifico", textAlign : "center", fontWeight: "bold"}}>브랜드스토리</Text>,
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('./../../assets/images/round_manage_search_black_36.png')}
              resizeMode="contain"
              style={{width: width*0.099, height: height*0.05, marginTop: -1*height*0.0175}}
            />
          )
        }}
      />
      <MaterialBottomTabs.Screen
        name="Store"
        component={Synotexmall}
        
        options={{
          tabBarLabel: <Text style={{fontFamily : "pacifico", textAlign : "center", fontWeight: "bold"}}>스토어</Text>,
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('./../../assets/images/round_storefront_black_36.png')}
              resizeMode="contain"
              style={{width: width*0.08, height: height*0.05, marginTop: -1*height*0.015}}
              onPress={() => Linking.openURL("https://synotexmall.com")}
            />
          )
        }}
      />
      <MaterialBottomTabs.Screen
        name="OfflineStore"
        component={Offlinestore}
        options={{
          tabBarLabel: <Text style={{fontFamily : "pacifico", textAlign : "center", fontWeight: "bold"}}>오프라인매장</Text>,
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('./../../assets/images/round_map_black_36.png')}
              resizeMode="contain"
              style={{width: width*0.08, height: height*0.05, marginTop: -1*height*0.015}}
            />
          )
        }}
      />
      <MaterialBottomTabs.Screen
        name="Exit"
        component={Exitapp}
        options={{
          tabBarLabel: <Text style={{fontFamily : "pacifico", textAlign : "center", fontWeight: "bold"}}>종료</Text>,
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('./../../assets/images/round_settings_power_black_36.png')}
              resizeMode="contain"
              style={{width: width*0.08, height: height*0.05, marginTop: -1*height*0.016}}
            />
          )
        }}
      />

    </MaterialBottomTabs.Navigator>
  );

  /*
  return (
    <>
      <Stack.Navigator
      headerMode="none"
      initialRouteName={'intro'}
      drawerContent={(props) => (
        <StackContent
          {...props}
          driverData={driverData}
          logout={() => props.navigation.navigate('AuthFlow')}
        />
      )}>
        <Stack.Screen name="intro" component={Intro} />
        <Stack.Screen name="scanner" component={Scanner} />
        <Stack.Screen name="scanner2" component={Scanner2} />
        <Stack.Screen name="initial" component={Initial} />
        <Stack.Screen name="method" component={Method} />
        <Stack.Screen name="input" component={InputFeatures} />
        <Stack.Screen name="response" component={Response} />
        <Stack.Screen name="recommendation" component={Recommendation} />
        <Stack.Screen name="intro2" component={IntroView2} />
        <Stack.Screen name="ArCamera" component={ArCamera} />
        <Stack.Screen name="ArCamera2" component={ArCamera2} />
      </Stack.Navigator>
    </>
  );
  */

};


/*
const TabNavigator = createMaterialBottomTabNavigator({
    Home: {
      screen: Intro
    },
    Brandstory: {

    },
    Store: {

    },
    OfflineStore: {

    },
    Exit:{
      
    }
  },
  {
    initialRouteName: 'Home',
    activeColor: '#ffffff',
    inactiveColor: '#bda1f7',
    barStyle: { backgroundColor: '#6948f4' },
  }
);
*/


export default MainFlow;
//export default createAppContainer(TabNavigator);
