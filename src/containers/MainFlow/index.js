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
import Feedback from './Feedback';
import DrawerContent from '../../components/Drawer';
import Scanner from './Scanner';
import Scanner2 from './Scanner2';
// import ResetPasswordEmail from './ResetPasswordEmail'
import ResetPasswordEmail from './ResetPasswordEmail';
import ResetOldPassword from './ResetOldPassword';
import LogOut from './LogOut';
import ResetNewPin from './ResetNewPin';
import { getStorageItem } from '../../utils';
import io from 'socket.io-client';
import Geolocation from 'react-native-geolocation-service';
import Intro from './Intro';
import Method from './Method';
import Initial from './Initial';
import InputFeatures from './InputFeatures';
import Response from './Response';
import Recommendation from './Recommendation';
import IntroView2 from './Intro2';
import ArCamera from './ArCamera';
// import { requestLocationPermission } from './../../utils'
import { createStackNavigator } from '@react-navigation/stack';

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
  const Stack = createStackNavigator();

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
        {/* <Stack.Screen name="feedback" component={Feedback} /> */}
        {/* <Stack.Screen name="ResetPassword" component={ResetPasswordEmail} /> */}
        {/* <Stack.Screen name="ResetOldPassword" component={ResetOldPassword} />
        <Stack.Screen name="ResetNewPin" component={ResetNewPin} />
        <Stack.Screen name="LogOut" component={LogOut} /> */}
      </Stack.Navigator>
    </>
  );
};

export default MainFlow;
