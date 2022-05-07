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

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;



class IntroView extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      permissionsGranted: false,
      showPermsAlert: false,
      typeval: "", 
      backgroundImage: "",
      logoLocation: "",
      logo1width: "",
      logo1height: "",
      logo2width: "",
      logo2height: ""
      }
  }

  async componentDidMount(){
      try{
        var res = await fetch("https://synotexmasks.s3.ap-northeast-2.amazonaws.com/home/home.json"  + '?time=' + Date.now().toString().substring(0,10) + "000",{
                            mode: 'no-cors',
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                "Access-Control-Allow-Origin": "*"
                            },
                        });
        var resdata = await res.json();
        this.setState({
          typeval: resdata.typeval,
          backgroundImage: resdata.backgroundImage,
          logoLocation: resdata.logoLocation,
          logo1width: resdata.logo1width,
          logo1height: resdata.logo1height,
          logo2width: resdata.logo2width,
          logo2height: resdata.logo2height
        })   
      }catch(err){
          try{
              var res2 = await fetch("https://synotexmasks.s3.ap-northeast-2.amazonaws.com/home/home.json"  + '?time=' + Date.now().toString().substring(0,10) + "000",{
                                  mode: 'no-cors',
                                  method: 'GET',
                                  headers: {
                                      'Accept': 'application/json',
                                      'Content-Type': 'application/json',
                                      "Access-Control-Allow-Origin": "*"
                                  },
                              });
              var resdata2 = await res2.json();
              this.setState({
                typeval: resdata2.typeval,
                backgroundImage: resdata2.backgroundImage,
                logoLocation: resdata2.logoLocation,
                logo1width: resdata.logo1width,
                logo1height: resdata.logo1height,
                logo2width: resdata.logo2width,
                logo2height: resdata.logo2height
              })      
          }catch(err){
              console.log(" ============  fetch error      ", err.message);
              console.log(" ============  fetch error      ", err.message);
              console.log(" ============  fetch error      ", err.message);
              this.setState({
                typeval: "Icon", 
                logoLocation: "top",
                logo1width: "25%",
                logo1height: "5%",
                logo2width: "5%",
                logo2height: "35%"
              });
          }
      }


    this.requestPermission().then(() => {
      console.log(" =========== permissions     ", this.state.permissionsGranted);
    });

  }


  async requestPermission(){
    if (Platform.OS === 'android') {
      return PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]
      ).then(result => {
        if (
          result['android.permission.CAMERA'] === 'granted' &&  
          result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted' && 
          result['android.permission.RECORD_AUDIO'] === 'granted' &&
          result['android.permission.ACCESS_FINE_LOCATION'] === 'granted') {
            this.setState({ permissionsGranted: true, showPermsAlert: false });

        } else {
          this.setState({ permissionsGranted: false, showPermsAlert: true });
        }
      })
    };
  }



  render(){
    
    const { height, width } = Dimensions.get('window');

    const vh = height / 100;
    const vw = width / 100;
    console.log(" window width     ", width,"     ", height);
    console.log("=============================== ");
    console.log("=============================== ");
    console.log("=============================== ");
    console.log("=============================== ");
    console.log("=============================== ");
    /*
    console.log(" ===   ");
    var currtime = Date.now().toString();
    var newcurrtime = currtime.substring(0, 10);
    var newcurrtime2 = newcurrtime + "000";
    console.log("=============================== ");
    console.log("=============================== ");
    console.log("=============================== ");
    console.log(currtime);
    console.log(newcurrtime);
    // Date.now().toString().substring(0,10) + "000"
    console.log(newcurrtime2);
    */
    console.log("=============================== ");
    console.log("=============================== ");

    return this.state.logo2height.length != 0 ? (
      <>
  

            {this.state.typeval == "Icon" ? 
              <Image resizeMode="cover" style={{position:"absolute", resizeMode: "cover", zIndex:1, width: "100%", height: "100%"}} source={require("./../../../assets/images/newdesign/intro_background.png")} />    
            :
              <Image resizeMode="cover" style={{position:"absolute", resizeMode: "cover", zIndex:1, width: "100%", height: "100%"}} source={{uri: this.state.backgroundImage + '?time=' + Date.now().toString().substring(0,10) + "000", cache: 'reload'}}  />
            }
            
            {this.state.logoLocation == "top" ?
              <View style={{width: wp("100%"), height: hp("20%"), zIndex: 1}}>
                  
                  
                  <View style={{width: 50, height: hp("15%")}}></View>
                  <Image resizeMode="contain" style={{resizeMode: "contain", zIndex: 3, width: wp(this.state.logo1width), height: hp(this.state.logo1height), marginLeft: wp("10%")}}  source={require("./../../../assets/images/newdesign/intro_synotex.png")} />
                  <Image resizeMode="contain" style={{resizeMode: "contain", zIndex: 3, width: wp(this.state.logo2width), height: hp(this.state.logo2height), marginLeft: wp("10%")}}  source={require("./../../../assets/images/newdesign/intro_firstever.png")} />


              </View>
            : null }
          
            <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center", width: wp("100%"), height: hp("50%"), zIndex:1}}>

                {this.state.typeval == "Icon" ? 
                  <View style={{width: wp("80%"), height: hp("45%"), justifyContent: "center", alignItems:"center", flexDirection: "column"}}>
                      <Image resizeMode="contain" style={{resizeMode: "contain", zIndex:4, width: "120%", height: "120%"}}  source={require("./../../../assets/images/newdesign/intro_mask.png")} />
                  </View>
                :null}

            </View>


            {this.state.logoLocation == "bottom" ?
              <>
                <View style={{width: wp("100%"), height: hp("20%"), zIndex: 1}}>
                    
                    <View style={{width: 50, height: hp("15%")}}></View>
                    <Image resizeMode="contain" style={{resizeMode: "contain", zIndex: 3, width: wp(this.state.logo1width), height: hp(this.state.logo1height), marginLeft: wp("10%")}}  source={require("./../../../assets/images/newdesign/intro_synotex.png")} />
                    <Image resizeMode="contain" style={{resizeMode: "contain", zIndex: 3, width: wp(this.state.logo2width), height: hp(this.state.logo2height), marginLeft: wp("10%")}}  source={require("./../../../assets/images/newdesign/intro_firstever.png")} />

                </View>
              </>
            :null}

            <View style={{flexDirection: "row", alignItems:"center", justifyContent: "center",  width: wp("100%"), bottom: hp("13.5%"), zIndex: 4, position: "absolute"}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('intro2')} >
                    <ImageBackground resizeMode="contain" style={{width: wp("40%"), height: hp("10%"), maxWidth: 250, maxHeight: 100, resizeMode: "contain", justifyContent: "center", alignItems: "center"}}  source={require("./../../../assets/images/newdesign/intro_startmeasure.png")} >
                        <Text style={{fontWeight: "bold", fontSize: 14}}></Text>
                    </ImageBackground>
                </TouchableOpacity>
                <View style={{width: wp("3%"), height: hp("5%")}}></View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ArCamera2')}>
                    <ImageBackground resizeMode="contain" style={{ width: wp("40%"), height: hp("10%"), maxWidth: 250, maxHeight: 100, resizeMode: "contain", justifyContent: "center", alignItems: "center"}}  source={require("./../../../assets/images/newdesign/intro_ar.png")} >
                        <Text style={{fontWeight: "bold", fontSize: 14}}></Text>
                    </ImageBackground>
                </TouchableOpacity>
  
            </View>

  
  
        
      </>
    ) :
    null



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

export default IntroView;