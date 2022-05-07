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
import { CustomBackForwardButtonHeader3 } from '../../../components/Header';

const { height, width } = Dimensions.get('window');


const Storeoffline = (url) => {
  console.log(" ============  Storeoffline url     ", url);
  console.log(" ============  Storeoffline url     ", url);
  console.log(" ============  Storeoffline url     ", url);
  return (
    <>

        <WebView source={{ uri: url + '?time=' + Date.now().toString().substring(0,10) + "000", cache: 'reload'}} style={{position: "absolute", zIndex: 5, width: wp("100%"), height: hp("100%")}}/>

    </>
  )
}


class Mallsynotex extends React.Component {

  constructor(props) {
      super(props)
  
      this.state = {
        onlineurl: "",
        offlineurl: "",
        offlineclicked: false
      }
  }

  componentDidMount() {
      //fetch("https://a96d26d9839f933f1.awsglobalaccelerator.com/splash", {
      fetch("https://synotexmasks.s3.ap-northeast-2.amazonaws.com/mallurl/mallurl.json"  + '?time=' + Date.now().toString().substring(0,10) + "000",{
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

      console.log(" ========== offlineclicked    ", this.state.offlineclicked);

      return (
        <>

        {this.state.offlineclicked ? 
        <>
          <CustomBackForwardButtonHeader3 title={"오프라인몰"} backFunction={() => this.setState({offlineclicked: false})} />
          <WebView source={{ uri: this.state.offlineurl + '?time=' + Date.now().toString().substring(0,10) + "000", cache: 'reload'}} style={{position: "absolute", width: wp("100%"), height: hp("100%")}}/>
        </>
        :
        null}
  
        {!this.state.offlineclicked ? 

        <>
        <View style={{zIndex:1, width: wp("100%"), height: hp("100%")}}>
            <View style={{width: wp("100%"), height: hp("4.0%")}}></View>
            <Image resizeMode="contain" style={{zIndex: 1, marginLeft: wp("10%"), resizeMode: "contain", width: "33%", height: "6%"}}  source={require("./../../../assets/images/newdesign/synotexmall_text_top.png")} />
            <Image resizeMode="contain" style={{zIndex:1, marginLeft: wp("10%"), resizeMode: "contain", width: "45%", height: "3%"}}  source={require("./../../../assets/images/newdesign/synotexmall_text_last.png")} />
            
        </View>
  
        <Image style={{zIndex:0, position:"absolute", resizeMode: "cover", width: wp("100%"), height: hp("100%")}}  source={require("./../../../assets/images/newdesign/synotexmall_youtuber.png")} />
        
        <View style={{zIndex:1, bottom: hp("10%"), position:"absolute", width: wp("100%"), height: hp("10%"), alignItems:"center", flexDirection: "row"}}>
            
            <View style={{ width: "100%", height: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                
                
                <TouchableOpacity onPress={() => Linking.openURL(this.state.onlineurl  + '?time=' + Date.now().toString().substring(0,10) + "000")} style={{width: "40%", height: "100%"}}>
                    <Image resizeMode="contain" style={{zIndex: 2,  resizeMode: "contain", width: "100%", height: "100%"}}  source={require("./../../../assets/images/newdesign/synotexmall_online_button.png")} />
                </TouchableOpacity>
                <View style={{width: wp("10%"), height: 10}}></View>
                <TouchableOpacity onPress={() => this.setState({offlineclicked: true})} style={{width: "40%", height: "100%"}}>
                    <Image resizeMode="contain" style={{zIndex: 2,  resizeMode: "contain", width: "100%", height: "100%"}}  source={require("./../../../assets/images/newdesign/synotexmall_offline_button.png")} />
                </TouchableOpacity>


            </View>
            
            
            {/* <View style={{width: "25%", height: "100%"}}></View>
            <TouchableOpacity onPress={() => Linking.openURL(this.state.onlineurl  + '?time=' + Date.now().toString().substring(0,10) + "000")} style={{width: "50%", height: "80%"}}>
                <ImageBackground resizeMode="contain" style={{zIndex: 2,  resizeMode: "contain", width: "100%", height: "100%", alignItems:"center"}}  source={require("./../../../assets/images/newdesign/synotexmall_blue_box.png")} >
                    <Image resizeMode="contain" style={{zIndex: 2,  resizeMode: "contain", width: "60%", height: "100%"}}  source={require("./../../../assets/images/newdesign/synotexmall_blue_text.png")} />
                </ImageBackground>
            </TouchableOpacity>
            <View style={{width: "25%", height: "100%"}}></View>  */}
          
        </View>

        </>

        :
        null}


  
  
  
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
