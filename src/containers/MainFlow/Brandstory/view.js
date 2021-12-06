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

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

const Brandstory = (props) => {


  return (
    <>

        {/*<CustomBrandstoryHeader title={"브랜드 스토리"}/>*/}
          <View style={styles.headerContainerbrandstory}>
            <TouchableOpacity
              style={styles.drawerTrigger}
            >
            </TouchableOpacity>
            <Text style={styles.heading}>브랜드 스토리</Text>
            <TouchableOpacity
              style={styles.drawerTrigger}
            >
            </TouchableOpacity>
          </View>

        <ScrollView style={{ flex: 1, marginTop: height*0.02, paddingTop: 0, zIndex: 5}}>
          <View style={{flexDirection: "column", alignItems: "center", justifyContent:"center"}}>
            <ImageBackground resizeMode="contain" source={require("./../../../assets/images/brandstorytopone.png")} style={styles.topimage}>
              <ImageBackground resizeMode="contain" source={require("./../../../assets/images/brandstorytoponeimage.png")} style={styles.temptopimage}>
              </ImageBackground>
            </ImageBackground>
            <ImageBackground resizeMode="contain" source={require("./../../../assets/images/blackimage.png")} style={styles.topblackimage}>
            </ImageBackground>
            <ImageBackground resizeMode="contain" source={require("./../../../assets/images/brandstorytoptwo.png")} style={styles.topimagetwo}>
            </ImageBackground>
            <ImageBackground resizeMode="contain" source={require("./../../../assets/images/brandstorytopthreeimage.png")} style={styles.topimagethree}>
            </ImageBackground>
            <ImageBackground resizeMode="contain" source={require("./../../../assets/images/brandstorytopfourimage.png")} style={styles.topimagefour}>
            </ImageBackground>
            <ImageBackground resizeMode="contain" source={require("./../../../assets/images/brandstorytopfiveimage.png")} style={styles.topimagefive}>
            </ImageBackground>
            <ImageBackground resizeMode="contain" source={require("./../../../assets/images/brandstorytopsix.png")} style={styles.topimagesix}>
            </ImageBackground>
            </View>
        </ScrollView>

    </>
  );
};

const styles = StyleSheet.create({ 
  logo:{
    width: 300,
    height: 300,
  },
  topimage:{
    width: width*0.95,
    height: height*0.95,
    marginTop: height*0.015,
    marginLeft: width*0.03,
    justifyContent: "center",
    zIndex: 10,

  },
  temptopimage:{
    width: width*0.92,
    height: height*0.75,
    justifyContent: "center",
    marginTop: -200,
    marginLeft: width*0.0,
    zIndex: 10,

  },
  topblackimage:{
    width: width*0.93,
    height: height*0.7,
    justifyContent: "center",
    marginTop: -1*height*0.1,
    marginLeft: width*0.0,
    zIndex: 10,

  },
  topimagetwo:{
    width: width*0.9,
    height: height*1,
    marginTop: -1*height*0.43,
    marginLeft: 0,
    justifyContent: "center",
    zIndex: 10,

  },
  topimagethree:{
    width: width*0.9,
    height: height*1.4,
    marginTop: -1*height*0.63,
    marginLeft: width*0,
    justifyContent: "center",
    zIndex: 10,

  },
  topimagefour:{
    width: width*0.9,
    height: height*1.4,
    marginTop: -1*height*0.57,
    marginLeft: width*0,
    justifyContent: "center",
    zIndex: 10,

  },
  topimagefive:{
    width: width*0.9,
    height: height*1.4,
    marginTop: -1*height*0.58,
    marginLeft: width*0,
    justifyContent: "center",
    zIndex: 10,

  },
  topimagesix:{
    width: width*0.7,
    height: height*0.2,
    marginTop: -1*height*0.35,
    marginLeft: width*0,
    justifyContent: "center",
    zIndex: 10,

  },








  headerContainerbrandstory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#0D3A71",
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 499,
    height: height*0.08
  },
  drawerTrigger: {
    // backgroundColor: 'green',
    // height: 72,
    // width: 64,,
    padding: 20,
    paddingRight: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: "#fff"
  },
  heading: {

    fontFamily: "Nunito-Bold",
    fontSize: 18,
    fontWeight: '600',
    color: "#fff"
  },

});

export default Brandstory;
