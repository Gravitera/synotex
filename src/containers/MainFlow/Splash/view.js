import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  BackHandler,

} from 'react-native';
import theme from '../../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomDrawerButtonHeader } from '../../../components/Header';
import Button from './../../../components/Button'
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import {version} from "../../../../package.json";

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

class SplashView extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
          typeval: "",
          backgroundImage: "",
          backgroundImageStyle: {
            backgroundimageWidth: "",
            backgroundimageHeight: "",
            backgroundimageMarginTop: "",
            backgroundimageMarginLeft: ""
          },
          mainImage: "",
          mainImageStyle: {
            imageWidth: "",
            imageHeight: "",
            imageMarginTop: "",
            imageMarginLeft: ""
          }
        }
    }

    async componentDidMount() {
  
        try{
            var res = await fetch("https://synotexmasks.s3.ap-northeast-2.amazonaws.com/splash/splash.json"  + '?time=' + Date.now().toString().substring(0,10) + "000",{
                                mode: 'no-cors',
                                method: 'GET',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    "Access-Control-Allow-Origin": "*"
                                },
                            });
            var resdata = await res.json();
            console.log('splash RESPONSE SUCCESS =>', resdata);
            console.log('splash RESPONSE SUCCESS  resdata.typeval   =>', resdata.typeval);
            console.log('splash RESPONSE SUCCESS  resdata.backgroundImage   =>', resdata.backgroundImage);
            console.log('splash RESPONSE SUCCESS  resdata.mainImage   =>', resdata.mainImage);
            if (parseInt(version.substring(0,2)) < resdata.version){
                console.log(" res.typeval    Update App");
                this.setState({typeval: "Update App"});
                setTimeout(() => {
                    BackHandler.exitApp();
                }, 2500);
            }
            else if (resdata.typeval === "None"){
                this.setState({typeval: "None"});
                this.props.navigation.navigate("intro");
            }
            else if (resdata.typeval === "Marketing"){
                console.log(" =========== typeval     marketing ")
                this.setState({
                    typeval: "Marketing",
                    backgroundImage: resdata.backgroundImage,
                    backgroundImageStyle: resdata.backgroundImageStyle,
                    mainImage: resdata.mainImage,
                    mainImageStyle: resdata.mainImageStyle
                }, () => {
                    console.log(" current typeval and backgroundImage      ", this.state.typeval, "     ", this.state.backgroundImage);
                })
                setTimeout(() => {
                    this.props.navigation.navigate("tabflow");
                }, 3000);
            }        
        }catch(err){
            try{
                var res2 = await fetch("https://synotexmasks.s3.ap-northeast-2.amazonaws.com/splash/splash.json"  + '?time=' + Date.now().toString().substring(0,10) + "000",{
                                    mode: 'no-cors',
                                    method: 'GET',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        "Access-Control-Allow-Origin": "*"
                                    },
                                });
                var resdata2 = await res2.json();
                console.log('splash RESPONSE SUCCESS =>', resdata2);
                console.log('splash RESPONSE SUCCESS  resdata.typeval   =>', resdata2.typeval);
                console.log('splash RESPONSE SUCCESS  resdata.backgroundImage   =>', resdata2.backgroundImage);
                console.log('splash RESPONSE SUCCESS  resdata.mainImage   =>', resdata2.mainImage);
                if (parseInt(version.substring(0,2)) < resdata2.version){
                    console.log(" res.typeval    Update App");
                    this.setState({typeval: "Update App"});
                    
                    setTimeout(() => {
                        BackHandler.exitApp();
                    }, 2500);
                    
                }
                else if (resdata2.typeval === "None"){
                    this.setState({typeval: "None"});
                    this.props.navigation.navigate("intro");
                }
                else if (resdata2.typeval === "Marketing"){
                    console.log(" =========== typeval     marketing ")
                    this.setState({
                        typeval: "Marketing",
                        backgroundImage: resdata2.backgroundImage,
                        backgroundImageStyle: resdata2.backgroundImageStyle,
                        mainImage: resdata2.mainImage,
                        mainImageStyle: resdata2.mainImageStyle
                    }, () => {
                        console.log(" current typeval and backgroundImage      ", this.state.typeval, "     ", this.state.backgroundImage);
                    })
                    setTimeout(() => {
                        this.props.navigation.navigate("intro");
                    }, 3000);
                }        
            }catch(err){
                console.log(" ============  fetch error      ", err.message);
                console.log(" ============  fetch error      ", err.message);
                console.log(" ============  fetch error      ", err.message);
                this.setState({typeval: "Network Error"});
                setTimeout(() => {
                    BackHandler.exitApp();
                }, 2500);
            }
        }

        

        /*
        //fetch("https://a96d26d9839f933f1.awsglobalaccelerator.com/splash", {
        fetch("https://synotexmasks.s3.ap-northeast-2.amazonaws.com/splash/splash.json",{
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
                console.log('splash RESPONSE SUCCESS  resdata.typeval   =>', resdata.typeval);
                console.log('splash RESPONSE SUCCESS  resdata.backgroundImage   =>', resdata.backgroundImage);
                console.log('splash RESPONSE SUCCESS  resdata.mainImage   =>', resdata.mainImage);

                if (parseInt(version.substring(0,2)) < resdata.version){
                    console.log(" res.typeval    Update App");
                    this.setState({typeval: "Update App"});
                    setTimeout(() => {
                        BackHandler.exitApp();
                    }, 2500);
                }
                else if (resdata.typeval === "None"){
                    this.setState({typeval: "None"});
                    this.props.navigation.navigate("intro");
                }
                else if (resdata.typeval === "Marketing"){
                    console.log(" =========== typeval     marketing ")
                    this.setState({
                        typeval: "Marketing",
                        backgroundImage: resdata.backgroundImage,
                        backgroundImageStyle: resdata.backgroundImageStyle,
                        mainImage: resdata.mainImage,
                        mainImageStyle: resdata.mainImageStyle
                    }, () => {
                        console.log(" current typeval and backgroundImage      ", this.state.typeval, "     ", this.state.backgroundImage);
                    })

   
                    setTimeout(() => {
                        this.props.navigation.navigate("intro");
                    }, 2000);
    
            
                }
        }).catch((err) => {
            console.log(" ============  fetch error      ", err.message);
            console.log(" ============  fetch error      ", err.message);
            console.log(" ============  fetch error      ", err.message);
            this.setState({typeval: "Network Error"});
            setTimeout(() => {
                BackHandler.exitApp();
            }, 2500);
        })
        */


    }

    render (){

        const { height, width } = Dimensions.get('window');

        const vh = height / 100;
        const vw = width / 100;

        
        console.log(" ========== during render this.typeval,   this.backgroundImage     ", this.state.typeval, "     ", this.state.backgroundImage);
        console.log(" ========== during render this.typeval,   this.state.backgroundImageStyle     ", this.state.backgroundImageStyle, "     ", this.state.backgroundImageStyle);
        console.log(" ========== during render this.typeval,   this.state.mainImageStyle     ", this.state.mainImageStyle, "     ", this.state.mainImageStyle);


        return this.state.typeval.length != 0 ? (
            <>
                {this.state.typeval === "Update App" ?
                    <View style={{width: wp("100%"), height: hp("100%"), backgroundColor: "#0380D8", flexDirection: "column", justifyContent: "center", alignItems:"center"}}>
                            <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/update_app.png")} />
                            <Image resizeMode="contain" style={{ resizeMode: "contain", width: "70%", height: "20%"}}  source={require("./../../../assets/images/newdesign/update_app_text.png")} />
                    </View>
                :null}
                {this.state.typeval === "Network Error" ?
                    <View style={{width: wp("100%"), height: hp("100%"), backgroundColor: "white", flexDirection: "column", justifyContent: "center", alignItems:"center"}}>
                            <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/network_error.png")} />
                            <Image resizeMode="contain" style={{ resizeMode: "contain", width: "65%", height: "20%"}}  source={require("./../../../assets/images/newdesign/network_error_text1.png")} />
                            <View style={{width: "35%", height: "20%"}}></View>
                            <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "10%"}}  source={require("./../../../assets/images/newdesign/network_error_text2.png")} />
                    </View>
            
                :null}
                {this.state.typeval === "Marketing" ?
                    <>

                    {/*<WebView style={{width: wp("100%"), height: hp("100%")}} source={{ uri: 'https://a96d26d9839f933f1.awsglobalaccelerator.com/splashscreen' }}/>*/}
                   <View style={{zIndex: 1, width: wp("100%"), height: hp("100%"), justifyContent: "center", alignItems: "center"}}>
                            <Image resizeMode="contain" style={{resizeMode: "contain", width: wp(this.state.mainImageStyle.imageWidth), height: hp(this.state.mainImageStyle.imageHeight), marginTop: hp(this.state.mainImageStyle.imageMarginTop), marginLeft: wp(this.state.mainImageStyle.imageMarginLeft)}}  source={{uri: this.state.mainImage + '?time=' + Date.now().toString().substring(0,10) + "000", cache: 'reload'}} />
                    </View>
                    <Image resizeMode="cover" style={{zIndex: 0, position: "absolute", resizeMode: "cover", width: wp(this.state.backgroundImageStyle.backgroundimageWidth), height: hp(this.state.backgroundImageStyle.backgroundimageHeight), marginTop: hp(this.state.backgroundImageStyle.backgroundimageMarginTop), marginLeft: wp(this.state.backgroundImageStyle.backgroundimageMarginLeft)}}  source={{uri: this.state.backgroundImage + '?time=' + Date.now().toString().substring(0,10) + "000", cache: 'reload'}} />
             
                    </>
                :null}
            </>

        )
        : null

    };


}





