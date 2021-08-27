import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

//import { Camera, Permissions, FaceDetector, DangerZone } from 'expo';

import { List, DataTable, ActivityIndicator, Button } from 'react-native-paper';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import axios from 'axios';
//import Sound from 'react-native-sound';
const Sound = require('react-native-sound')

// import theme from '../../../../theme';
// import { ScrollView } from 'react-native-gesture-handler';
import { CustomDrawerButtonHeader, CustomHeader } from '../../../components/Header';
import theme from '../../../../theme';


// import { SafeAreaView } from 'react-native-safe-area-context';
// import { color, font } from '../../../../theme'
const { height, width } = Dimensions.get('window');
const frame = require('./../../../assets/images/white_facial_guideline.png');
const star_sparkling = require('./../../../assets/images/loading_sparkle.gif');
const blue_check_mark = require('./../../../assets/images/blue_check_mark.gif');
const rotating_blue_mask = require('./../../../assets/images/rotating_blue_mask.gif')

const vh = height / 100;
const vw = width / 100;
const frameSide = height*0.35;
const actionSide = 250;
const loaderSide = 100;
const date = moment().local().format('l');
let windowHeight = height*0.32;


const { windowwidth, windowheight } = Dimensions.get("window");

const guide_sound = new Sound('guide_voice.mp3', Sound.MAIN_BUNDLE);
const AI_measurement_sound = new Sound('ai_measurement_voice.mp3', Sound.MAIN_BUNDLE);
const button_beep = new Sound('button_beep.mp3', Sound.MAIN_BUNDLE);
const turnFace = new Sound("turnface.mp3", Sound.MAIN_BUNDLE);

const ScannerView = (props) => {
  // console.log('SCANNER VIEW PROPS', props.students);
  let camera;
  // console.log('SCANNER VIEW PROPS', props.onboardStudents);

  // useEffect(() => {
  //   props.navigation.addListener('focus', () => {
  //     setTimeout(() => {
  //       takePicture()
  //     }, 3000);
  //   });
  // }, [])


  const [picture, setPicture] = useState();
  const [pictureTaken, setPictureTaken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recog, setRecog] = useState(false);
  const [startRecog, setStartRecog] = useState(false);
  var [resp, setResp] = useState({});

  var [state, setState] = useState(0);

  const [selfie, setSelfie] = useState('');


  const cameraRef = useRef(null);

  const takePicture = async () => {
    console.log("taking picture")
    console.log("camera", camera)
    console.log("camera ref", cameraRef)
    if (cameraRef.current) {
      console.log("camera 2", camera)
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);


      setSelfie(data.base64);


      // console.log(data.base64)
      await props.sendFaceData(data.base64)
      // setPicture(data.uri);
    }
  };

  const runFacemesh = async (e) => {
    try {
      if (startRecog) {
        if (!recog && !picture && !props.loading) {
          console.log('facemesh run');
          if (e.faces[0].leftEyeOpenProbability < 0.65) {
            console.log('gesture recorded');
            const options = { quality: 0.5, base64: true };
            const data = await camera.takePictureAsync(options);
            setPicture(data.uri);
            console.log(data.uri);
            setRecog(true);
          }
        }

        if (picture) {
          try {
            props.sendLocation(picture);
            setRecog(false);
            setPicture(null);
          } catch (error) {
            console.log('face error', error);
            props.showAlert('No Internet Connection');
            return;
          }
        }
      }
    } catch (error) {
      console.log('face error', error);
      // props.showAlert('No Internet Connection');
      return;
    }
  };

  const runFacemesh2 = async (e) => {
    //console.log(" ======================== face detected !!!! from Scanner ");
  };

  const tempfunc = async () => {
    //console.log(" ========= current state   before click  ", state);
    setState(1);
    guide_sound.play((success) => {
      //console.log("success");
    });
    //console.log(" ========= current state   after click  ", state);
    setTimeout(() => {
      setState(2);
      //console.log(" ========= current state   after wait  ", state);
    }, 1000);

    setTimeout(() => {
      setState(3);
      button_beep.play((success) => {
        //console.log("success");
      })
      //console.log(" ========= current state   after wait  blue_three ", state);
    },4000);
    setTimeout(() => {
      setState(4);
      button_beep.play((success) => {
        //console.log("success");
      })
      //console.log(" ========= current state   after wait  blue_two ", state);
    },5000);
    setTimeout(() => {
      setState(5);
      button_beep.play((success) => {
        //console.log("success");
      })
      //console.log(" ========= current state   after wait  blue_one ", state);
    },6000);
    setTimeout(() => {
  //    setState(6);
      //console.log(" ========= current state   after wait  initial take photo ", state);
      takePicture();
    },7000);

    setTimeout(() => {
      //console.log(" ============ play turn your face sound ");
      setState(6);
      turnFace.play((success) => {
        //console.log("success");
      })
    }, 8000);

    setTimeout(() => {
      setState(7);
      AI_measurement_sound.play((success) => {
        //console.log("success");
      })
      //console.log(" ========= current state   after wait  show star-like sparkling ", state);
    },13000);
    setTimeout(() => {
      setState(8);
      //console.log(" ========= current state   after wait  show blue-check-mark ", state);
    },15000);

    setTimeout(() => {

      props.onNext(props.resp);
    },16000);

  };

  //console.log(" ============ current state before return   ", state);


  return (
    <>
      <View style={styles.container}>
       
        <RNCamera
          ref={cameraRef}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.off}
          playSoundOnCapture={false}
          useCamera2Api={true}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}

         onFacesDetected={runFacemesh2}
        // videoStabilizationMode="cinematic"
         faceDetectionClassifications={
           RNCamera.Constants.FaceDetection.Classifications.all
         }
         faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all }
         faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
