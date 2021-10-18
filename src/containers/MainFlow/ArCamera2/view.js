import * as React from 'react'
import { StyleSheet, View, Button, Platform, PermissionsAndroid, Dimensions, TouchableOpacity, Text, Image} from 'react-native'
import DeepARView from './../../../components/ArCameraUtil/DeepARView';
import { effectsData } from './../../../components/ArCameraUtil/effectsData2';
import {slideTransitionDefinition } from './../../../components/ArCameraUtil/simplenavigator/TransitionDefinitions';
import { CustomBackButtonHeader2, CustomDrawerButtonHeader } from '../../../components/Header';



class ArCameraView extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      permissionsGranted: Platform.OS === 'ios',
      currentEffectIndex: 0,
      switchCameraInProgress: false,
      MaskColorClicked: false,
      MaskColor: "Black",
      MaskSize: "M",



      maskidx : [0,1,2,3,4,5,6,7,8],
      maskcolor : ["grey", "darkgrey", "darkpink", 
      "lightgrey", "lightpink", "beige", "black", "khaki", "white"],

      maskcolorkor : ["그레이", "다크 {'\n'} 그레이", "다크 {'\n'} 핑크",
      "라이트 {'\n'} 그레이", "라이트 {'\n'} 핑크", "블랙", "카키", "화이트"],

      maskloc : "./../../../assets/images/masks/",
      currmaskidx : [0,1],
      imglocs: require("./../../../assets/images/masks/grey.png"),
      imglocs2: require("./../../../assets/images/masks/darkgrey.png"),
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
    console.log(" ====================  this.state   ", this.state);
  }

  pressLeft(){
    var temp = this.state.currmaskidx;
    var temp2 = true;
    //console.log(" ====== current mask idx pressed left  ")
    if (temp[0] == 0){
      //console.log(" ===== 1 ")
      this.setState({currmaskidx: [8,0]});
      this.setState({imglocs: require("./../../../assets/images/masks/white.png")});
      this.setState({imglocs2: require("./../../../assets/images/masks/grey.png")});
      temp2 = false;
    }
    if (temp[0] == 8 && temp[1] == 0){
      //console.log(" ===== 2 ")
      this.setState({currmaskidx: [7,8]});
      this.setState({imglocs: require("./../../../assets/images/masks/khaki.png")});
      this.setState({imglocs2: require("./../../../assets/images/masks/white.png")});
      temp2 = false;
    }
    if (temp2 == true){
      //console.log(" ===== 3 ")
      var newtemp = [this.state.currmaskidx[0]-1, this.state.currmaskidx[1]-1];

      if (newtemp[0] == 0 && newtemp[1] == 1){
        this.setState({imglocs: require("./../../../assets/images/masks/grey.png")});
        this.setState({imglocs2: require("./../../../assets/images/masks/darkgrey.png")});
      }
      if (newtemp[0] == 1 && newtemp[1] == 2){
        this.setState({imglocs: require("./../../../assets/images/masks/darkgrey.png")});
        this.setState({imglocs2: require("./../../../assets/images/masks/darkpink.png")});
      }
      if (newtemp[0] == 2 && newtemp[1] == 3){
        this.setState({imglocs: require("./../../../assets/images/masks/darkpink.png")});
        this.setState({imglocs2: require("./../../../assets/images/masks/lightgrey.png")});
      }
      if (newtemp[0] == 3 && newtemp[1] == 4){
        this.setState({imglocs: require("./../../../assets/images/masks/lightgrey.png")});
        this.setState({imglocs2: require("./../../../assets/images/masks/lightpink.png")});
      }
      if (newtemp[0] == 4 && newtemp[1] == 5){
        this.setState({imglocs: require("./../../../assets/images/masks/lightpink.png")});
        this.setState({imglocs2: require("./../../../assets/images/masks/beige.png")});
      }
      if (newtemp[0] == 5 && newtemp[1] == 6){
        this.setState({imglocs: require("./../../../assets/images/masks/beige.png")});
        this.setState({imglocs2: require("./../../../assets/images/masks/black.png")});
      }
      if (newtemp[0] == 6 && newtemp[1] == 7){
        this.setState({imglocs: require("./../../../assets/images/masks/black.png")});
        this.setState({imglocs2: require("./../../../assets/images/masks/khaki.png")});
      }
      if (newtemp[0] == 7 && newtemp[1] == 8){
        this.setState({imglocs: require("./../../../assets/images/masks/khaki.png")});
        this.setState({imglocs2: require("./../../../assets/images/masks/white.png")});
      }

      this.setState({currmaskidx: newtemp});
    }
    //console.log(" ====== current mask idx pressed left  ", this.state.currmaskidx);

  }

  pressRight(){
    var temp = this.state.currmaskidx;
    var temp2 = true;
    //console.log(" ====== current mask idx pressed right  ")
    if (temp[1] == 8){
      //console.log(" ===== 1 ")
      this.setState({currmaskidx: [8,0]});
      this.setState({imglocs: require("./../../../assets/images/masks/white.png")});
      this.setState({imglocs2: require("./../../../assets/images/masks/grey.png")});
      temp2 = false;
    }
    if (temp[1] == 0 && temp[0] == 8){
      //console.log(" ===== 2 ")
      this.setState({currmaskidx: [1,2]});
      this.setState({imglocs: require("./../../../assets/images/masks/grey.png")});
      this.setState({imglocs2: require("./../../../assets/images/masks/darkgrey.png")});
      temp2 = false;
    }
    if (temp2 == true){
      //console.log(" ===== 3 ")
      var newtemp = [this.state.currmaskidx[0]+1, this.state.currmaskidx[1]+1];
      if (newtemp[0] == 0 && newtemp[1] == 1){
        this.setState({imglocs: require("./../../../assets/images/masks/grey.png")});
        this.setState({imglocs2: require("./../../../assets/images/masks/darkgrey.png")});
      }
      if (newtemp[0] == 1 && newtemp[1] == 2){
        this.setState({imglocs: require("./../../../assets/images/masks/darkgrey.png")});
        this.setState({imglocs2: require("./../../../assets/images/masks/darkpink.png")});
      }
      if (newtemp[0] == 2 && newtemp[1] == 3){
        this.setState({imglocs: require("./../../../assets/images/masks/darkpink.png")});
        this.setState({imglocs2: require("./../../../assets/images/masks/lightgrey.png")});
      }
      if (newtemp[0] == 3 && newtemp[1] == 4){
        this.setState({imglocs: require("./../../../assets/images/masks/lightgrey.png")});
        this.setState({imglocs2: require("./../../../assets/images/masks/lightpink.png")});
      }
      if (newtemp[0] == 4 && newtemp[1] == 5){
        this.setState({imglocs: require("./../../../assets/images/masks/lightpink.png")});
        this.setState({imglocs2: require("./../../../assets/images/masks/beige.png")});
      }
      if (newtemp[0] == 5 && newtemp[1] == 6){
        this.setState({imglocs: require("./../../../assets/images/masks/beige.png")});
        this.setState({imglocs2: require("./../../../assets/images/masks/black.png")});
      }
      if (newtemp[0] == 6 && newtemp[1] == 7){
        this.setState({imglocs: require("./../../../assets/images/masks/black.png")});
        this.setState({imglocs2: require("./../../../assets/images/masks/khaki.png")});
      }
      if (newtemp[0] == 7 && newtemp[1] == 8){
        this.setState({imglocs: require("./../../../assets/images/masks/khaki.png")});
        this.setState({imglocs2: require("./../../../assets/images/masks/white.png")});
      }
      this.setState({currmaskidx: newtemp});
    }
    //console.log(" ====== current mask idx pressed right  ", this.state.currmaskidx);
  }

  leftmaskclicked(temp){
    console.log(" ====== left mask clicked   ", temp)
    this.setState({MaskColor: temp});
    /*
    if (this.state.imglocs == require("./../../../assets/images/masks/grey.png")){
      this.setState({MaskColor: "grey"});
    }
    if (this.state.imglocs == require("./../../../assets/images/masks/darkgrey.png")){
      this.setState({MaskColor: "darkgrey"});
    }
    if (this.state.imglocs == require("./../../../assets/images/masks/darkpink.png")){
      this.setState({MaskColor: "darkpink"});
    }
    if (this.state.imglocs == require("./../../../assets/images/masks/lightgrey.png")){
      this.setState({MaskColor: "lightgrey"});
    }
    if (this.state.imglocs == require("./../../../assets/images/masks/lightpink.png")){
      this.setState({MaskColor: "lightpink"});
    }
    if (this.state.imglocs == require("./../../../assets/images/masks/beige.png")){
      this.setState({MaskColor: "beige"});
    }
    if (this.state.imglocs == require("./../../../assets/images/masks/black.png")){
      this.setState({MaskColor: "black"});
    }
    if (this.state.imglocs == require("./../../../assets/images/masks/khaki.png")){
      this.setState({MaskColor: "khaki"});
    }
    if (this.state.imglocs == require("./../../../assets/images/masks/white.png")){
      this.setState({MaskColor: "white"});
    }
    */
    this.setState({MaskColorClicked: true});
    console.log(" ========= maskcolor   ", this.state.MaskColor);
  }      

  rightmaskclicked(temp){
    console.log(" ====== right mask clicked   ", temp)
    this.setState({MaskColor: temp});
    /*
    if (this.state.imglocs2 == require("./../../../assets/images/masks/grey.png")){
      this.setState({MaskColor: "grey"});
    }
    if (this.state.imglocs2 == require("./../../../assets/images/masks/darkgrey.png")){
      this.setState({MaskColor: "darkgrey"});
    }
    if (this.state.imglocs2 == require("./../../../assets/images/masks/darkpink.png")){
      this.setState({MaskColor: "darkpink"});
    }
    if (this.state.imglocs2 == require("./../../../assets/images/masks/lightgrey.png")){
      this.setState({MaskColor: "lightgrey"});
    }
    if (this.state.imglocs2 == require("./../../../assets/images/masks/lightpink.png")){
      this.setState({MaskColor: "lightpink"});
    }
    if (this.state.imglocs2 == require("./../../../assets/images/masks/beige.png")){
      this.setState({MaskColor: "beige"});
    }
    if (this.state.imglocs2 == require("./../../../assets/images/masks/black.png")){
      this.setState({MaskColor: "black"});
    }
    if (this.state.imglocs2 == require("./../../../assets/images/masks/khaki.png")){
      this.setState({MaskColor: "khaki"});
    }
    if (this.state.imglocs2 == require("./../../../assets/images/masks/white.png")){
      this.setState({MaskColor: "white"});
    }
    */
    this.setState({MaskColorClicked: true});
    console.log(" ========= maskcolor   ", this.state.MaskColor);
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
    this.setState({MaskColorClicked  : true});
    this.setState({MaskColor : "White"});
    
  }

  blackColorClicked = () => {
    console.log(" black mask clicked ");
    this.setState({MaskColorClicked  :true});
    this.setState({MaskColor : "Black"});
  }

  /*
  XSclicked = () => {
    
    if(this.state.MaskColor == "White"){
      this.onChangeEffect(2);
    
    } else {
      this.onChangeEffect(9);
    
    }
    

  }
  */

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
          this.onChangeEffect(effectsData.wxxxs)
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
          this.onChangeEffect(effectsData.bxxxs)
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


 /*
  XSclicked = () => {
    
    if(this.state.MaskColor == "White"){
        if(this.state.MaskSize == "XS"){
            this.onChangeEffect(4)
        } else if(this.state.MaskSize == "S"){
            this.onChangeEffect(3)
        } else if(this.state.MaskSize == "M"){
            this.onChangeEffect(2)
        } else if(this.state.MaskSize == "L"){
            this.onChangeEffect(1)
        }
    
    } else {
        if(this.state.MaskSize == "XS"){
            this.onChangeEffect(12)
        } else if(this.state.MaskSize == "S"){
            this.onChangeEffect(11)
        } else if(this.state.MaskSize == "M"){
            this.onChangeEffect(10)
        } else if(this.state.MaskSize == "L"){
            this.onChangeEffect(9)
        }
    
    }
    

  }

  
  SSclicked = () => {
    
    if(this.state.MaskColor == "White"){
        if(this.state.MaskSize == "XS"){
            this.onChangeEffect(3)
        } else if(this.state.MaskSize == "S"){
            this.onChangeEffect(4)
        } else if(this.state.MaskSize == "M"){
            this.onChangeEffect(5)
        } else if(this.state.MaskSize == "L"){
            this.onChangeEffect()
        }
    
    } else {
        if(this.state.MaskSize == "XS"){
            this.onChangeEffect(12)
        } else if(this.state.MaskSize == "S"){
            this.onChangeEffect(11)
        } else if(this.state.MaskSize == "M"){
            this.onChangeEffect(10)
        } else if(this.state.MaskSize == "L"){
            this.onChangeEffect(9)
        }
    
    }
  }
  


  Sclicked = () => {

    if(this.state.MaskColor == "White"){
      this.onChangeEffect(3);
    
    } else {
      this.onChangeEffect(11);
    
    }

  }
  Mclicked = () => {

    if(this.state.MaskColor == "White"){
      this.onChangeEffect(4);
    
    } else {
      this.onChangeEffect(12);
    
    }
  }
  Lclicked = () => {

    if(this.state.MaskColor == "White"){
      this.onChangeEffect(5);
    
    } else {
      this.onChangeEffect(13);
    
    }

  }
  */

        
  render() {

    const { permissionsGranted, currentEffectIndex } = this.state
    const { height, width } = Dimensions.get('window');

    const effect = effectsData[currentEffectIndex]

    return (
      <>
      <View style={styles.container}>
        <View style={{flex:1}}>
          <CustomBackButtonHeader2 backFunction={this.props.navigation.goBack} title={'가상착용'} />
          <DeepARView 
              onEventSent={this.onEventSent}
              ref={ ref => this.deepARView = ref }
              style={{width: width, height: '100%'}}
            />
        </View>

        
      
      </View>

      <View style={{position: "absolute", marginTop: height*0.65, width: width, height: height*0.2, flexDirection: "row", justifyContent: "space-between"}}>
          
          <TouchableOpacity onPress={() => this.pressLeft()}>
            <View style={{marginTop: height*0.05, height: width*0.2, width: width*0.1, justifyContent: "center" }}>
              <Image resizeMode="contain" style={{marginLeft: "25%"}} source={require(`./../../../assets/images/left_arrow_ar.png`)} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={(data) => this.leftmaskclicked(data)}>
            <View style={{width: width*0.36, height: width*0.2, backgroundColor: "white", marginTop: width*0.093, borderRadius: 10, flexDirection: "row"}}>
              
              <Image resizeMode="contain" style={{marginLeft: "1%", marginTop: "5%"}} source={this.state.imglocs} />

              {this.state.imglocs == require("./../../../assets/images/masks/grey.png") ? 
                <Text style={{marginTop: "35%"}}>그레이</Text>
              : null}
              {this.state.imglocs == require("./../../../assets/images/masks/darkgrey.png") ? 
                <Text style={{marginTop: "23%"}}>   다크 {"\n"} 그레이</Text>
              : null}
              {this.state.imglocs == require("./../../../assets/images/masks/darkpink.png") ? 
                <Text style={{marginTop: "23%"}}>   다크 {"\n"}   핑크</Text>
              : null}
              {this.state.imglocs == require("./../../../assets/images/masks/lightgrey.png") ? 
                <Text style={{marginTop: "23%"}}>   라이트 {"\n"}   그레이</Text>
              : null}
              {this.state.imglocs == require("./../../../assets/images/masks/lightpink.png") ? 
                <Text style={{marginTop: "23%"}}>   라이트 {"\n"}   핑크</Text>
              : null}
              {this.state.imglocs == require("./../../../assets/images/masks/beige.png") ? 
                <Text style={{marginTop: "35%"}}>베이지</Text>
              : null}
              {this.state.imglocs == require("./../../../assets/images/masks/black.png") ? 
                <Text style={{marginTop: "35%"}}>블랙</Text>
              : null}
              {this.state.imglocs == require("./../../../assets/images/masks/khaki.png") ? 
                <Text style={{marginTop: "35%"}}>카키</Text>
              : null}
              {this.state.imglocs == require("./../../../assets/images/masks/white.png") ? 
                <Text style={{marginTop: "35%"}}>화이트</Text>
              : null}

            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={(data) => this.rightmaskclicked(data)}>
            <View style={{width: width*0.36, height: width*0.2, backgroundColor: "white", marginTop: width*0.093, borderRadius: 10, flexDirection: "row"}}>
              
              <Image resizeMode="contain" style={{marginLeft: "1%", marginTop: "5%"}} source={this.state.imglocs2} />

              {this.state.imglocs2 == require("./../../../assets/images/masks/grey.png") ? 
                <Text style={{marginTop: "35%"}}>그레이</Text>
              : null}
              {this.state.imglocs2 == require("./../../../assets/images/masks/darkgrey.png") ? 
                <Text style={{marginTop: "23%"}}>   다크 {"\n"} 그레이</Text>
              : null}
              {this.state.imglocs2 == require("./../../../assets/images/masks/darkpink.png") ? 
                <Text style={{marginTop: "23%"}}>   다크 {"\n"}   핑크</Text>
              : null}
              {this.state.imglocs2 == require("./../../../assets/images/masks/lightgrey.png") ? 
                <Text style={{marginTop: "23%"}}>   라이트 {"\n"}   그레이</Text>
              : null}
              {this.state.imglocs2 == require("./../../../assets/images/masks/lightpink.png") ? 
                <Text style={{marginTop: "23%"}}>   라이트 {"\n"}   핑크</Text>
              : null}
              {this.state.imglocs2 == require("./../../../assets/images/masks/beige.png") ? 
                <Text style={{marginTop: "35%"}}>베이지</Text>
              : null}
              {this.state.imglocs2 == require("./../../../assets/images/masks/black.png") ? 
                <Text style={{marginTop: "35%"}}>블랙</Text>
              : null}
              {this.state.imglocs2 == require("./../../../assets/images/masks/khaki.png") ? 
                <Text style={{marginTop: "35%"}}>카키</Text>
              : null}
              {this.state.imglocs2 == require("./../../../assets/images/masks/white.png") ? 
                <Text style={{marginTop: "35%"}}>화이트</Text>
              : null}

            </View>

          </TouchableOpacity>


          <TouchableOpacity onPress={() => this.pressRight()}>
            <View style={{marginTop: height*0.05 , height: width*0.2, width: width*0.1, justifyContent: "center"  }}>
              <Image resizeMode="contain" style={{marginLeft: "25%"}} source={require(`./../../../assets/images/right_arrow_ar.png`)} />
            </View>
          </TouchableOpacity>

        </View>

        {this.state.MaskColorClicked == true ?
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
        :null}





      </>
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
    marginBottom: "-15.5%"
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
    borderRadius: 10,
    //height: 50,
    //width: 80,
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
    color: "white",
    fontWeight: "bold"
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






