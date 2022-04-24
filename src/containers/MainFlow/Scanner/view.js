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

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


import {
  studentsOfSingleBus,
  markAttendance,
  addRes,
} from '../../../store/actions/attendanceActions';
import { useSelector, useDispatch } from 'react-redux';

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



const guide_sound = new Sound('guide_voice.mp3', Sound.MAIN_BUNDLE);
const AI_measurement_sound = new Sound('ai_measurement_voice.mp3', Sound.MAIN_BUNDLE);
const button_beep = new Sound('button_beep.mp3', Sound.MAIN_BUNDLE);
const turnFace = new Sound("turnface.mp3", Sound.MAIN_BUNDLE);

const ScannerView = (props) => {


  console.log("windowwidth, windowheight", "    ", width, "   ", height);
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

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const cameraRef = useRef(null);

  const takePicture = async () => {
    console.log("taking picture")
    console.log("camera", camera)
    console.log("camera ref", cameraRef)
    //if (cameraRef.current) {
      console.log("camera 2", camera)
      const options = { quality: 0.5, base64: true };
      //const data = await cameraRef.current.takePictureAsync(options);
      var data = await cameraRef.current.takePictureAsync(options);
      var temp = {
        FrontImage: data.base64,
        FaceWidth: 0,
        FaceHeight: 0,
        FaceWidthPercent: 0,
        FaceHeightPercent: 0,
        MaskSize: "N",
        Pentagram: {
          FaceHeight: 0,
          HeadHeight: 0,
          HeadWidth: 0,
          ChinWidth: 0,
          HeadRound: 0,
        },
        PentagramAverage: {
          FaceHeight: 0,
          HeadHeight: 0,
          HeadWidth: 0,
          ChinWidth: 0,
          HeadRound: 0,
        },
        PentagramPredicted: {
          FaceHeight: 0,
          HeadHeight: 0,
          HeadWidth: 0,
          ChinWidth: 0,
          HeadRound: 0,
        },
        ID: 100
      }
      var currbody = JSON.stringify({
        ...props.route.params,
        "FrontImage": data.base64
      });
      try{
        var res = await fetch("https://a96d26d9839f933f1.awsglobalaccelerator.com/submit"  + '?time=' + Date.now().toString().substring(0,10) + "000", {
          mode: 'no-cors',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          },
          body: currbody
        });
        var resjson = await res.json();
        setLoading(false);
        setResp({"FrontImage": resjson.FrontImage});
        dispatch(addRes(resjson));
        console.log("finish res");
        setSelfie(data.base64);
        setState(8);
        setTimeout(() => {
          props.onNext(props.resp);
        }, 1000)
        return;
      } catch(err){
        setLoading(false);
        if (err.message == "Network request failed"){
          temp.ID = "NNetwork";
        }
        
        console.log(" ====== error message ", typeof err.message);
        console.log(" ===/",err.message,"/===");
        if (err.message === " JSON Parse error: Unrecognized token '<' "){
          console.log(" ===========  JSON Parse error    triggered    ");
          console.log(" ===========  JSON Parse error    triggered    ");
          console.log(" ===========  JSON Parse error    triggered    ");
        };
        temp.ID = "Unrecognized";
        try{
          var res2 = await fetch("https://a96d26d9839f933f1.awsglobalaccelerator.com/submit", {
            mode: 'no-cors',
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*"
            },
            body: currbody
          });
          var resjson2 = await res2.json();
          setLoading(false);
          setResp({"FrontImage": resjson2.FrontImage});
          dispatch(addRes(resjson2));
          console.log("finish res");
          setSelfie(data.base64);
          setState(8);
          setTimeout(() => {
            props.onNext(props.resp);
          }, 1000)
          return;
        } catch(err){
          setLoading(false);
          if (err.message == "Network request failed"){
            temp.ID = "NNetwork";
          }
          
          console.log(" ====== error message ", typeof err.message);
          console.log(" ===/",err.message,"/===");
          if (err.message === " JSON Parse error: Unrecognized token '<' "){
            console.log(" ===========  JSON Parse error    triggered    ");
            console.log(" ===========  JSON Parse error    triggered    ");
            console.log(" ===========  JSON Parse error    triggered    ");
          };
          temp.ID = "Unrecognized";
          console.log(" ============= dispatch temp   ", temp);
          dispatch(addRes(temp));
          return;
  
        }


      }

      /*
      cameraRef.current.takePictureAsync(options)
      .then((data) => {

        var currbody = JSON.stringify({
          ...props.route.params,
          "FrontImage": data.base64
        })
        console.log(" ======================= body before fetch ======================= ");
        console.log(" ======================= body before fetch ======================= ");
        console.log(" ======================= body before fetch ======================= ");
        console.log(currbody);
        console.log(" ======================= body before fetch ======================= ");
        console.log(" ======================= body before fetch ======================= ");
        console.log(" ======================= body before fetch ======================= ");
        fetch("https://a96d26d9839f933f1.awsglobalaccelerator.com/submit", {
          mode: 'no-cors',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          },
          body: currbody
        })
          .then((res) => res.json())
          .then((res) => {
            console.log('SCANNER RESPONSE SUCCESS =>', res);
            setLoading(false);
    
            setResp({"frontImage":res.FrontImage})
    
            dispatch(addRes(res))
            console.log("finish res")
            setSelfie(data.base64);
            setState(8);
            setTimeout(() => {

              props.onNext(props.resp);
            },1000);
            return;
          })
          .catch((err) => {
            setLoading(false);
            

            if (err.message == "Network request failed"){
              temp.ID = "NNetwork";
            }
            
            console.log(" ====== error message ", typeof err.message);
            console.log(" ===/",err.message,"/===");
            if (err.message === " JSON Parse error: Unrecognized token '<' "){
              console.log(" ===========  JSON Parse error    triggered    ");
              console.log(" ===========  JSON Parse error    triggered    ");
              console.log(" ===========  JSON Parse error    triggered    ");
            }
              
            console.log('SCANNER RESPONSE ERROR =>', err);
            var temp = {
              FrontImage: data.base64,
              FaceWidth: 0,
              FaceHeight: 0,
              FaceWidthPercent: 0,
              FaceHeightPercent: 0,
              MaskSize: "N",
              Pentagram: {
                FaceHeight: 0,
                HeadHeight: 0,
                HeadWidth: 0,
                ChinWidth: 0,
                HeadRound: 0,
              },
              PentagramAverage: {
                FaceHeight: 0,
                HeadHeight: 0,
                HeadWidth: 0,
                ChinWidth: 0,
                HeadRound: 0,
              },
              PentagramPredicted: {
                FaceHeight: 0,
                HeadHeight: 0,
                HeadWidth: 0,
                ChinWidth: 0,
                HeadRound: 0,
              },
              ID: 100
            }

            //if (err.message == " JSON Parse error: Unrecognized token '<' "){
              temp.ID = "Unrecognized";
              console.log(" ===========  JSON Parse error    triggered    ");
              console.log(" ===========  JSON Parse error    triggered    ");
              console.log(" ===========  JSON Parse error    triggered    ");
              var currbody = JSON.stringify({
                ...props.route.params,
                "FrontImage": data.base64
              })
              console.log(" ======================= body before fetch ======================= ");
              console.log(" ======================= body before fetch ======================= ");
              console.log(" ======================= body before fetch ======================= ");
              console.log(currbody);
              console.log(" ======================= body before fetch ======================= ");
              console.log(" ======================= body before fetch ======================= ");
              console.log(" ======================= body before fetch ======================= ");
              fetch("https://a96d26d9839f933f1.awsglobalaccelerator.com/submit", {
                mode: 'no-cors',
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  "Access-Control-Allow-Origin": "*"
                },
                body: currbody
              })
                .then((res2) => res2.json())
                .then((res2) => {
                  console.log('SCANNER RESPONSE SUCCESS =>', res2);
                  setLoading(false);
          
                  setResp({"frontImage":res2.FrontImage})
          
                  dispatch(addRes(res2))
                  console.log("finish res")
                  setSelfie(data.base64);
                  setState(8);
                  setTimeout(() => {

                    props.onNext(props.resp);
                  },1000);
                  return;
                })
                .catch((err) => {
                  setLoading(false);
                  
                  
                  console.log(" ====== error message ", typeof err.message);
                  console.log(err.message);
                  
                  console.log('SCANNER RESPONSE ERROR =>', err);
                  var temp = {
                    FrontImage: data.base64,
                    FaceWidth: 0,
                    FaceHeight: 0,
                    FaceWidthPercent: 0,
                    FaceHeightPercent: 0,
                    MaskSize: "N",
                    Pentagram: {
                      FaceHeight: 0,
                      HeadHeight: 0,
                      HeadWidth: 0,
                      ChinWidth: 0,
                      HeadRound: 0,
                    },
                    PentagramAverage: {
                      FaceHeight: 0,
                      HeadHeight: 0,
                      HeadWidth: 0,
                      ChinWidth: 0,
                      HeadRound: 0,
                    },
                    PentagramPredicted: {
                      FaceHeight: 0,
                      HeadHeight: 0,
                      HeadWidth: 0,
                      ChinWidth: 0,
                      HeadRound: 0,
                    },
                    ID: 100
                  }
                  if (err.message == "Network request failed"){
                    temp.ID = "NNetwork";
                  }
                  if (err.message == " JSON Parse error: Unrecognized token '<' "){
                    console.log(" ===========  JSON Parse error    triggered    ");
                    console.log(" ===========  JSON Parse error    triggered    ");
                    console.log(" ===========  JSON Parse error    triggered    ");
                    temp.ID = "Unrecognized";
                  }
          
          
          
                  console.log(" ============= dispatch temp   ", temp);
                  dispatch(addRes(temp));
                  return;
                });
   
      
      
    
            console.log(" ============= dispatch temp   ", temp);
            dispatch(addRes(temp));
            return;
          });
      })


      // console.log(data.base64)
      //await props.sendFaceData(data.base64)
      
      return;
      // setPicture(data.uri);
    */
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

    /*
    setTimeout(() => {
      setState(8);
      //console.log(" ========= current state   after wait  show blue-check-mark ", state);
    },15000);

    setTimeout(() => {

      props.onNext(props.resp);
    },16000);
    */

  };

  //console.log(" ============ current state before return   ", state);


  return (
    <>

      <View style={{width: wp("100%"), height: hp("100%")}}>
        <View style={{width: wp("100%"), height: "60%", backgroundColor: "black", zIndex: -1}} onLayout={(event) => {console.log(" layout   ", event.nativeEvent.layout);}}>

    
          <RNCamera
            ref={cameraRef}
            style={{width: width, height: "100%"}}
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

          faceDetectionClassifications={
            RNCamera.Constants.FaceDetection.Classifications.all
          }
          faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all }
          faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}

          />

          {state != 7 && state != 8 && state != 6?


          /*<Image resizeMode={'contain'} style={{width: width*0.5, height: width*0.7, left: (width*0.5 - width*0.25), top: (height*0.3 - width*0.35), position:"absolute"}} source={frame} />*/
          <Image resizeMode={'contain'} style={{tintColor: '#fff',width: 200, height: 400, left: (width*0.5 - 100), top: (height*0.3 - 200), position:"absolute"}} source={frame} />
          
          :null}
          {state == 6 ?
          <Image resizeMode={'contain'} style={{tintColor: '#fff',width: 200, height: 400, left: (width*0.5 - 100), top: (height*0.3 - 200), position:"absolute"}} source={rotating_blue_mask} />
          :
          null}
          {state == 7 ?
          <View>
          <Image resizeMode={'contain'} style={{tintColor: '#fff',width: 200, height: 400, left: (width*0.5 - 100), top: (height*0.3 - 200), position:"absolute"}} source={star_sparkling} />
          </View>
          :
          null}
          {state == 8?
          <Image resizeMode={'contain'} style={{tintColor: '#fff',width: 200, height: 400, left: (width*0.5 - 100), top: (height*0.3 - 200), position:"absolute"}} source={blue_check_mark} />

          :
          null}
         



        </View>


        {state == 0 ?
        <>
          <View style={{width: width, height: "30%", flexDirection:"column", alignItems: "center", backgroundColor: "white", zIndex: 2}}>

            <View style={{height: "10%", width: width}}/>
            <View style={{width: width, height: "10%"}}>
              <Text style={{fontFamily: theme.font.bold,color: 'black',textAlign: 'center',fontSize: 14,fontWeight: '600',textAlignVertical: 'center', width: width}}>팔을 쭉 뻗어서 가이드라인에 얼굴을 맞춰주세요.</Text>
            </View>
            <View style={{height: "10%", width: width}}/>
            <View style={{ alignItems:"center", flexDirection: 'row', width: width, height: "45%", justifyContent:"space-evenly"}}>
                <Image resizeMode="contain" style={{resizeMode:"contain", height: hp("11%"), width: hp("12.5%"), marginRight: 0 }} source={require("./../../../assets/images/newdesign/scanner_icon_left.png")} />
                <Image resizeMode="contain" style={{resizeMode:"contain", height: hp("11%"), width: hp("12%"), marginLeft: 0 }} source={require("./../../../assets/images/newdesign/scanner_icon_right.png")} />
            </View>
            <TouchableOpacity onPress={tempfunc}>
                <Image resizeMode="contain" style={{height: hp("7%"), width: wp("90%"), resizeMode:"contain", marginTop: -5}} source={require("./../../../assets/images/newdesign/scanner_next.png")} />
            </TouchableOpacity>  
          </View>


          
          
        </>
        :null}
        {state == 1 ?
        <>
        <View style={{width: width, height: "30%", flexDirection:"column", backgroundColor: theme.color.light, zIndex: 2}}>

          <View style={{height: "10%", width: width}}/>
          <View style={{width: width, height: "10%"}}>
            <Text style={{fontFamily: theme.font.bold,color: 'black',textAlign: 'center',fontSize: 14,fontWeight: '600',textAlignVertical: 'center', width: width}}>팔을 쭉 뻗어서 가이드라인에 얼굴을 맞춰주세요.</Text>
          </View>
          <View style={{height: "10%", width: width}}/>
          <View style={{alignItems:"center", flexDirection: 'row', width: width, height: "45%", justifyContent:"space-evenly"}}>
                <Image resizeMode="contain" style={{resizeMode:"contain", height: hp("11%"), width: hp("12.5%"), marginRight: 0 }} source={require("./../../../assets/images/newdesign/scanner_icon_left.png")} />
                <Image resizeMode="contain" style={{resizeMode:"contain", height: hp("11%"), width: hp("12%"), marginLeft: 0 }} source={require("./../../../assets/images/newdesign/scanner_icon_right.png")} />
          </View>

        </View>

        <View style={{height: "8%", backgroundColor: "white"}}>
          
        </View>
      </>
      :null}
      {state == 2 ?
      <>
      <View style={{width: width, height: "30%", flexDirection:"column", backgroundColor: theme.color.light, zIndex: 2}}>

        <View style={{height: "10%", width: width}}/>
        <View style={{width: width, height: "10%"}}>
          <Text style={{fontFamily: theme.font.bold,color: 'black',textAlign: 'center',fontSize: 14,fontWeight: '600',textAlignVertical: 'center', width: width}}>촬영이 시작되면 가이드라인을 따라</Text>
        </View>
        <View style={{height: "10%", width: width}}>
        <Text style={{fontFamily: theme.font.bold,color: 'black',textAlign: 'center',fontSize: 14,fontWeight: '600',textAlignVertical: 'center', width: width}}>얼굴을 돌려주세요.</Text>
        </View>
      </View>
      <View style={{height: "8%", backgroundColor: "white"}}>
      </View>
    </>
    :null}
    {state == 3 ?
      <>
      <View style={{width: width, height: "30%", flexDirection:"column", backgroundColor: theme.color.light, zIndex: 2}}>

        <View style={{height: "10%", width: width}}/>
        <View style={{width: width, height: "10%"}}>
          <Text style={{fontFamily: theme.font.bold,color: 'black',textAlign: 'center',fontSize: 14,fontWeight: '600',textAlignVertical: 'center', width: width}}>촬영이 시작되면 가이드라인을 따라</Text>
        </View>
        <View style={{height: "10%", width: width}}>
        <Text style={{fontFamily: theme.font.bold,color: 'black',textAlign: 'center',fontSize: 14,fontWeight: '600',textAlignVertical: 'center', width: width}}>얼굴을 돌려주세요.</Text>
        </View>
        <View style={{ flexDirection: 'row', width: width, height: "70%", justifyContent:"center", alignItems:"center"}}>
            <Image resizeMode="contain" style={{ height: "100%", marginRight: 0 }} source={require("./../../../assets/images/blue_three.png")} />
              
        </View>

      </View>
      <View style={{height: "8%", backgroundColor: "white", alignItems:"center"}}/>
    </>
    :null}
    {state == 4 ?
      <>
      <View style={{width: width, height: "30%", flexDirection:"column", backgroundColor: theme.color.light, zIndex: 2}}>

        <View style={{height: "10%", width: width}}/>
        <View style={{width: width, height: "10%"}}>
          <Text style={{fontFamily: theme.font.bold,color: 'black',textAlign: 'center',fontSize: 14,fontWeight: '600',textAlignVertical: 'center', width: width}}>촬영이 시작되면 가이드라인을 따라</Text>
        </View>
        <View style={{height: "10%", width: width}}>
          <Text style={{fontFamily: theme.font.bold,color: 'black',textAlign: 'center',fontSize: 14,fontWeight: '600',textAlignVertical: 'center', width: width}}>얼굴을 돌려주세요.</Text>
        </View>
        <View style={{ flexDirection: 'row', width: width, height: "70%", justifyContent:"center", alignItems:"center"}}>
            <Image resizeMode="contain" style={{ height: "100%", marginRight: 0 }} source={require("./../../../assets/images/blue_two.png")} />
              
        </View>
      </View>
      <View style={{height: "8%", backgroundColor: "white", alignItems:"center"}}>
      </View>
    </>
    :null}
    {state == 5 ?
      <>
      <View style={{width: width, height: "30%", flexDirection:"column", backgroundColor: "white", zIndex: 2}}>

        <View style={{height: "10%", width: width}}/>
        <View style={{width: width, height: "10%"}}>
          <Text style={{fontFamily: theme.font.bold,color: 'black',textAlign: 'center',fontSize: 14,fontWeight: '600',textAlignVertical: 'center', width: width}}>촬영이 곧 시작 됩니다.</Text>
        </View>
        <View style={{height: "10%", width: width}}>
        <Text style={{fontFamily: theme.font.bold,color: 'black',textAlign: 'center',fontSize: 14,fontWeight: '600',textAlignVertical: 'center', width: width}}>가이드라인을 따라 얼굴을 돌려주세요.</Text>
        </View>
        <View style={{ flexDirection: 'row', width: width, height: "70%", justifyContent:"center", alignItems:"center"}}>
            <Image resizeMode="contain" style={{ height: "100%", marginRight: 0 }} source={require("./../../../assets/images/blue_one.png")} />
              
        </View>
      </View>
      <View style={{height: "8%", backgroundColor: theme.color.light, alignItems:"center"}}>
      </View>
    </>
    :null}
    {state == 6 ?
      <>
      <View style={{width: width, height: "30%", flexDirection:"column", backgroundColor: "white", zIndex: 2}}>

        <View style={{height: "10%", width: width}}/>
        <View style={{width: width, height: "10%"}}>
          <Text style={{fontFamily: theme.font.bold,color: 'black',textAlign: 'center',fontSize: 14,fontWeight: '600',textAlignVertical: 'center', width: width}}>촬영이 시작 되었습니다</Text>
        </View>
        <View style={{height: "10%", width: width}}>
        <Text style={{fontFamily: theme.font.bold,color: 'black',textAlign: 'center',fontSize: 14,fontWeight: '600',textAlignVertical: 'center', width: width}}>가이드라인을 따라 얼굴을 돌려주세요.</Text>
        </View>
      </View>
      <View style={{height: "8%", backgroundColor: "white"}}>
      </View>
    </>
    :null}

    {state == 7 ?
      <>
      <View style={{width: width, height: "30%", flexDirection:"column", backgroundColor: theme.color.light, zIndex: 2}}>

        <View style={{height: "10%", width: width}}/>
        <View style={{width: width, height: "10%"}}>
          <Text style={{fontFamily: theme.font.bold,color: 'black',textAlign: 'center',fontSize: 14,fontWeight: '600',textAlignVertical: 'center', width: width}}>인공지능이 분석 중입니다.</Text>
        </View>
        <View style={{height: "10%", width: width}}>
        <Text style={{fontFamily: theme.font.bold,color: 'black',textAlign: 'center',fontSize: 14,fontWeight: '600',textAlignVertical: 'center', width: width}}>잠시만 기다려 주세요.</Text>
        </View>
      </View>
      <View style={{height: "8%", backgroundColor: theme.color.light}}>
      </View> 
    </>
    :null}
    {state == 8 ?
      <>
      <View style={{width: width, height: "30%", flexDirection:"column", backgroundColor: theme.color.light, zIndex: 2}}>

        <View style={{height: "10%", width: width}}/>
        <View style={{width: width, height: "10%"}}>
          <Text style={{fontFamily: theme.font.bold,color: 'black',textAlign: 'center',fontSize: 14,fontWeight: '600',textAlignVertical: 'center', width: width}}>완료 되었습니다.</Text>
        </View>
        <View style={{height: "10%", width: width}}>
        </View>
      </View>
      <View style={{height: "8%", backgroundColor: theme.color.light}}>
      </View>
    </>
    :null}

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
