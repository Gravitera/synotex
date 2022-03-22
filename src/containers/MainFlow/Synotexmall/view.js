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
import { WebView } from 'react-native-webview';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

const Mallsynotex = (props) => {

  /*
  useEffect(() => {
    Linking.openURL("https://www.synotexmall.com")
    return () => {
      Linking.removeAllListeners();
    };
  }, []);
  */
  

  return (
    <>


      <View style={styles.container}>


      <ImageBackground source={require("./../../../assets/images/Intro2_background.png")}  style={{width:width,height:height,alignItems: 'center',justifyContent: 'center'}}>
        
        {/*<View style={{ marginVertical: height / 10 }}>    
        
          <Image source={require("./../../../assets/images/intro_logo.png")} style={styles.logo}>
          </Image>

          <ImageBackground style={{width:248,height:264}}  source={require("./../../../assets/images/intro_back.png")} >
            <Image style={{marginLeft:-1*width*0.086,marginTop:height*0.11,width:width*0.8,height:width*0.53}} resizeMode="contain" source={require("./../../../assets/images/intro_mask.png")} />
          </ImageBackground>
          
        </View>*/}
        <View style={{width: wp("100%"), height: hp("10%")}}/>

        <Image source={require("./../../../assets/images/intro_logo.png")} style={{height: hp("10%")}} resizeMode="contain"/>

        <View style={{width: wp("100%"), height: hp("5%")}}/>

        <ImageBackground style={{width: hp("35%"), height: hp("35%")}} resizeMode="contain" source={require("./../../../assets/images/intro_back.png")} >
          <Image style={{width: "105%", height: "100%", marginLeft: -10, marginTop: "20%"}} resizeMode="contain" source={require("./../../../assets/images/intro_mask.png")} />
        </ImageBackground>

        <View style={{width: wp("100%"), height: hp("10%")}}/>

        <TouchableOpacity onPress={() => props.navigation.navigate('Onlinemall')}>        
          <View style={{alignItems:"center", justifyContent: "center", marginBottom: height*0.17, backgroundColor: "white", width: width*0.5, height: width*0.1, borderRadius: 20}}>
            <Text style={{color:"#0D3A71", fontWeight: "bold"}}>시노텍스 공식몰 바로가기</Text>
          </View>
        </TouchableOpacity>

      </ImageBackground>

      </View>

    </>
  )



}

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

/*
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
*/

export default Mallsynotex;