/*
const SplashView = (props) => {

    const [typeval, setTypeval] = useState("");

    const [image, setImage] = useState("");


    const [backgroundImage, setBackgroundImage] = useState("");
    const [backgroundimageWidth, setbackgroundImageWidth] = useState("");
    const [backgroundimageHeight, setbackgroundImageHeight] = useState("");
    const [backgroundimageMarginTop, setbackgroundImageMarginTop] = useState("");
    const [backgroundimageMarginLeft, setbackgroundImageMarginLeft] = useState("");

    const [mainImage, setMainImage] = useState("");
    const [imageWidth, setImageWidth] = useState("");
    const [imageHeight, setImageHeight] = useState("");
    const [imageMarginTop, setImageMarginTop] = useState("");
    const [imageMarginLeft, setImageMarginLeft] = useState("");


    useEffect(() => {

        fetch("https://a96d26d9839f933f1.awsglobalaccelerator.com/splash", {
            mode: 'no-cors',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            
            body: JSON.stringify(
                {
                    "temp": 1
                })
                
            })
            .then((res) => res.json())
            .then((resdata) => {
                console.log('splash RESPONSE SUCCESS =>', resdata);
                console.log('splash RESPONSE SUCCESS  resdata.typeval   =>', resdata.typeval);
                console.log('splash RESPONSE SUCCESS  resdata.backgroundImage   =>', resdata.backgroundImage);
                console.log('splash RESPONSE SUCCESS  resdata.mainImage   =>', resdata.mainImage);

                if (resdata.typeval === "Update App"){
                    console.log(" res.typeval    Update App");
                    setTypeval("Update App");
                    setTimeout(() => {
                        BackHandler.exitApp();
                    }, 3000);
                }
                if (resdata.typeval === "None"){
                    setTypeval("None");
                    props.navigation.navigate("intro");
                }
                if (resdata.typeval === "Marketing"){
                    console.log(" =========== typeval     marketing ")
                    setTypeval("Marketing");

                    setBackgroundImage(resdata.backgroundImage);

                    setTimeout(() => {
                        props.navigation.navigate("intro");
                    }, 5000);
            
                }
        }).catch((err) => {
            props.navigation.navigate("intro");
        })






        /*.catch((err) => {
            console.log(" ======= fetch error message     ", err);
            setTypeval("Network Error");
            setTimeout(() => {
                BackHandler.exitApp();
            }, 3000);

        })
        */



export default SplashView;