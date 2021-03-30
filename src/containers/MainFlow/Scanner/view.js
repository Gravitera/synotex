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


import { SafeAreaView, StatusBar } from "react-native";
import { Fragment } from 'react';



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
const frameSide = width - 160;
const actionSide = 250;
const loaderSide = 100;
const date = moment().local().format('l');
let windowHeight = 220;


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
    console.log(" ======================== face detected !!!! from Scanner ");
  };

  const tempfunc = async () => {
    console.log(" ========= current state   before click  ", state);
    setState(1);
    guide_sound.play((success) => {
      console.log("success");
    });
    console.log(" ========= current state   after click  ", state);
    setTimeout(() => {
      setState(2);
      console.log(" ========= current state   after wait  ", state);
    }, 1000);

    setTimeout(() => {
      setState(3);
      button_beep.play((success) => {
        console.log("success");
      })
      console.log(" ========= current state   after wait  blue_three ", state);
    },4000);
    setTimeout(() => {
      setState(4);
      button_beep.play((success) => {
        console.log("success");
      })
      console.log(" ========= current state   after wait  blue_two ", state);
    },5000);
    setTimeout(() => {
      setState(5);
      button_beep.play((success) => {
        console.log("success");
      })
      console.log(" ========= current state   after wait  blue_one ", state);
    },6000);
    setTimeout(() => {
  //    setState(6);
      console.log(" ========= current state   after wait  initial take photo ", state);
      takePicture();
    },7000);

    setTimeout(() => {
      console.log(" ============ play turn your face sound ");
      setState(6);
      turnFace.play((success) => {
        console.log("success");
      })
    }, 8000);

    setTimeout(() => {
      setState(7);
      AI_measurement_sound.play((success) => {
        console.log("success");
      })
      console.log(" ========= current state   after wait  show star-like sparkling ", state);
    },13000);
    setTimeout(() => {
      setState(8);
      console.log(" ========= current state   after wait  show blue-check-mark ", state);
    },15000);

    setTimeout(() => {
      /*
      const data = {
        FaceWidth: props.FaceWidth,
        FaceHeight: props.FaceHeight,
        FaceWidthPercent: props.FaceWidthPercent,
        FaceHeightPercent: props.FaceHeightPercent,
        FrontImage: props.FrontImage,
        MaskSize: props.MaskSize
      }
      */
     console.log(props)
     console.log(resp)
      console.log(" =========== onNext data    ", props.resp);
      props.onNext(props.resp);
    },16000);

  };

  console.log(" ============ current state before return   ", state);


  return (
    <>

      <Fragment>
          <SafeAreaView style={{ flex: 0, backgroundColor: "#0D3A71" }} />
          <StatusBar barStyle="light-content" />

        
                  <View style={styles.container}>
                  
                    <RNCamera
                      ref={cameraRef}
                      style={styles.preview}
                      type={RNCamera.Constants.Type.front}
                      flashMode={RNCamera.Constants.FlashMode.off}
                      playSoundOnCapture={false}

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




                      {/*<Camera 
                        style={{ flex: 1 }} 
                        type={Camera.Constants.Type} 
                        onFacesDetected={this.state.faceDetecting ? this.handleFacesDetected : undefined }
                        onFaceDetectionError={this.handleFaceDetectionError}
                        faceDetectorSettings={{
                          mode: FaceDetector.Constants.Mode.fast,
                          detectLandmarks: FaceDetector.Constants.Mode.none,
                          runClassifications: FaceDetector.Constants.Mode.none,
                        }}
                        ref={cameraRef}
                      >*/}



              
                    {/* <CustomDrawerButtonHeader title={'About'} /> */}


                    {/*<View style={styles.frameContainer}>
                      <Image resizeMode={'contain'} style={styles.frame} source={frame} />
                    </View>
                    <View style={{ width, height: windowHeight, zIndex: 1000, position: 'absolute', bottom: 0, backgroundColor: theme.color.light }}>
                      <View style={styles.buttonOver}>
                        <Text style={styles.text}>측정사진이 마음에 들지 않으시면 재촬영{"\n"}
                        측정사진이 맘에 드신다면 측정결과 확인 버튼을 눌러주세요.</Text>
                      </View>
                      <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                          <TouchableOpacity onPress={takePicture}>
                            <Image style={{ width: 103, height: 103 }} source={require("./../../../assets/images/shutter.png")} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>*/}

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

                      <SafeAreaView style={{ flex: 1, backgroundColor: "#0D3A71" }}>
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
                      </SafeAreaView>
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



                    {/* <View
                      style={{
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        width: width - 40,
                        marginTop: 20,
                        borderRadius: 10,
                        marginLeft: 20,
                        paddingVertical: 20,
                        zIndex: 100
                      }}>
                      <Text style={{ textAlign: 'center', color: '#000' }}>
                        경계 상자에면 정렬
                      </Text>
                    </View> */}
                    {/* <View
                      style={{
                        position: 'absolute',
                        right: 0,
                        height,
                        justifyContent: 'center',
                        zIndex: 100,
                      }}>
                      {!picture && (
                        <Pressable
                          disabled={props.loading || picture}
                          onPress={takePicture}
                          style={{
                            ...styles.capture,
                            borderColor: props.loading ? '#fff6' : '#fff',
                          }}>
                          <Icon
                            name="camera-alt"
                            size={60}
                            color={props.loading ? '#fff6' : '#fff'}
                          />
                        </Pressable>
                      )}
                    </View> */}
                    {/* <View style={styles.displayKids}>
                      <List.Accordion
                        title={`        Total: ${props.students.length
                          }          On Board: ${props.onboardCount && props.onboardCount > 0
                            ? props.onboardCount
                            : 0
                          }`}
                        style={{
                          backgroundColor: 'white',
                          color: 'black',
                          borderRadius: 20,
                        }}
                        titleStyle={{
                          color: 'black',
                          fontWeight: 'normal',
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}>
                        {props.students.length > 0 ? (
                          <View style={styles.collapsible}>
                            <DataTable
                              style={{
                                backgroundColor: 'white',
                                width: 550,
                                marginLeft: -120,
                              }}>
                              <DataTable.Header
                                style={{
                                  backgroundColor: '#5CA8D6',
                                  color: '#FFFFFF',
                                  paddingHorizontal: -30,
                                }}>
                                <DataTable.Title style={{ ...styles.tableheading }}>
                                  <Text style={{ fontSize: 16, color: '#fff' }}>No</Text>
                                </DataTable.Title>
                                <DataTable.Title style={{ ...styles.tableheading }}>
                                  <Text style={{ fontSize: 16, color: '#fff' }}>Name</Text>
                                </DataTable.Title>
                                <DataTable.Title style={{ ...styles.tableheading }}>
                                  <Text style={{ fontSize: 16, color: '#fff' }}>
                                    Check In
                                  </Text>
                                </DataTable.Title>
                                <DataTable.Title style={{ ...styles.tableheading }}>
                                  <Text style={{ fontSize: 16, color: '#fff' }}>
                                    Check Out
                                  </Text>
                                </DataTable.Title>
                              </DataTable.Header>
                              <ScrollView
                                style={styles.scrollView}
                                contentContainerStyle={{ flexGrow: 1 }}>
                                <View>
                                  {props.students.map((students, index) => {
                                    return (
                                      <DataTable.Row
                                        key={index}
                                        style={{
                                          backgroundColor: 'white',
                                          color: '#FFFFFF',
                                          paddingHorizontal: 10,
                                        }}>
                                        <DataTable.Cell style={{ ...styles.tableheading }}>
                                          <Text style={{ fontSize: 14 }}>
                                            {students.studentId}
                                          </Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ ...styles.tableheading }}>
                                          <Text style={{ fontSize: 14 }}>
                                            {students.name}
                                          </Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ ...styles.tabletime }}>
                                          <View>
                                            {props?.onboardStudents &&
                                              props.onboardStudents[date] &&
                                              props.onboardStudents[date][students._id]
                                                ?.checkIn ? (
                                                <FAIcon name="circle" color="green" />
                                              ) : (
                                                <FAIcon name="circle" color="#B7B7B7" />
                                              )}
                                          </View>
                                          <View
                                            style={{
                                              width: 60,
                                            }}>
                                            <Text
                                              style={{
                                                color: '#B7B7B7',
                                                width: '100%',
                                                textAlign: 'center',
                                                fontSize: 12,
                                                lineHeight: 12,
                                              }}>
                                              {props.onboardStudents &&
                                                props.onboardStudents[date] &&
                                                props.onboardStudents[date][students._id]
                                                  ?.checkIn
                                                ?
                                                moment(
                                                  props.onboardStudents[date][
                                                    students._id
                                                  ]?.checkIn,
                                                )
                                                  .local()
                                                  .format('LT')
                                                : '—'}
                                            </Text>
                                          </View>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ ...styles.tabletime }}>
                                          <View>
                                            {props.onboardStudents &&
                                              props.onboardStudents[date] &&
                                              props.onboardStudents[date][students._id]
                                                ?.checkOut ? (
                                                <FAIcon name="circle" color="green" />
                                              ) : (
                                                <FAIcon name="circle" color="#B7B7B7" />
                                              )}
                                          </View>
                                          <View
                                            style={{
                                              width: 60,
                                            }}>
                                            <Text
                                              style={{
                                                color: '#B7B7B7',
                                                width: '100%',
                                                textAlign: 'center',
                                                fontSize: 12,
                                                lineHeight: 12,
                                              }}>
                                              {props.onboardStudents &&
                                                props.onboardStudents[date] &&
                                                props.onboardStudents[date][students._id]
                                                  ?.checkOut
                                                ? moment(
                                                  props.onboardStudents[date][
                                                    students._id
                                                  ]?.checkOut,
                                                )
                                                  .local()
                                                  .format('LT')
                                                : '—'}
                                            </Text>
                                          </View>
                                        </DataTable.Cell>
                                      </DataTable.Row>
                                    );
                                  })}
                                </View>

                                <View>
                                  <DataTable.Row

                                    style={{
                                      backgroundColor: 'purple',
                                      color: '#FFFFFF',
                                      paddingHorizontal: 10,
                                    }}>

                                    <DataTable.Cell style={{ ...styles.tableheading }}>
                                      <Text style={{ fontSize: 16, color: '#fff' }}>No</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{ ...styles.tableheading }}>
                                      <Text style={{ fontSize: 16, color: '#fff' }}>Name</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{ ...styles.tableheading }}>
                                      <Text style={{ fontSize: 16, color: '#fff' }}>Check In</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{ ...styles.tableheading }}>
                                      <Text style={{ fontSize: 16, color: '#fff' }}>Check Out</Text>
                                    </DataTable.Cell>


                                  </DataTable.Row>

                                </View>
                              </ScrollView>

                              <DataTable.Pagination
                                page={1}
                                numberOfPages={3}
                                onPageChange={page => {
                                  console.log(page);
                                }}
                                label="1-2 of 6"
                              />
                            </DataTable>
                          </View>
                        ) : (
                            <View
                              style={{
                                justifyContent: 'center',
                                backgroundColor: '#5CA8D6',
                                width: 350,
                                height: 60,
                                marginTop: 10,
                                borderRadius: 10,
                              }}>
                              <Text style={{ textAlign: 'center', color: 'white' }}>
                                NO STUDENTS PRESENT
                            </Text>
                            </View>
                          )}
                      </List.Accordion>
                    </View> */}

                    {/* {!picture && !recog && !isLoading && (
                      <View style={styles.displayGest}>
                        <Text style={styles.text}>
                          Keep Blinking Your Left Eye to record your gesture
                        </Text>
                      </View>
                    )} */}

                    {/* {!startRecog && (
                      <TouchableOpacity
                        onPress={() => setStartRecog(true)}
                        style={styles.proxyView}>
                        <View>
                          <Button style={styles.proxyhistory} title="Start">
                            <Text style={{ color: 'white', textTransform: 'capitalize' }}>
                              {' '}
                              Start
                            </Text>
                          </Button>
                        </View>
                      </TouchableOpacity>
                    )} */}

                    {/* {startRecog && (
                      <TouchableOpacity
                        onPress={() => setStartRecog(false)}
                        style={styles.proxyView}>
                        <View>
                          <Button style={styles.proxyhistory} title="Start">
                            <Text style={{ color: 'white', textTransform: 'capitalize' }}>
                              {' '}
                              Stop
                            </Text>
                          </Button>
                        </View>
                      </TouchableOpacity>
                    )} */}

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

                    {/* {props.action ? (
                      <View
                        style={{
                          position: 'absolute',
                          top: height / 2 - actionSide / 2,
                          left: width / 2 - actionSide / 2,
                          width: actionSide,
                          height: actionSide,
                          borderRadius: actionSide,
                          backgroundColor:
                            props.actionImage === 'enter'
                              ? '#14BB46'
                              : props.actionImage === 'leave'
                                ? '#E5D048'
                                : props.actionImage === 'close'
                                  ? '#E42323'
                                  : null,
                          zIndex: 1001,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          resizeMode="contain"
                          style={{ width: actionSide - 100, height: actionSide - 100 }}
                          source={
                            props.actionImage === 'enter'
                              ? require('./../../../assets/images/enter.png')
                              : props.actionImage === 'leave'
                                ? require('./../../../assets/images/leave.png')
                                : props.actionImage === 'close'
                                  ? require('./../../../assets/images/close.png')
                                  : null
                          }
                        />
                      </View>
                    ) : null} */}
                  </View>

        </Fragment>
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
