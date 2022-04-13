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
import { WebView } from 'react-native-webview';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const { height, width } = Dimensions.get('window');

class Mallsynotex extends React.Component {

  constructor(props) {
      super(props)
  
      this.state = {
        onlineurl: "",
        offlineurl: "",
      }
  }

  componentDidMount() {
      //fetch("https://a96d26d9839f933f1.awsglobalaccelerator.com/splash", {
      fetch("https://synotexmasks.s3.ap-northeast-2.amazonaws.com/mallurl/mallurl.json",{
          mode: 'no-cors',
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*"
          },})
          .then((res) => res.json())
          .then((resdata) => {
              console.log('splash RESPONSE SUCCESS =>', resdata);
              this.setState({onlineurl: resdata.online});
              this.setState({offlineurl: resdata.offline});

      })
    }


    render(){

      const { height, width } = Dimensions.get('window');

      const vh = height / 100;
      const vw = width / 100;

      return (
        <>
  
        <View style={{zIndex:1, width: wp("100%"), height: hp("100%")}}>
            <View style={{width: wp("100%"), height: hp("4.0%")}}></View>
            <Image resizeMode="contain" style={{zIndex: 1, marginLeft: wp("10%"), resizeMode: "contain", width: "33%", height: "6%"}}  source={require("./../../../assets/images/newdesign/synotexmall_text_top.png")} />
            <Image resizeMode="contain" style={{zIndex:1, marginLeft: wp("10%"), resizeMode: "contain", width: "45%", height: "3%"}}  source={require("./../../../assets/images/newdesign/synotexmall_text_last.png")} />
            
        </View>
  
        <Image style={{zIndex:0, position:"absolute", resizeMode: "cover", width: wp("100%"), height: hp("100%")}}  source={require("./../../../assets/images/newdesign/synotexmall_youtuber.png")} />
        
        <View style={{zIndex:1, bottom: hp("10%"), position:"absolute", width: wp("100%"), height: hp("10%"), alignItems:"center", flexDirection: "row"}}>
            <View style={{width: "25%", height: "100%"}}></View>
            <TouchableOpacity onPress={() => Linking.openURL(this.state.onlineurl)} style={{width: "50%", height: "80%"}}>
                <ImageBackground resizeMode="contain" style={{zIndex: 2,  resizeMode: "contain", width: "100%", height: "100%", alignItems:"center"}}  source={require("./../../../assets/images/newdesign/synotexmall_blue_box.png")} >
                    <Image resizeMode="contain" style={{zIndex: 2,  resizeMode: "contain", width: "60%", height: "100%"}}  source={require("./../../../assets/images/newdesign/synotexmall_blue_text.png")} />
                </ImageBackground>
            </TouchableOpacity>
            <View style={{width: "25%", height: "100%"}}></View>
        </View>
  
        <View style={{zIndex: 10, position: "absolute", bottom: 0, width: wp("100%"), height: hp("10%"), maxHeight: 80, backgroundColor: "#F2F4FA", flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('intro')} style={{width: wp("20%"), height: "100%", flexDirection: "column", justifyContent: "space-between", alignItems:"center"}}>
            <View style={{width: "100%", height: "10%"}}></View>
            <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_home_icon.png")} />
            <Image resizeMode="contain" style={{resizeMode: "contain", width: "45%", height: "20%"}}  source={require("./../../../assets/images/newdesign/bottomtab_home_text.png")} />
            <View style={{width: "100%", height: "10%"}}></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Brandstory')} style={{width: wp("20%"), height: "100%", justifyContent: "space-between", alignItems:"center"}}>
            <View style={{width: "100%", height: "10%"}}></View>
            <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_brandstory_icon.png")} />
            <Image resizeMode="contain" style={{resizeMode: "contain", width: "80%", height: "25%"}}  source={require("./../../../assets/images/newdesign/bottomtab_brandstory_text.png")} />
            <View style={{width: "100%", height: "10%"}}></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Store')} style={{width: wp("20%"), height: "100%", justifyContent: "space-between", alignItems:"center"}}>
            <View style={{width: "100%", height: "10%"}}></View>
            <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_store_icon_checked.png")} />
            <Image resizeMode="contain" style={{resizeMode: "contain", width: "45%", height: "20%"}}  source={require("./../../../assets/images/newdesign/bottomtab_store_text_checked.png")} />
            <View style={{width: "100%", height: "10%"}}></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('OfflineStore')} style={{width: wp("20%"), height: "100%", justifyContent: "space-between", alignItems:"center"}}>
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



      )

    }



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


export default Mallsynotex;
