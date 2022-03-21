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
import { CustomBrandstoryHeader } from '../../../components/Header';
//import { styles } from '../../../styles/styles';
import {BackHandler, Platform} from "react-native";
import RNExitApp from 'react-native-exit-app';

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

const Appexit = (props) => {

  if (Platform.OS === "android"){
    BackHandler.exitApp();
  }
  if (Platform.OS === "ios"){
    RNExitApp.exitApp();
  }


  return (
    <>
      <View style={{backgroundColor: "blue"}}>
        
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logo:{
    width: 300,
    height: 300
  },
  topimage:{
    width: width*0.99,
    height: height*0.5,
    marginTop: height*0.08,
    marginLeft: width*0.035
  },
  bottomimage:{
    width: width*1,
    height: height*0.33,
    marginTop: -1*height*0.02,
    marginLeft: -1*width*0.00
  }

});

export default Appexit;
