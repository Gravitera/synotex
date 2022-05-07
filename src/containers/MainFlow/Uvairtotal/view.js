import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  BackHandler,
  PermissionsAndroid,
  Platform
} from 'react-native';
import theme from '../../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomDrawerButtonHeader } from '../../../components/Header';
import Button from './../../../components/Button'
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ThemeProvider } from 'react-native-paper';

import Geolocation from 'react-native-geolocation-service';


const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

  const getIosCurrentLocation = async (callback) => {
    Geolocation.getCurrentPosition(
      (position) => {
        callback(position.coords);
      },
      (error) => {
        console.log(error);
        if (error.code === 1) {
          openLocationSettings();
        } else if (error.code === 5) {
          Alert.alert('다시 시도하여 확인을 눌러주세요.');
          // Toast.show({text: '다시 시도하여 확인을 눌러주세요.', position: 'top', textStyle: {textAlign: 'center'}})
        } else {
          Alert.alert('위치를 끄고 다시 시도해 보세요.');
          // Toast.show({text: '위치를 불러오지 못했습니다.', position: 'top', textStyle: {textAlign: 'center'}})
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 7000 }
    );
  };



class Totaluvair extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
        location: "부산 해운대구 중동",
        measurementlocation: "부산시 좌동 측정소",
        datetime: "2022-05-02 12:50 PM",
        overall: "good",
        pm50: "40",
        pm25: "20",
        co2: "20",
        co: "10",
        so2: "5",
        ozone: "12",
        citiesdata: {
            "서울": "보통",
            "경기도": "보통",
            "강원도": "나쁨",
            "제주도": "매우나쁨"
        }
      }
  }

  componentDidMount(){
    //const { latitude, longitude } = await getDeviceCurrentLocation();
    //console.log(" ========== latitude    ", latitude);
    //console.log(" ========== longitude    ", longitude);
    Geolocation.getCurrentPosition(
        (position) => {
          //console.log(position.coords);
          console.log(" ==========  latitude    ", position.coords.latitude);
          console.log(" ==========  longitude    ", position.coords.longitude);
          // negative longitude means WEST and positive longitude means EAST
          // negative latitude means SOUTH and positive latitude means NORTH
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );


  }

  render(){

    
      return(
          <>
            <View style={{flex: 1, backgroundColor: "white"}}>
                <ScrollView style={{width: wp("100%")}}>

                    <View id={"empty block"} style={{width: wp("100%"), height: hp("20%")}}></View>

                    <View id={"address and datetime"} style={{width: wp("100%"), height: hp("10%"), flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <Text style={{fontWeight: "700", fontSize: hp("2.5%")}}>{this.state.location}</Text>
                        <View style={{width: wp("1%"), height: hp("1%")}}></View>
                        <Text style={{fontSize: hp("2.5%")}}>{this.state.datetime}</Text>
                    </View>

                    <View id={"airquality gif"} style={{width: wp("100%"), height: hp("35%"), alignItems: "center"}}>
                        {this.state.overall == "good" ?
                            <Image resizeMode={'contain'} style={{resizeMode: "contain", width: "80%", height: "100%"}} source={require("../../../assets/images/newdesign/airquality_good.gif")} />
                        :null}
                        {this.state.overall == "average" ?
                            <Image resizeMode={'contain'} style={{resizeMode: "contain", width: "80%", height: "100%"}} source={require("../../../assets/images/newdesign/airquality_average.gif")} />
                        :null}
                        {this.state.overall == "bad" ?
                            <Image resizeMode={'contain'} style={{resizeMode: "contain", width: "80%", height: "100%"}} source={require("../../../assets/images/newdesign/airquality_bad.gif")} />
                        :null}
                        {this.state.overall == "worst" ?
                            <Image resizeMode={'contain'} style={{resizeMode: "contain", width: "80%", height: "100%"}} source={require("../../../assets/images/newdesign/airquality_very_bad.gif")} />
                        :null}
                    </View>






                </ScrollView>
            </View>
          </>
      )
  }

}

export default Totaluvair