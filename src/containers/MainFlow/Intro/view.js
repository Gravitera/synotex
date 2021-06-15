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


        {/* intro_contain_back.png  */}
        <ImageBackground source={require("./../../../assets/images/Intro2_background.png")}  style={{width:width,height:height,alignItems: 'center',justifyContent: 'center'}}>
        <View style={{ marginVertical: height / 10 }}>    
        
        
        {/* <Image style={styles.logo}  source={{uri :'https://i.imgur.com/bsIlxZ6_d.webp?maxwidth=1520&fidelity=grand'}} /> */}

          <Image source={require("./../../../assets/images/intro_logo.png")} style={styles.logo}>
          </Image>

          {/* <Image style={styles.logo}  source={require("./../../../assets/images/intro_logo.png")} /> */}
          
          
          <ImageBackground style={{width:248,height:264}}  source={require("./../../../assets/images/intro_back.png")} >
        

          {/* intro_mask.png 80  */}
            <Image style={{marginLeft:-1*width*0.086,marginTop:height*0.11,width:width*0.8,height:width*0.53}} resizeMode="contain" source={require("./../../../assets/images/intro_mask.png")} />
          
          </ImageBackground>
          
          {/* <Text style={{ color: theme.font.color, textAlign: 'center', fontSize: 18 }}>국내최초 AI 마스크 앱</Text> */}
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


          {/*<TouchableOpacity style={{marginBottom:24,width:194,height:35}} onPress={() => props.navigation.navigate('intro2')} > 
        <ImageBackground style={{width:194,height:34,alignItems:'center',justifyContent:'center'}}  source={require("./../../../assets/images/intro_white_button.png")} >
          <Text style={{color:'#214A84'}}>
            알맞는 마스크 찾기  intro_button1
          </Text>
        </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={{marginBottom:24,width:194,height:35}} onPress={() => props.navigation.navigate('ArCamera2')} > 
        <ImageBackground style={{width:194,height:34,alignItems:'center',justifyContent:'center'}}  source={require("./../../../assets/images/intro_white_button.png")} >
          <Text style={{color:'#214A84'}}>
            시노텍스 마스크 가상착용
          </Text>
        </ImageBackground>
        </TouchableOpacity>*/}

          {/* <Button label="알맞는 마스크 찾기"   color="#841584" style={{ backgroundColor: 'white', marginBottom: 24 }} onPress={() => props.navigation.navigate('initial')} /> */}
          {/* <Button label="Synotex 바로가기" onPress={() => Linking.openURL("http://synotexmall.com/")} /> */}
        
        
        {/* <Image style={{width:264,height:206}}  source={require("./../../../assets/images/intro_bottom.png")} /> */}
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