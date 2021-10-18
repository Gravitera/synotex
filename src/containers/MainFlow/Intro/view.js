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

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;


const IntroView = (props) => {


  return (
    <>
      <View style={styles.container}>


        <ImageBackground source={require("./../../../assets/images/Intro2_background.png")}  style={{width:width,height:height,alignItems: 'center',justifyContent: 'center'}}>
          <View style={{ marginVertical: height / 10 }}>    
          
            <Image source={require("./../../../assets/images/intro_logo.png")} style={styles.logo}>
            </Image>

            <ImageBackground style={{width:248,height:264}}  source={require("./../../../assets/images/intro_back.png")} >
              <Image style={{marginLeft:-1*width*0.086,marginTop:height*0.11,width:width*0.8,height:width*0.53}} resizeMode="contain" source={require("./../../../assets/images/intro_mask.png")} />
            </ImageBackground>
            
          </View>

          
          <View style={{alignItems:"center", flexDirection: "row", justifyContent: "space-between", marginBottom: height*0.17}}>

            <TouchableOpacity style={{width:width*0.3, height:height*0.075, backgroundColor: "white", borderRadius: 10}} onPress={() => props.navigation.navigate('intro2')} >
              <Image resizeMode="contain" style={{width:width*0.33,height:height*0.065,alignItems:'center',justifyContent:'center', marginLeft:-1*width*0.01, marginTop: height*0.005}}  source={require("./../../../assets/images/intro_button_inside1.png")} >
              </Image>
            </TouchableOpacity>

            <View style={{width:width*0.05}}>
            </View>
            
            <TouchableOpacity style={{width:width*0.3,height:height*0.075, backgroundColor: "white", borderRadius: 10}} onPress={() => props.navigation.navigate('ArCamera2')} >
              <Image resizeMode="contain" style={{width:width*0.35,height:height*0.05,alignItems:'center',justifyContent:'center', marginLeft:width*0.01, marginTop: height*0.008}}  source={require("./../../../assets/images/intro_button_inside2.png")} >
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