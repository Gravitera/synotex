import React,{useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import theme from '../../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomDrawerButtonHeader } from '../../../components/Header';
import Button from './../../../components/Button'
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';

const { width, height } = Dimensions.get('window');

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const vh = height / 100;
const vw = width / 100;

const IntroView2 = (props) => {


    useEffect(() => {
        setTimeout(() => {
          props.navigation.navigate("input");
        },750);
      });

      console.log(" window width     ", width,"     ", height);

//   setTimeout(() => {
//     props.navigation.navigate('input'); //this.props.navigation.navigate('Login')
//   }, 1000); 
  return (
    <>
      <ImageBackground source={require("./../../../assets/images/Intro2_background.png")}  style={{width:width,height:height,alignItems: 'center',justifyContent: 'center'}}>
        <Image resizeMode="contain" source={require("./../../../assets/images/Intro2_image.png")} style={styles.logo}></Image>
      </ImageBackground>

    </>
  );
};

const styles = StyleSheet.create({
  logo:{
    width: 300,
    height: 300
  }
});

export default IntroView2;
