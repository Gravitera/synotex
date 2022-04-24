import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  BackHandler,
  PermissionsAndroid,
  Platform
} from 'react-native';
import theme from '../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomDrawerButtonHeader } from '../../components/Header';
import Button from './../../components/Button'
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

const Bottomtab = (name) => {

    console.log(" ============   bottomtab  name     ", name);

    return name == "IntroFocused" ?
    (
        <>
            <View style={{width: "100%", height: "10%"}}></View>
            <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../assets/images/newdesign/bottomtab_home_icon_checked.png")} />
            {/*<Image resizeMode="contain" style={{resizeMode: "contain", width: "45%", height: "20%"}}  source={require("./../../assets/images/newdesign/bottomtab_home_text_checked.png")} />*/}
            <View style={{width: "100%", height: "10%"}}></View>
        </>
    )
    :
    (
        <>
            <View style={{width: "100%", height: "10%"}}></View>
            <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../assets/images/newdesign/bottomtab_home_icon.png")} />
            {/*<Image resizeMode="contain" style={{resizeMode: "contain", width: "45%", height: "20%"}}  source={require("./../../assets/images/newdesign/bottomtab_home_text_checked.png")} />*/}
            <View style={{width: "100%", height: "10%"}}></View>
        </>
    )

}

export default Bottomtab;