//          onCameraReady={startRecording}
        />



        {state != 7 && state != 8 && state != 6?
        <View style={styles.frameContainer}>
          <Image resizeMode={'contain'} style={styles.frame} source={frame} />
        </View>
        :
        null}
        {state == 6 ?
        <View style={styles.frameContainer}>
          <Image resizeMode={'contain'} style={styles.frame} source={rotating_blue_mask} />
        </View>
        :
        null}
        {state == 7 ?

        <View style={styles.frameContainer}>
          <Image resizeMode={'contain'} style={styles.frame} source={star_sparkling} />
        </View>



        :
        null}
        {state == 8 ?
        <View style={styles.frameContainer}>
          <Image resizeMode={'contain'} style={styles.frame} source={blue_check_mark} />
        </View>
        :
        null}
        {state == 0 ?
        <View style={{ width, height: windowHeight, zIndex: 1000, position: 'absolute', bottom: 0, backgroundColor: theme.color.light }}>
          <View style={styles.buttonOver}>
            <Text style={styles.text}>팔을 쭉 뻗어서 가이드라인에 얼굴을 맞춰주세요.</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Image stype={{ width: 100, height: 100, marginRight: 0 }} source={require("./../../../assets/images/photo_selfie.png")} />
              <Image stype={{ width: 100, height: 100, marginLeft: 0 }} source={require("./../../../assets/images/selfie2.png")} />
            </View>
          </View>
          <TouchableOpacity onPress={tempfunc}>
            <ImageBackground source={require("./../../../assets/images/bottom_button.png")}  style={{width:width,height:50, marginTop:15,alignItems: 'center',justifyContent: 'center'}}>
              <Text style={{ fontWeight: "bold", color: "white" }}>사진 촬영 시작하기</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        : 
        null }
        {state == 1 ?
        <View style={{ width, height: windowHeight, zIndex: 1000, position: 'absolute', bottom: 0, backgroundColor: theme.color.light }}>
          <View style={styles.buttonOver}>
            <Text style={styles.text}>팔을 쭉 뻗어서 가이드라인에 얼굴을 맞춰주세요.</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Image stype={{ width: 100, height: 100, marginRight: 0 }} source={require("./../../../assets/images/photo_selfie.png")} />
              <Image stype={{ width: 100, height: 100, marginLeft: 0 }} source={require("./../../../assets/images/selfie2.png")} />
            </View>
          </View>
          <View></View>
        </View>
        : 
        null }
        {state == 2 ?
        <View style={{ width, height: windowHeight, zIndex: 1000, position: 'absolute', bottom: 0, backgroundColor: theme.color.light }}>
          <View style={styles.buttonOver}>
            <Text style={styles.text}>촬영이 시작되면 가이드라인을 따라 {'\n'}
                                    얼굴을 돌려주세요.</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

            </View>
          </View>
          <View></View>
        </View>
        : 
        null }
        {state == 3 ?
        <View style={{ width, height: windowHeight, zIndex: 1000, position: 'absolute', bottom: 0, backgroundColor: theme.color.light }}>
          <View style={styles.buttonOver}>
            <Text style={styles.text}>촬영이 시작되면 가이드라인을 따라 {'\n'}
                                    얼굴을 돌려주세요.</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Image stype={{ width: 100, height: 100, marginRight: 0 }} source={require("./../../../assets/images/blue_three.png")} />
            </View>
          </View>
          <View></View>
        </View>
        : 
        null }
        {state == 4 ?
        <View style={{ width, height: windowHeight, zIndex: 1000, position: 'absolute', bottom: 0, backgroundColor: theme.color.light }}>
          <View style={styles.buttonOver}>
            <Text style={styles.text}>촬영이 시작되면 가이드라인을 따라 {'\n'}
                                    얼굴을 돌려주세요.</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Image stype={{ width: 100, height: 100, marginRight: 0 }} source={require("./../../../assets/images/blue_two.png")} />
            </View>
          </View>
          <View></View>
        </View>
        : 
        null }
        {state == 5 ?
        <View style={{ width, height: windowHeight, zIndex: 1000, position: 'absolute', bottom: 0, backgroundColor: theme.color.light }}>
          <View style={styles.buttonOver}>
            <Text style={styles.text}>촬영이 곧 시작 됩니다. {'\n'}
                              가이드라인을 따라 얼굴을 돌려주세요.</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Image stype={{ width: 100, height: 100, marginRight: 0 }} source={require("./../../../assets/images/blue_one.png")} />
            </View>
          </View>
          <View></View>
        </View>
        : 
        null }
        {state == 6 ?
        <View style={{ width, height: windowHeight, zIndex: 1000, position: 'absolute', bottom: 0, backgroundColor: theme.color.light }}>
        <View style={{justifyContent:"center"}}>
          <Text style={styles.text}>촬영이 시작 되었습니다 {'\n'}
                            가이드라인을 따라 얼굴을 돌려주세요.</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          </View>
        </View>
        <View></View>
      </View>
        : 
        null }  
        {state == 7 ?
        <View style={{ width, height: windowHeight, zIndex: 1000, position: 'absolute', bottom: 0, backgroundColor: theme.color.light }}>
        <View style={{justifyContent:"center"}}>
          <Text style={styles.text}>인공지능이 분석 중입니다. {'\n'}
                                      잠시만 기다려 주세요.</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          </View>
        </View>
        <View></View>
      </View>
        : 
        null }
        {state == 8 ?
        <View style={{ width, height: windowHeight, zIndex: 1000, position: 'absolute', bottom: 0, backgroundColor: theme.color.light }}>
        <View style={{justifyContent:"center"}}>
          <Text style={styles.text}>완료 되었습니다</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          </View>
        </View>
        <View></View>
      </View>
        : 
        null }


        {/* {props.loading ? (
          <Image
            style={{ ...styles.preview, zIndex: 999 }}
            source={{ uri: picture }}
          />
        ) : null} */}
        {
          props.loading
            ? <View style={styles.loadingContainer}>
              {/* <CustomHeader title={'측정 결과'} /> */}

              <ActivityIndicator
                size="large"
                style={styles.loader}
                animating={props.loading || isLoading}
              />
            </View>
            : null
        }

    
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  proxyhistory: {
    width: 100,
    height: 46,
    backgroundColor: '#5877AE',
    borderRadius: 30,
    padding: 5,
  },
  proxyView: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'red',
  },
  frameContainer: {
    position: 'absolute',
    top: ((height - windowHeight) - frameSide) / 2,
    backgroundColor: '#0000',
    zIndex: 100,
    left: (width - frameSide) / 2,
  },
  frame: {
    height: frameSide,
    width: frameSide,
    tintColor: '#fff',
    zIndex: 100,
  },
  preview: {
    // flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    height: height - windowHeight,
    width,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1,
  },
  capture: {
    backgroundColor: '#0000',
    borderRadius: 100,
    borderWidth: 5,
    borderStyle: 'solid',
    height: 80,
    width: 80,
    alignSelf: 'center',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayKids: {
    position: 'absolute',
    top: 50,
    left: width / 2 - 175,
    // backgroundColor: "#FFFFFF",
    width: 350,
    // height: 100,
    justifyContent: 'center',
    zIndex: 1000,
    borderRadius: 20,
    flexDirection: 'column',
    // justifyContent:'center'
  },
  displayGest: {
    position: 'absolute',
    // top: 340,
    bottom: 10,
    left: width / 2 - 175,
    backgroundColor: '#FFFFFF',
    padding: 10,
    // height: 100,
    justifyContent: 'center',
    zIndex: 1000,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayStart: {
    position: 'absolute',
    // top: 340,
    bottom: 10,
    left: 20,
    backgroundColor: 'green',
    padding: 10,
    // height: 100,
    width: 150,
    justifyContent: 'center',
    zIndex: 1000,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  start: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    // height: 100,
    justifyContent: 'center',
  },
  collapsible: {
    alignContent: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  tableheading: {
    fontSize: 90,
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    width: 50,
  },
  tabletime: {
    fontSize: 90,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    flexDirection: 'row',
    marginTop: 6,
  },
  scrollView: {
    backgroundColor: 'white',
    // marginHorizontal: 20,
    // marginBottom: 10,
    width: 550,
    maxHeight: height - 250,
  },
  container1: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    width: 550,
  },
  loader: {
    position: 'absolute',
    top: height / 2 - loaderSide / 2,
    left: width / 2 - loaderSide / 2,
    zIndex: 1000,
    width: loaderSide,
    height: loaderSide,
    // backgroundColor: 'red',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height,
    width,
    backgroundColor: 'white',
    zIndex: 1000
  },
  buttonOver: {
    width: width - 40,
    zIndex: 120
  },
  buttonOver2: {
    width: width - 40,
    zIndex: 160
  },
  text: {
    fontFamily: theme.font.bold,
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    textAlignVertical: 'center',
    width,
    marginVertical: 20
  }
});

export default ScannerView;
