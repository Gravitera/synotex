import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground
} from 'react-native';
import theme from '../../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomDrawerButtonHeader } from '../../../components/Header';
import Button from './../../../components/Button'
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;


const IntroView = (props) => {

  console.log(" window width     ", width,"     ", height);
  console.log("=============================== ");
  console.log("=============================== ");
  console.log("=============================== ");
  console.log("=============================== ");
  console.log("=============================== ");
  return (
    <>

      <View style={styles.container}>

        <ImageBackground source={require("./../../../assets/images/Intro2_background.png")}  style={{width:wp("100%"),height:hp("100%"),flexDirection: "column", alignItems:"center"}}>

            <View style={{width: wp("100%"), height: hp("10%")}}/>

            <Image source={require("./../../../assets/images/intro_logo.png")} style={{height: hp("7%")}} resizeMode="contain"/>
            
            <View style={{width: wp("100%"), height: hp("5%")}}/>

            <ImageBackground style={{width: hp("35%"), height: hp("35%")}} resizeMode="contain" source={require("./../../../assets/images/intro_back.png")} >
              <Image style={{width: "105%", height: "100%", marginLeft: -10, marginTop: "20%"}} resizeMode="contain" source={require("./../../../assets/images/intro_mask.png")} />
            </ImageBackground>

            <View style={{width: wp("100%"), height: hp("10%")}}/>

            <View style={{alignItems:"center", flexDirection: "row"}}>
              
              <TouchableOpacity style={{width: wp("30%"), height: hp("7.5%"), backgroundColor: "white", borderRadius: 10}} onPress={() => props.navigation.navigate('intro2')} >
                <Image resizeMode="contain" style={{width:wp("33%"),height:hp("6.5%"),alignItems:'center',justifyContent:'center', marginLeft:-1*width*0.01, marginTop: height*0.005}}  source={require("./../../../assets/images/intro_button_inside1.png")} >
                </Image>
              </TouchableOpacity>

              <View style={{width:wp("5%")}}>
              </View>
              
              <TouchableOpacity style={{width: wp("30%"), height: hp("7.5%"), backgroundColor: "white", borderRadius: 10}} onPress={() => props.navigation.navigate('ArCamera2')} >
                <Image resizeMode="contain" style={{width:wp("35%"),height:hp("5%"),alignItems:'center',justifyContent:'center', marginLeft:width*0.01, marginTop: height*0.008}}  source={require("./../../../assets/images/intro_button_inside2.png")} >
                </Image>
              </TouchableOpacity>

            </View>

        </ImageBackground>
        
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  logo:{
    marginLeft:20,
    width:184,
    height:51,
    marginBottom: 65
  },
  container: {
    width:width,
    height:height,    
    backgroundColor: '#214A84',
  },
  cardContainer: {
    paddingTop: 10,
    paddingHorizontal: 20
  },
  heading: {
    fontFamily: theme.font.bold,
    fontSize: 16,
  },
  paragraph: {
    fontFamily: theme.font.regular,
    fontSize: 14,
    marginBottom: 30,
  },
});

export default IntroView;