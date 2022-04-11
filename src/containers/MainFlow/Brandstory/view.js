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
import { CustomBrandstoryHeader } from '../../../components/Header';
//import { styles } from '../../../styles/styles';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

const Brandstory = (props) => {


  return (
    <>

        {/*<CustomBrandstoryHeader title={"브랜드 스토리"}/>*/}
          
          {/*<View style={styles.headerContainerbrandstory}>
            <TouchableOpacity
              style={styles.drawerTrigger}
            >
            </TouchableOpacity>
            <Text style={styles.heading}>브랜드 스토리</Text>
            <TouchableOpacity
              style={styles.drawerTrigger}
            >
            </TouchableOpacity>
          </View>*/}

        <View style={{justifyContent: "center", alignItems: "center",width: wp("100%"), height: hp("8%"), backgroundColor: "#F2F4FA", position: "absolute", top: 0, zIndex: 7}}>
            <Image resizeMode="contain" source={require("./../../../assets/images/newdesign/brandstory_header_text.png")} style={{resizeMode: "contain",  width: "35%", height: "80%"}}/>
        </View>
        


        <ScrollView style={{ flex: 1, marginTop: hp("8%"), paddingTop: 0, zIndex: 5}}>
          <View style={{flexDirection: "column", alignItems: "center", justifyContent:"center"}}>
            <Image resizeMode="contain" source={require("./../../../assets/images/brandstorytoponeTOP.png")} style={{resizeMode: "contain",  width: wp("100%"), marginTop: 20}}/>
            <Image resizeMode="contain" source={require("./../../../assets/images/brandstorytoponeimage.png")} style={{resizeMode: "contain",  width: wp("100%")}}/>
            <Image resizeMode="contain" source={require("./../../../assets/images/brandstorytoponeBOTTOM.png")} style={{resizeMode: "contain",  width: wp("100%")}}/>
            <Image resizeMode="contain" source={require("./../../../assets/images/blackimage.png")} style={{resizeMode: "contain",  width: wp("100%"), marginTop: 20}}/>
            <Image resizeMode="contain" source={require("./../../../assets/images/brandstorytoptwo.png")} style={{resizeMode: "contain",  width: wp("100%"), marginTop: 20}}/>
            <Image resizeMode="contain" source={require("./../../../assets/images/brandstorytopthreeimage.png")} style={{resizeMode: "contain",  width: wp("100%"), marginTop: 20}}/>
            <Image resizeMode="contain" source={require("./../../../assets/images/brandstorytopfourimage.png")} style={{resizeMode: "contain",  width: wp("100%")}}/>
            <Image resizeMode="contain" source={require("./../../../assets/images/brandstorytopfiveimage.png")} style={{resizeMode: "contain",  width: wp("100%")}}/>
            <Image resizeMode="contain" source={require("./../../../assets/images/brandstorytopsix.png")} style={{resizeMode: "contain",  width: wp("100%"), marginTop: 20}}/>
            <View style={{width: wp("100%"), height: 20}}/>
          </View>
        </ScrollView>

        <View style={{zIndex: 10, position: "absolute", bottom: 0, width: wp("100%"), height: hp("10%"), maxHeight: 80, backgroundColor: "#F2F4FA", flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity onPress={() => props.navigation.navigate('intro')} style={{width: wp("20%"), height: "100%", flexDirection: "column", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{width: "100%", height: "10%"}}></View>
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_home_icon.png")} />
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "45%", height: "20%"}}  source={require("./../../../assets/images/newdesign/bottomtab_home_text.png")} />
          <View style={{width: "100%", height: "10%"}}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Brandstory')} style={{width: wp("20%"), height: "100%", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{width: "100%", height: "10%"}}></View>
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_brandstory_icon_checked.png")} />
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "80%", height: "25%"}}  source={require("./../../../assets/images/newdesign/bottomtab_brandstory_text_checked.png")} />
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
      </View>

  

    </>
  );
};

const styles = StyleSheet.create({ 
  logo:{
    width: 300,
    height: 300,
  },
  topimage:{
    width: wp("95%"),
    height: hp("10%"),
    marginTop: hp("1.5%"),
    marginLeft: wp("3%"),
    justifyContent: "center",
    alignItems:"center",
    zIndex: 10,
    backgroundColor:"yellow"
  },
  topimage2:{
    width: width*0.95,
    height: height*0.95,
    marginTop: height*0.015,
    marginLeft: width*0.03,
    justifyContent: "center",
    alignItems:"center",
    zIndex: 10,

  },
  temptopimage:{
    width: "75%",
    height: "30%",
    justifyContent: "center",
    marginTop: "0%",
    marginLeft: width*0.0,
    zIndex: 10,
    backgroundColor:"yellow"

  },
  temptopimage2:{
    width: width*0.55,
    height: height*0.75,
    justifyContent: "center",
    marginTop: -1*height*0.295,
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
  topblackimage2:{
    width: width*0.55,
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
  topimagetwo2:{
    width: width*0.55,
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
  topimagethree2:{
    width: width*0.55,
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
  topimagefour2:{
    width: width*0.55,
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
  topimagefive2:{
    width: width*0.55,
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
  topimagesix2:{
    width: width*0.4,
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
