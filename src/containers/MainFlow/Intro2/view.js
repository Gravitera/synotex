import React,{useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  BackHandler
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
      {/*<ImageBackground source={require("./../../../assets/images/Intro2_background.png")}  style={{width:width,height:height,alignItems: 'center',justifyContent: 'center'}}>
        <Image resizeMode="contain" source={require("./../../../assets/images/Intro2_image.png")} style={styles.logo}></Image>
      </ImageBackground>*/}
      <View style={{width: wp("100%"), height: hp("100%"), backgroundColor: "#F2F4FA", alignItems: "center"}}>
          <View style={{width: wp("100%"), height: hp("20%")}}></View>
          <View style={{width: wp("50%"), height: hp("50%"), flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
              <Image resizeMode="contain" style={{resizeMode: "contain", width: "100%", height: "30%"}}  source={require("./../../../assets/images/newdesign/intro2_magnifying.png")} />
              <Image resizeMode="contain" style={{resizeMode: "contain", width: "100%", height: "30%"}}  source={require("./../../../assets/images/newdesign/intro2_text_middle.png")} />
              <Image resizeMode="contain" style={{resizeMode: "contain", width: "100%", height: "30%"}}  source={require("./../../../assets/images/newdesign/intro2_text_last.png")} />
          </View>
      </View>

      {/*
      <View style={{zIndex: 10, position: "absolute", bottom: 0, width: wp("100%"), height: hp("10%"), maxHeight: 80, backgroundColor: "white", flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity onPress={() => props.navigation.navigate('intro')} style={{width: wp("20%"), height: "100%", flexDirection: "column", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{width: "100%", height: "10%"}}></View>
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_home_icon.png")} />
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "45%", height: "20%"}}  source={require("./../../../assets/images/newdesign/bottomtab_home_text.png")} />
          <View style={{width: "100%", height: "10%"}}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Brandstory')} style={{width: wp("20%"), height: "100%", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{width: "100%", height: "10%"}}></View>
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_brandstory_icon.png")} />
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "80%", height: "25%"}}  source={require("./../../../assets/images/newdesign/bottomtab_brandstory_text.png")} />
          <View style={{width: "100%", height: "10%"}}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Store')} style={{width: wp("20%"), height: "100%", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{width: "100%", height: "10%"}}></View>
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_store_icon.png")} />
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "45%", height: "20%"}}  source={require("./../../../assets/images/newdesign/bottomtab_store_text.png")} />
          <View style={{width: "100%", height: "10%"}}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('OfflineStore')} style={{width: wp("20%"), height: "100%", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{width: "100%", height: "10%"}}></View>
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_offline_icon.png")} />
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "80%", height: "20%"}}  source={require("./../../../assets/images/newdesign/bottomtab_offline_text.png")} />
          <View style={{width: "100%", height: "10%"}}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {BackHandler.exitApp()}} style={{width: wp("20%"), height: "100%", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{width: "100%", height: "10%"}}></View>
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_exit_icon.png")} />
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "45%", height: "20%"}}  source={require("./../../../assets/images/newdesign/bottomtab_exit_text.png")} />
          <View style={{width: "100%", height: "10%"}}></View>
        </TouchableOpacity>
      </View>*/}

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
