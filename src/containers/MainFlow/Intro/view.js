import React from 'react';
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

      <View style={{zIndex: 0, width: wp("100%"), height: hp("100%"), backgroundColor: "#0380D8", flexDirection: "column", alignItems:"center"}}>
          <View style={{zIndex: 1, position: "absolute", height: hp("38%"), width: hp("38%"), maxHeight: 354, maxWidth: 354, backgroundColor: "#76B7F2", borderRadius: 500, top: hp("5.3%"), left: wp("-27.3%")}}></View>
          <View style={{zIndex: 2, position: "absolute", height: hp("61.6%"), width: hp("61.6%"), maxHeight: 571, maxWidth: 571, backgroundColor: "#5498D7", borderRadius: 500, top: hp("11.87%"), left: wp("3.97%")}}></View>
          <Image resizeMode="contain" style={{position: "absolute", zIndex: 3, resizeMode: "contain", width: wp("38.31%"), height: hp("12.9%"), maxHeight: 164, maxWidth: 120, top: hp("63.79%"), left: wp("59.63%")}}  source={require("./../../../assets/images/newdesign/intro_cleaning.png")} />


          <Image resizeMode="contain" style={{resizeMode: "contain", zIndex: 3, width: wp("25%"), height: hp("5%"), marginLeft: wp("-60%"), marginTop: hp("12%")}}  source={require("./../../../assets/images/newdesign/intro_synotex.png")} />
          <Image resizeMode="contain" style={{resizeMode: "contain", zIndex: 3, width: wp("35%"), height: hp("5%"), marginLeft: wp("-50%")}}  source={require("./../../../assets/images/newdesign/intro_firstever.png")} />
          <Image resizeMode="contain" style={{resizeMode: "contain", zIndex:4, width: hp("65%"), height: hp("65%"), marginTop: hp("-10%")}}  source={require("./../../../assets/images/newdesign/intro_mask.png")} />
          
          <View style={{flexDirection: "row", alignItems:"center", justifyContent: "center",  width: wp("100%"), bottom: hp("15%"), zIndex: 4, position: "absolute"}}>
              <TouchableOpacity onPress={() => props.navigation.navigate('intro2')} >
                  <ImageBackground resizeMode="contain" style={{width: wp("40%"), height: hp("10%"), maxWidth: 250, maxHeight: 100, resizeMode: "contain", justifyContent: "center", alignItems: "center"}}  source={require("./../../../assets/images/newdesign/intro_startmeasure.png")} >
                      <Text style={{fontWeight: "bold", fontSize: 14}}>마스크 사이즈 측정</Text>
                  </ImageBackground>
              </TouchableOpacity>
              <View style={{width: wp("10%"), height: hp("5%")}}></View>
              <TouchableOpacity onPress={() => props.navigation.navigate('ArCamera2')}>
                  <ImageBackground resizeMode="contain" style={{width: wp("40%"), height: hp("10%"), maxWidth: 250, maxHeight: 100, resizeMode: "contain", justifyContent: "center", alignItems: "center"}}  source={require("./../../../assets/images/newdesign/intro_startmeasure.png")} >
                      <Text style={{fontWeight: "bold", fontSize: 14}}>마스크 착용 해보기</Text>
                  </ImageBackground>
              </TouchableOpacity>
              {/*<View style={{width: wp("10%"), height: hp("10%")}}></View>
              <ImageBackground resizeMode="contain" style={{width: wp("35%"), height: hp("10%"), maxWidth: 164, maxHeight: 100, resizeMode: "contain", justifyContent: "center", alignItems: "center"}}  source={require("./../../../assets/images/newdesign/intro_startmeasure.png")} >
                  <Text style={{fontWeight: "bold", fontSize: 14}}>마스크 사이즈 측정</Text>
              </ImageBackground>
              
              <ImageBackground resizeMode="contain" style={{backgroundColor: "red", width: wp("35%"), height: hp("10%"), maxWidth: 164, maxHeight: 100, resizeMode: "contain", justifyContent: "center", alignItems: "center"}}  source={require("./../../../assets/images/newdesign/intro_startmeasure.png")} >
                  <Text style={{fontWeight: "bold", fontSize: 14}}>마스크 착용 해보기</Text>
              </ImageBackground>
              <View style={{width: wp("10%"), height: hp("10%")}}></View>*/}
          </View>
          
          {/*<Image resizeMode="contain" style={{position: "absolute", zIndex: 3, resizeMode: "contain", width: wp("44.6%"), height: hp("5.6%"), maxWidth: 191, maxHeight: 52, top: hp("15.8%"), left: wp("5.6%")}}  source={require("./../../../assets/images/newdesign/intro_firstever.png")} />
          <Image resizeMode="contain" style={{position: "absolute", zIndex: 4, resizeMode: "contain", width: wp("116%"), height: wp("116%"), maxHeight: 461, maxWidth: 461, top: hp("20.36%"), left: wp("-5%")}}  source={require("./../../../assets/images/newdesign/intro_mask.png")} />
          <Image resizeMode="contain" style={{position: "absolute", zIndex: 3, resizeMode: "contain", width: wp("38.31%"), height: hp("12.9%"), maxHeight: 164, maxWidth: 120, top: hp("63.79%"), left: wp("59.63%")}}  source={require("./../../../assets/images/newdesign/intro_cleaning.png")} />
          */}


          {/*<View style={{flexDirection: "row", alignItems: "center", position: "absolute", bottom: hp("10%"), width: wp("100%"), height: hp("10%"), zIndex: 4}}>
              <View style={{width: wp("6.6%"), height: hp("10%")}}></View>
              <ImageBackground resizeMode="contain" style={{width: wp("40%"), height: hp("10%"), maxWidth: 164, maxHeight: 100, resizeMode: "contain", justifyContent: "center", alignItems: "center"}}  source={require("./../../../assets/images/newdesign/intro_startmeasure.png")} >
                  <Text style={{fontWeight: "bold", fontSize: 14}}>마스크 사이즈 측정</Text>
              </ImageBackground>
              <View style={{width: wp("6.6%"), height: hp("10%")}}></View>
              <ImageBackground resizeMode="contain" style={{width: wp("40%"), height: hp("10%"), maxWidth: 164, maxHeight: 100, resizeMode: "contain", justifyContent: "center", alignItems: "center"}}  source={require("./../../../assets/images/newdesign/intro_startmeasure.png")} >
                  <Text style={{fontWeight: "bold", fontSize: 14}}>마스크 착용 해보기</Text>
              </ImageBackground>
              <View style={{width: wp("6.6%"), height: hp("10%")}}></View>
          </View>*/}

      </View>

  

      {/*<View style={styles.container}>

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
        
      </View>*/}

      <View style={{zIndex: 10, position: "absolute", bottom: 0, width: wp("100%"), height: hp("10%"), maxHeight: 80, backgroundColor: "#F2F4FA", flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity onPress={() => props.navigation.navigate('intro')} style={{width: wp("20%"), height: "100%", flexDirection: "column", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{width: "100%", height: "10%"}}></View>
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_home_icon_checked.png")} />
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "45%", height: "20%"}}  source={require("./../../../assets/images/newdesign/bottomtab_home_text_checked.png")} />
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