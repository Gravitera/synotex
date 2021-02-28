import * as React from 'react'
import { StyleSheet, View, Button, Platform, PermissionsAndroid, Dimensions, TouchableOpacity, Text, Image} from 'react-native'
import DeepARView from './../../../components/ArCameraUtil/DeepARView';
import { effectsData } from './../../../components/ArCameraUtil/effectsData';
import {slideTransitionDefinition } from './../../../components/ArCameraUtil/simplenavigator/TransitionDefinitions';
import { CustomBackButtonHeader2, CustomDrawerButtonHeader } from '../../../components/Header';




class ArCameraView extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      permissionsGranted: Platform.OS === 'ios',
      currentEffectIndex: 0,
      switchCameraInProgress: false
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

    const newEffect = effectsData[idxNumber]
    this.deepARView.switchEffect(newEffect.name, 'effect')


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
       
        <View style={styles.bottomBtnContainer}>

            <TouchableOpacity style={{flex: 0.5, alignItems: 'center'}} onPress={ () => this.onChangeEffect(0) }>
            <View style={styles.buttonCont}>

              <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/white.png`)} />
              <Text style={styles.prodText}>
                ePTFE 필터마스크{'\n'}
                흰색 마스크
              </Text>
            </View>

              {/*<View style={styles.prevContainer}><Text style={styles.prev}>흰색</Text></View>*/}


            </TouchableOpacity>
            <TouchableOpacity style={{flex: 0.5, alignItems: 'center'}}  onPress={ () => this.onChangeEffect(1) }>

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
    height: 50
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
  }
})

export default ArCameraView;