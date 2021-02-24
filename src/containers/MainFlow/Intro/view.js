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
        <ImageBackground source={require("./../../../assets/images/intro_contain_back.png")}  style={{width:width,height:height,  
          alignItems: 'center',
    justifyContent: 'center'}}>
        <View style={{ marginVertical: height / 10 }}>    
        
        
        {/* <Image style={styles.logo}  source={{uri :'https://i.imgur.com/bsIlxZ6_d.webp?maxwidth=1520&fidelity=grand'}} /> */}

          <Image source={require("./../../../assets/images/intro_logo.png")} style={styles.logo}>
          </Image>

          {/* <Image style={styles.logo}  source={require("./../../../assets/images/intro_logo.png")} /> */}
          
          
          <ImageBackground style={{width:248,height:264}}  source={require("./../../../assets/images/intro_back.png")} >
        

          {/* intro_mask.png 80  */}
          <Image style={{marginLeft:10,marginTop:80,width:264,height:206}}  source={require("./../../../assets/images/intro_mask.png")} />
          
          </ImageBackground>
          
          {/* <Text style={{ color: theme.font.color, textAlign: 'center', fontSize: 18 }}>국내최초 AI 마스크 앱</Text> */}
        </View>

        
        <View>
          <TouchableOpacity style={{marginBottom:24,width:194,height:35}} onPress={() => props.navigation.navigate('intro2')} > 
        <ImageBackground style={{width:194,height:34,alignItems:'center',justifyContent:'center'}}  source={require("./../../../assets/images/intro_white_button.png")} >
          <Text style={{color:'#214A84'}}>
            알맞는 마스크 찾기
          </Text>
        </ImageBackground>
        </TouchableOpacity>
          {/* <Button label="알맞는 마스크 찾기"   color="#841584" style={{ backgroundColor: 'white', marginBottom: 24 }} onPress={() => props.navigation.navigate('initial')} /> */}
          {/* <Button label="Synotex 바로가기" onPress={() => Linking.openURL("http://synotexmall.com/")} /> */}
        </View>
        
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
