import { StackActions } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { View, Image, Dimensions } from 'react-native'
import theme from '../../../theme'
import { getStorageItem, setStorageItem } from '../../utils'

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

const Splash = (props) => {

  useEffect(() => {
    (async () => {
      let userId = await getStorageItem("UserData")
      let drivers = await getStorageItem("Drivers")
      console.log("DRIVERS SPLASH", drivers)
      console.log("Initial ==>", userId)
      if (userId) {
        props.navigation.dispatch(
          StackActions.replace('MainFlow')
        )
      } else if (!drivers) {
        props.navigation.dispatch(
          StackActions.replace('AuthFlow', { screen: "LoginEmail" })
        )
      }
      else {
        props.navigation.dispatch(
          StackActions.replace('AuthFlow', { screen: "AlreadyVerified" })
        )
      }



    })()
  }, []); 

  return (
    <>
    <View style={{width:width,height:height,alignItems: 'center',justifyContent: 'center', backgroundColor: "white"}}>
      <View style={{ flex: 1, justifyContent: 'center', resizeMode: "contain", alignItems: 'center', backgroundColor: "white"}}>
        <Image style={{ width: 350, height: 350, flex:1, resizeMode: "contain"}} source={require("./../../assets/images/logo.png")} />
      </View>
    </View>
    </>
  );
}

export default Splash
