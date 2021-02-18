import { StackActions } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { View, Image } from 'react-native'
import theme from '../../../theme'
import { getStorageItem, setStorageItem } from '../../utils'

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
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.color.light }}>
      <Image style={{ width: 150, height: 150 }} source={require("../../assets/images/logo.png")} />
    </View>
  )
}

export default Splash
