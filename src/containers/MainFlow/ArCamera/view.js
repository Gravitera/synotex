import * as React from 'react'
import { StyleSheet, View, Button, Platform, PermissionsAndroid, Dimensions, TouchableOpacity, Text, Image} from 'react-native'
import DeepARView from './../../../components/ArCameraUtil/DeepARView';
import { effectsData } from './../../../components/ArCameraUtil/effectsData2';
import {slideTransitionDefinition } from './../../../components/ArCameraUtil/simplenavigator/TransitionDefinitions';
import { CustomBackButtonHeader2, CustomDrawerButtonHeader } from '../../../components/Header';
import { useSelector, useDispatch } from 'react-redux';



class ArCameraView extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      permissionsGranted: Platform.OS === 'ios',
      currentEffectIndex: 0,
      switchCameraInProgress: false,
      MaskColorClicked: false,
      MaskColor: "Black",
      MaskSize: "S",
  //    MaskSize: this.storeData.attendanceReducer.res.MaskSize
  //    MaskSize: this.props.navigation.getParam('MaskSize')
      MaskSize: this.props.route.params.MaskSize
    }

  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        ]
      ).then(result => {
        if (
          result['android.permission.CAMERA'] === 'granted' &&  
          result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted' && 
          result['android.permission.RECORD_AUDIO'] === 'granted') {
            this.setState({ permissionsGranted: true, showPermsAlert: false });
        } else {
          this.setState({ permissionsGranted: false, showPermsAlert: true });
        }
      })
      
      
    }
    console.log(" ======================== this.state in componentDidMount   ", this.state.MaskSize);
  }

  didAppear() {
    if (this.deepARView) {
        this.deepARView.resume();
      }
  }

  willDisappear(){
    if (this.deepARView) {
      this.deepARView.pause();
    }
  }

  onEventSent = (event) => {
      if (event.type === 'cameraSwitch') {
        this.setState({switchCameraInProgress: false})
      } else if (event.type === 'initialized') {
        
      } else if (event.type === 'didStartVideoRecording') {
        
      } else if (event.type === 'didFinishVideoRecording') {
        
      } else if (event.type === 'recordingFailedWithError') {
       
      } else if(event.type === 'screenshotTaken') {
        this.screenshotTaken(event.value)
      } else if (event.type === 'didSwitchEffect') {
       
      } else if (event.type === 'imageVisibilityChanged') {

      }
  }

  onChangeEffect = (idxNumber) => {
    if (!this.deepARView) {
        console.log("view didnt load")
      return
    }

    this.deepARView.switchEffect(idxNumber, "effect");
    //const newEffect = effectsData[idxNumber]
    //this.deepARView.switchEffect(newEffect.name, 'effect')


  }

  takeScreenshot = () => {
    if(this.deepARView) {
      this.deepARView.takeScreenshot()
    }
  }

  screenshotTaken = (screenshotPath) => {
    const path ='file://'+screenshotPath;
    const transition = slideTransitionDefinition({ isVertical: true, direction: 1, duration: 200 })
    this.props.push('preview', transition, { screenshotPath: path})
  }

  switchCamera = () => {
    const { switchCameraInProgress} = this.state;
    if (!switchCameraInProgress && this.deepARView) {
      this.setState({ switchCameraInProgress: true });
      this.deepARView.switchCamera();
    }
  }

  whiteColorClicked = () => {
    console.log(" white mask clicked ");
    console.log(" ========= ");
    console.log(" ===================== this.state   ", this.state.Maskcolor);
    this.setState({MaskColorClicked  : true});
    this.setState({MaskColor : "White"});
    console.log(" ======================== this.state   ", this.state.MaskSize);
    
  }

  blackColorClicked = () => {
    console.log(" black mask clicked ");
    console.log(" ===================== this.state   ", this.state.Maskcolor);
    this.setState({MaskColorClicked  :true});
    this.setState({MaskColor : "Black"});
    console.log(" ======================== this.state   ", this.state.MaskSize); 
  }

  XSclicked = () => {
    
    if(this.state.MaskColor == "White"){

      if(this.state.MaskSize == "XS"){
          this.onChangeEffect(effectsData.wm)
      } else if (this.state.MaskSize == "SS"){
          this.onChangeEffect(effectsData.ws)
      } else if(this.state.MaskSize == "S"){
          this.onChangeEffect(effectsData.wxs)
      } else if(this.state.MaskSize == "M"){
          this.onChangeEffect(effectsData.wxxs)
      } else if(this.state.MaskSize == "L"){
          this.onChangeEffect(effectsData.wxxs)
      }
  
  } else {

      if(this.state.MaskSize == "XS"){
          this.onChangeEffect(effectsData.bm)
      } else if (this.state.MaskSize == "SS"){
          this.onChangeEffect(effectsData.bs)
      } else if(this.state.MaskSize == "S"){
          this.onChangeEffect(effectsData.bxs)
      } else if(this.state.MaskSize == "M"){
          this.onChangeEffect(effectsData.bxxs)
      } else if(this.state.MaskSize == "L"){
          this.onChangeEffect(effectsData.bxxs)
      }
  }
    

  }

  
  SSclicked = () => {
    
    if(this.state.MaskColor == "White"){

      if(this.state.MaskSize == "XS"){
          this.onChangeEffect(effectsData.wl)
      } else if (this.state.MaskSize == "SS"){
          this.onChangeEffect(effectsData.wm)
      } else if(this.state.MaskSize == "S"){
          this.onChangeEffect(effectsData.ws)
      } else if(this.state.MaskSize == "M"){
          this.onChangeEffect(effectsData.wss)
      } else if(this.state.MaskSize == "L"){
          this.onChangeEffect(effectsData.wxs)
      }
  
  } else {

      if(this.state.MaskSize == "XS"){
          this.onChangeEffect(effectsData.bl)
      } else if (this.state.MaskSize == "SS"){
          this.onChangeEffect(effectsData.bm)
      } else if(this.state.MaskSize == "S"){
          this.onChangeEffect(effectsData.bs)
      } else if(this.state.MaskSize == "M"){
          this.onChangeEffect(effectsData.bss)
      } else if(this.state.MaskSize == "L"){
          this.onChangeEffect(effectsData.bxs)
      }
  }
  }
  


  Sclicked = () => {

    if(this.state.MaskColor == "White"){

      if(this.state.MaskSize == "XS"){
          this.onChangeEffect(effectsData.wxl)
      } else if (this.state.MaskSize == "SS"){
          this.onChangeEffect(effectsData.wl)
      } else if(this.state.MaskSize == "S"){
          this.onChangeEffect(effectsData.wm)
      } else if(this.state.MaskSize == "M"){
          this.onChangeEffect(effectsData.ws)
      } else if(this.state.MaskSize == "L"){
          this.onChangeEffect(effectsData.wxs)
      }
  
  } else {

      if(this.state.MaskSize == "XS"){
          this.onChangeEffect(effectsData.bxl)
      } else if (this.state.MaskSize == "SS"){
          this.onChangeEffect(effectsData.bl)
      } else if(this.state.MaskSize == "S"){
          this.onChangeEffect(effectsData.bm)
      } else if(this.state.MaskSize == "M"){
          this.onChangeEffect(effectsData.bs)
      } else if(this.state.MaskSize == "L"){
          this.onChangeEffect(effectsData.bxs)
      }
  }

  }
  Mclicked = () => {

    if(this.state.MaskColor == "White"){

      if(this.state.MaskSize == "XS"){
          this.onChangeEffect(effectsData.wxxl)
      } else if (this.state.MaskSize == "SS"){
          this.onChangeEffect(effectsData.wxl)
      } else if(this.state.MaskSize == "S"){
          this.onChangeEffect(effectsData.wl)
      } else if(this.state.MaskSize == "M"){
          this.onChangeEffect(effectsData.wm)
      } else if(this.state.MaskSize == "L"){
          this.onChangeEffect(effectsData.ws)
      }
  
  } else {

      if(this.state.MaskSize == "XS"){
          this.onChangeEffect(effectsData.bxxl)
      } else if (this.state.MaskSize == "SS"){
          this.onChangeEffect(effectsData.bxl)
      } else if(this.state.MaskSize == "S"){
          this.onChangeEffect(effectsData.bl)
      } else if(this.state.MaskSize == "M"){
          this.onChangeEffect(effectsData.bm)
      } else if(this.state.MaskSize == "L"){
          this.onChangeEffect(effectsData.bs)
      }
  }
  }
  Lclicked = () => {

    if(this.state.MaskColor == "White"){

        if(this.state.MaskSize == "XS"){
            this.onChangeEffect(effectsData.wxxl)
        } else if (this.state.MaskSize == "SS"){
            this.onChangeEffect(effectsData.wxxl)
        } else if(this.state.MaskSize == "S"){
            this.onChangeEffect(effectsData.wxl)
        } else if(this.state.MaskSize == "M"){
            this.onChangeEffect(effectsData.wl)
        } else if(this.state.MaskSize == "L"){
            this.onChangeEffect(effectsData.wm)
        }
    
    } else {

        if(this.state.MaskSize == "XS"){
            this.onChangeEffect(effectsData.bxxl)
        } else if (this.state.MaskSize == "SS"){
            this.onChangeEffect(effectsData.bxxl)
        } else if(this.state.MaskSize == "S"){
            this.onChangeEffect(effectsData.bxl)
        } else if(this.state.MaskSize == "M"){
            this.onChangeEffect(effectsData.bl)
        } else if(this.state.MaskSize == "L"){
            this.onChangeEffect(effectsData.bm)
        }
    }

  }

        
  render() {

    const { permissionsGranted, currentEffectIndex } = this.state
    const { width } = Dimensions.get('window')

    const effect = effectsData[currentEffectIndex]
    return (
      <View style={styles.container}>
        <View style={{flex:1}}>
          <CustomBackButtonHeader2 backFunction={this.props.navigation.goBack} title={'가상착용'} />
          <DeepARView 
              onEventSent={this.onEventSent}
              ref={ ref => this.deepARView = ref }
              style={{width: width, height: '100%'}}
            />
        </View>
        
        {/* <TouchableOpacity style={styles.cameraSwitchContainer} onPress={ () => this.switchCamera() }>
          <Image style={styles.camera} source={cameraSwitchImg} />
        </TouchableOpacity> */}


        {!this.state.MaskColorClicked ?
        <View style={styles.bottomTextContainer2}>
            <Text style={{ color: 'white', textShadowColor:'grey' }}>
                원하시는 마스크 색상을 클릭해주세요
            </Text>
        </View>
        :
        null}

        {!this.state.MaskColorClicked ?
        <View style={styles.bottomTextContainer1}>
            <Text style={{ color: 'white', textShadowColor:'grey' }}>
                사이즈별 가상착용시 실제나온 측정값과 상이할수 있습니다
            </Text>
        </View>
        :
        null}
        
       
        <View style={styles.bottomBtnContainer}>

            <TouchableOpacity style={{flex: 0.5, alignItems: 'center'}} onPress={ () => this.whiteColorClicked() }>
            <View style={styles.buttonCont}>

              <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/white.png`)} />
              <Text style={styles.prodText}>
                ePTFE 필터마스크{'\n'}
                흰색 마스크
              </Text>
            </View>

              {/*<View style={styles.prevContainer}><Text style={styles.prev}>흰색</Text></View>*/}


            </TouchableOpacity>
            <TouchableOpacity style={{flex: 0.5, alignItems: 'center'}}  onPress={ () => this.blackColorClicked() }>
            <View style={styles.buttonCont}>
              <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/black.png`)} />
              <Text style={styles.prodText}>
                ePTFE 필터마스크{'\n'}
                블랙 마스크
              </Text>
            </View>
              {/*<View style={styles.nextContainer}><Text style={styles.next}>검정색</Text></View>*/}
            </TouchableOpacity>

        </View>

        {this.state.MaskColorClicked && this.state.MaskColor == "White" ? 
        <View style={styles.bottomBtnContainer1}>
        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.buttonCont1} onPress={ () => this.XSclicked() }>
          <View style={{justifyContent: "center"}}>
            <Text style={styles.prodText1}>
            키즈(XS)
            </Text>
          </View>
        </TouchableOpacity>


            <TouchableOpacity style={styles.buttonCont1} onPress={ () => this.SSclicked() }>
            <View style={{justifyContent: "center"}}>
              <Text style={styles.prodText1}>
              초등(SS)
              </Text>
            </View>
            </TouchableOpacity>


            <TouchableOpacity style={styles.buttonCont1} onPress={ () => this.Sclicked() }>
            <View style={{justifyContent: "center"}}>
              <Text style={styles.prodText1}>
              스몰(S)
              </Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCont1}  onPress={ () => this.Mclicked() }>
            <View style={{justifyContent: "center"}}>
              <Text style={styles.prodText1}>
              미디움(M)
              </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCont1} onPress={ () => this.Lclicked() }>
              <View style={{justifyContent: "center"}}>
                <Text style={styles.prodText1}>
                  라지(L)
                </Text>
            </View>
        </TouchableOpacity>
        </View>
        </View>
        :
        null}

      {this.state.MaskColorClicked && this.state.MaskColor == "Black" ? 
        <View style={styles.bottomBtnContainer2}>
        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.buttonCont2} onPress={ () => this.XSclicked() }>
            <View style={{justifyContent: "center"}}>
              <Text style={styles.prodText2}>
              키즈(XS)
              </Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity style={styles.buttonCont2} onPress={ () => this.SSclicked() }>
            <View style={{justifyContent: "center"}}>
              <Text style={styles.prodText2}>
              초등(SS)
              </Text>
            </View>
            </TouchableOpacity>



            <TouchableOpacity style={styles.buttonCont2} onPress={ () => this.Sclicked() }>
            <View style={{justifyContent: "center"}}>
              <Text style={styles.prodText2}>
              스몰(S)
              </Text>
            </View>
            </TouchableOpacity>
            
            
            
            <TouchableOpacity style={styles.buttonCont2}  onPress={ () => this.Mclicked() }>
            <View style={{justifyContent: "center"}}>
              <Text style={styles.prodText2}>
              미디움(M)
              </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCont2} onPress={ () => this.Lclicked() }>
              <View style={{justifyContent: "center"}}>
                <Text style={styles.prodText2}>
                  라지(L)
                </Text>
              </View>
            </TouchableOpacity>
        </View>
        </View>
        :
        null}


          {/*
        <View style={styles.bottomBtnContainer21}>
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.buttonCont1} onPress={ () => this.onChangeEffect(4) }>
                <Text style={styles.prodText1}>
                블랙 XS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCont1} onPress={ () => this.onChangeEffect(5) }>
              <Text style={styles.prodText}>
                블랙 S
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCont1} onPress={ () => this.onChangeEffect(6) }>
              <Text style={styles.prodText1}>
                블랙 M
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCont1}  onPress={ () => this.onChangeEffect(7) }>
              <Text style={styles.prodText1}>
                블랙 L
              </Text>
            </TouchableOpacity>
        </View>
        </View>
          */}
            
  
      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  deepARView: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  titleContainer: {
    position: 'absolute',
    top: 100,
    width: '50%',
    backgroundColor: 'white',
    borderRadius:4,
    backgroundColor: 'white'
  },
  title: {
    flex: 1,
    textAlign:'center',
    fontSize: 20
  },
 
  bottomBtnContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    bottom: 100,
    height: 50,
    marginBottom: "3%"
  },
  nextContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4,
    backgroundColor: 'white'
  },
  prevContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4,
    backgroundColor: 'white'
  },
  next: {
    textAlign:'center',
    fontSize: 28
  },
  prev: {
    textAlign:'center',
    fontSize: 28
  },

  screenshotContainer: {},
  screenshot: {
    width: 70,
    height: 70
  },

  cameraSwitchContainer: {
    position: 'absolute',
    width: 50,
    height: 40,
    right: 20,
    top:  50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  buttonCont: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 80,
    width: "80%",
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 2,
  },
  galleryImage: {
    width: 47.75,
    height: 76,
    marginBottom: 60,
  },
  prodText: {
    fontSize: 12,
    height: 76,
    textAlignVertical: 'center',
    marginLeft: 8
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  deepARView1: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  titleContainer1: {
    position: 'absolute',
    top: 100,
    width: '50%',
    backgroundColor: 'white',
    borderRadius:4,
    backgroundColor: 'white'
  },
  title1: {
    flex: 1,
    textAlign:'center',
    fontSize: 20
  },
  bottomTextContainer1: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    bottom: 130,
    height: 50,
    marginBottom: "-20%"
  },
  bottomBtnContainer1: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    bottom: 80,
    height: 50,
    marginBottom: "-12.5%"
  },

  bottomBtnContainer2: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    bottom: 80,
    height: 50,
    marginBottom: "-12.5%"
  },

  bottomBtnContainer21: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    bottom: 10,
    height: 50
  },
  nextContainer1: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4,
    backgroundColor: 'white'
  },
  prevContainer1: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4,
    backgroundColor: 'white'
  },
  next1: {
    textAlign:'center',
    fontSize: 28
  },
  prev1: {
    textAlign:'center',
    fontSize: 28
  },

  screenshotContainer1: {},
  screenshot1: {
    width: 70,
    height: 70
  },

  cameraSwitchContainer1: {
    position: 'absolute',
    width: 50,
    height: 40,
    right: 20,
    top:  50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera1: {
    width: '100%',
    height: '100%',
  },
  buttonCont1: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    width: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 2,
    margin:10
  },
  buttonCont2: {
    backgroundColor: "black",
    borderRadius: 10,
    height: 40,
    width: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 2,
    margin:10
  },
  galleryImage1: {
    width: 47.75,
    height: 76,
    marginBottom: 60,
  },
  prodText1: {
    fontSize: 12,
    height: 50,
    textAlignVertical: 'center'
  },
  prodText2: {
    fontSize: 12,
    height: 50,
    textAlignVertical: 'center',
    //backgroundColor: "black",
    color: "white"
  },
  bottomTextContainer2: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    bottom: 130,
    height: 50,
    marginBottom: "12%"
  },
})

export default ArCameraView;










