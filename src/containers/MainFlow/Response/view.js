import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import theme from '../../../../theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { CustomHeader } from '../../../components/Header';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { ImageBackground } from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { height, width } = Dimensions.get('window');

const Sound = require('react-native-sound');

const unrecognized = new Sound('unrecognized.mp3', Sound.MAIN_BUNDLE);

const vh = height / 100;
const vw = width / 100;
const ratio = (width - 40) / 534;
let windowHeight = height*0.32;

const ResponseView = (props) => {

  
   
    const storeData = useSelector((store) => store);
    console.log("store",storeData)
    console.log("props : ",props)

    var condition = 0;


    var respmessage = storeData.attendanceReducer.res.ID;
    if (respmessage == "NNetwork"){
      condition = 1;
    };
    if (respmessage == "Unrecognized"){
      unrecognized.play((success) => {
      });
      condition = 2;
    };

  return (
    <>

      <View style={{width: width, height: height}}>
          <Image style={{width: wp("100%"), height: hp("60%")}} resizeMode="cover" source={{ uri: "data:image/jpg;base64," + storeData.attendanceReducer.res.FrontImage }} />
          <View style={{width: wp("100%"), height: hp("40%"), flexDirection:"column"}}>
            <View style={{width: width, height: "7%"}}/>
                {condition == 0?
                <>
                  <Text style={{textAlign:"center", fontSize:12, fontWeight:"600",textAlignVertical:"center", fontFamily: theme.font.bold}}>재측정을 원하시는경우는 재촬영 버튼을 눌러주시거나</Text>
                  <Text style={{textAlign:"center", fontSize:12, fontWeight:"600",textAlignVertical:"center", fontFamily: theme.font.bold}}>결과을 확인하시려면 측정결과 버튼을 눌러주세요</Text>
                  </>
                :null}
                {condition == 1?
                <>
                  <Text style={{textAlign:"center", fontSize:12, fontWeight:"600",textAlignVertical:"center", fontFamily: theme.font.bold}}>인터넷 연결을 확인 해주세요.</Text>
                </>
                :null}
                {condition == 2?
                <>
                  <Text style={{textAlign:"center", fontSize:12, fontWeight:"600",textAlignVertical:"center", fontFamily: theme.font.bold}}>측정을 못 하였습니다.</Text>
                  <Text style={{textAlign:"center", fontSize:12, fontWeight:"600",textAlignVertical:"center", fontFamily: theme.font.bold}}>측정을 정확하게 다시 해주세요.</Text>
                </>
                :null}

            <View style={{ flexDirection: 'row', justifyContent: 'center', width:width, height: "60%", alignItems:"center"}}>
              <TouchableOpacity onPress={() => props.navigation.navigate("input")}>

                <View style={{ width: hp("15%"), height:  hp("15%"), backgroundColor: "#0D3A71", borderRadius: 100, alignItems:"center", flexDirection:"column"}}>
                <View style={{height: "5%"}}/>
                  <Image resizeMode="contain" style={{width:"70%", height:"70%"}}  source={require("./../../../assets/images/camera_image.png")} >
                  </Image>
                  <View style={{height: "5%"}}/>
                  <Text style={{textAlign:"center", fontSize:13, fontWeight:"600",textAlignVertical:"center", fontFamily: theme.font.bold, color:"white" }}>재촬영</Text>
                </View>

                
              </TouchableOpacity>
              <View style={{width: "10%"}}/>
              <TouchableOpacity onPress={props.onNext}>
                

                  <View style={{ width:  hp("15%"), height:  hp("15%"), backgroundColor: "#0D3A71", borderRadius: 100, alignItems:"center", flexDirection:"column"}}>
                    <View style={{height: "10%"}}/>
                    <Image resizeMode="contain" style={{width:"70%", height:"70%"}}  source={require("./../../../assets/images/result_image.png")} >
                    </Image>
                    <Text style={{textAlign:"center", fontSize:13, fontWeight:"600",textAlignVertical:"center", fontFamily: theme.font.bold, color:"white" }}>측정 결과</Text>
                  </View>

              </TouchableOpacity>
            </View>


          </View>


      </View>



    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonOver: {
    // backgroundColor: 'rgba(0,0,0,0.5)',
    width: width - 40,
    zIndex: 120
  },
  progressButton: {
    fontSize: 16,
    fontWeight: "bold",
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: width - 40,
    justifyContent: 'space-between',
    padding: 20,
    borderBottomColor: theme.color.secondary,
    borderBottomWidth: 1,
  },
  heading: {
    fontFamily: theme.font.bold,
    marginBottom: 6,
    fontSize: 16,
    color: theme.font.color
  },
  paragraph: {
    fontFamily: theme.font.regular,
    fontSize: 14,
    color: theme.font.color
  },
  text: {
    fontFamily: theme.font.bold,
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    textAlignVertical: 'center',
    width,
    marginVertical: 20
  },
  text2: {
    fontFamily: theme.font.bold,
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    textAlignVertical: 'center',
    marginLeft:"-40%",
    marginTop: "6%"
  },
  text3: {
    fontFamily: theme.font.bold,
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    textAlignVertical: 'center',
    marginLeft: "-5%",
    marginTop: "8%"
  }
});

export default ResponseView;
