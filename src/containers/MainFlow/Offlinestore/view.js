import React,{useEffect, useState} from 'react';
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
import { CustomBrandstoryHeader } from '../../../components/Header';
//import { styles } from '../../../styles/styles';
import { WebView } from 'react-native-webview';
import { PrivateValueStore } from '@react-navigation/core';

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

const Storeoffline = (props) => {


  var [type, setType] = useState("");
  var [mallurl, setMallurl] = useState("");
  
  useEffect(() => {
      const fetchFunc =  (async () =>{
          fetch("https://a96d26d9839f933f1.awsglobalaccelerator.com/offlinemarket", {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(
        {
          "string": "string"
        })
    })
    .then((res) => {
      res.json().then((tempres) => {
        console.log(" ====== tempres  ", tempres);
        setType(tempres.type)
        setMallurl(tempres.url)
      }).catch((error) => {
        console.log("sssssss")
        console.log(error);
        setType(1)
        setMallurl("https://smartstore.naver.com/glocean/notice/list?cp=1")
      });
    }).catch((error) => {
        console.log("sssssss")
      console.log(error);
      setType(1)
      setMallurl("https://smartstore.naver.com/glocean/notice/list?cp=1")
    })
      })

    fetchFunc();
    
  }, []);


//   const openurl = (inputurl) => {
//     Linking.openURL(inputurl);
    // props.navigation.navigate("intro");
//   }


  return (
    <>

      {type == 0 ?
        <WebView source={{ uri: "https://town.daangn.com/bp/1041029" }} />

      :

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

          <TouchableOpacity onPress={() => {Linking.openURL(mallurl)
          props.navigation.navigate("intro");}}>        
            <View style={{alignItems:"center", justifyContent: "center", marginBottom: height*0.17, backgroundColor: "white", width: width*0.5, height: width*0.1, borderRadius: 20}}>
              <Text style={{color:"#0D3A71", fontWeight: "bold"}}>시노텍스 오프라인매장 바로가기</Text>
            </View>
          </TouchableOpacity>

        </ImageBackground>

        </View>
        </>

        
      }

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

export default Storeoffline;
