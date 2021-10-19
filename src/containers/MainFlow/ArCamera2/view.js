import * as React from 'react'
import { StyleSheet, View, Button, Platform, PermissionsAndroid, Dimensions, TouchableOpacity, Text, Image} from 'react-native'
import DeepARView from './../../../components/ArCameraUtil/DeepARView';
import { effectsData } from './../../../components/ArCameraUtil/effectsData2';
import {slideTransitionDefinition } from './../../../components/ArCameraUtil/simplenavigator/TransitionDefinitions';
import { CustomBackButtonHeader2, CustomDrawerButtonHeader } from '../../../components/Header';

import RNFetchBlob from "rn-fetch-blob";

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
      // 총 9 색상의 마스크를 리스트로 정리 
      maskcolor : ["grey", "darkgrey", "darkpink", 
      "lightgrey", "lightpink", "beige", "black", "khaki", "white"],

      // 총 9지 색상의 마스크가 있는 RN 베이스 경로
      maskloc : "./../../../assets/images/masks/",

      // 현재 보여지고 있는 왼쪽, 오른쪽 마스크의 인덱스 (예: [3,4], [6,7])
      currmaskidx : [0,1],

      // 현재 보여지고 있는 왼쪽, 오른쪽 마스크중 왼쪽의 이미지 소스
      imglocs: require("./../../../assets/images/masks/grey.png"),
      // 현재 보여지고 있는 왼쪽, 오른쪽 마스크중 오른쪽의 이미지 소스
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

  //
  //  밑에 왼쪽 화살표 눌렀을떄 반응
  //
  pressLeft(){
    //
    //  왼쪽 화살표를 눌렀을떄 currmaskidx 를 왼쪽으로 옮겨줌 (예: [2,3] -> [1,2])
    //
    var temp = this.state.currmaskidx;
    var temp2 = true;

    if (temp[0] == 0){

      this.setState({currmaskidx: [8,0]});
      this.setState({imglocs: require("./../../../assets/images/masks/white.png")});
      this.setState({imglocs2: require("./../../../assets/images/masks/grey.png")});
      temp2 = false;
    }
    if (temp[0] == 8 && temp[1] == 0){

      this.setState({currmaskidx: [7,8]});
      this.setState({imglocs: require("./../../../assets/images/masks/khaki.png")});
      this.setState({imglocs2: require("./../../../assets/images/masks/white.png")});
      temp2 = false;
    }
    if (temp2 == true){

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

  }

  //
  //  오른쪽 버튼 눌렀을떄의 반응
  //
  pressRight(){
    //
    //  오른쪽 화살표를 눌렀을떄 currmaskidx 를 오른쪽으로 옮겨줌 (예: [2,3] -> [3,4])
    //
    var temp = this.state.currmaskidx;
    var temp2 = true;
    //console.log(" ====== current mask idx pressed right  ")
    if (temp[1] == 8){

      this.setState({currmaskidx: [8,0]});
      this.setState({imglocs: require("./../../../assets/images/masks/white.png")});
      this.setState({imglocs2: require("./../../../assets/images/masks/grey.png")});
      temp2 = false;
    }
    if (temp[1] == 0 && temp[0] == 8){
 
      this.setState({currmaskidx: [1,2]});
      this.setState({imglocs: require("./../../../assets/images/masks/grey.png")});
      this.setState({imglocs2: require("./../../../assets/images/masks/darkgrey.png")});
      temp2 = false;
    }
    if (temp2 == true){

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

  }


  //
  //  왼쪽 화살표, 오른쪽 화살표 사이에 있는 마스크 이미지 두개중 왼쪽꺼 클릭시
  //
  leftmaskclicked(){
    //
    //  왼쪽, 오른쪽 마스크 있을떄 왼쪽 마스크를 눌렀을떄 this.state.MaskColor 를 바꿔줌
    //

    /*    
    const {fs, fetch, wrap} = RNFetchBlob;
    console.log(" ======== root directory   ", fs.dirs.DocumentDir);

    RNFetchBlob
    .config({
      path: fs.dirs.DocumentDir
    })
    .fetch("GET", "https://synotexmasks.s3.ap-northeast-2.amazonaws.com/maskeffects/beige/beige_3xs")
    .then((res) => {
      console.log(" ====== the file saved to  ", res.path());
    }).catch((error) => {
      console.log(error);
    })
    */

    //fetch("GET", "https://synotexmasks.s3.ap-northeast-2.amazonaws.com/maskeffects/beige/beige_3xs")



    if (this.state.imglocs == require("./../../../assets/images/masks/grey.png")){
      this.setState({MaskColor: "grey"}, () => console.log(this.state.MaskColor));
    }
    if (this.state.imglocs == require("./../../../assets/images/masks/darkgrey.png")){
      this.setState({MaskColor: "darkgrey"}, () => console.log(this.state.MaskColor));
    }
    if (this.state.imglocs == require("./../../../assets/images/masks/darkpink.png")){
      this.setState({MaskColor: "darkpink"}, () => console.log(this.state.MaskColor));
    }
    if (this.state.imglocs == require("./../../../assets/images/masks/lightgrey.png")){
      this.setState({MaskColor: "lightgrey"}, () => console.log(this.state.MaskColor));
    }
    if (this.state.imglocs == require("./../../../assets/images/masks/lightpink.png")){
      this.setState({MaskColor: "lightpink"}, () => console.log(this.state.MaskColor));
    }
    if (this.state.imglocs == require("./../../../assets/images/masks/beige.png")){
      this.setState({MaskColor: "beige"}, () => console.log(this.state.MaskColor));
    }
    if (this.state.imglocs == require("./../../../assets/images/masks/black.png")){
      this.setState({MaskColor: "black"}, () => console.log(this.state.MaskColor));
    }
    if (this.state.imglocs == require("./../../../assets/images/masks/khaki.png")){
      this.setState({MaskColor: "khaki"}, () => console.log(this.state.MaskColor));
    }
    if (this.state.imglocs == require("./../../../assets/images/masks/white.png")){
      this.setState({MaskColor: "white"}, () => console.log(this.state.MaskColor));
    }
    this.setState({MaskColorClicked: true});
  }      


  //
  //  왼쪽 화살표, 오른쪽 화살표 사이에 있는 마스크 이미지 두개중 오른쪽꺼 클릭시
  //
  rightmaskclicked(){

    //
    //  왼쪽, 오른쪽 마스크 있을떄 오른쪽 마스크를 눌렀을떄 this.state.MaskColor 를 바꿔줌
    //

    if (this.state.imglocs2 == require("./../../../assets/images/masks/grey.png")){
      this.setState({MaskColor: "grey"}, () => console.log(this.state.MaskColor));
    }
    if (this.state.imglocs2 == require("./../../../assets/images/masks/darkgrey.png")){
      this.setState({MaskColor: "darkgrey"}, () => console.log(this.state.MaskColor));
    }
    if (this.state.imglocs2 == require("./../../../assets/images/masks/darkpink.png")){
      this.setState({MaskColor: "darkpink"}, () => console.log(this.state.MaskColor));
    }
    if (this.state.imglocs2 == require("./../../../assets/images/masks/lightgrey.png")){
      this.setState({MaskColor: "lightgrey"}, () => console.log(this.state.MaskColor));
    }
    if (this.state.imglocs2 == require("./../../../assets/images/masks/lightpink.png")){
      this.setState({MaskColor: "lightpink"}, () => console.log(this.state.MaskColor));
    }
    if (this.state.imglocs2 == require("./../../../assets/images/masks/beige.png")){
      this.setState({MaskColor: "beige"}, () => console.log(this.state.MaskColor));
    }
    if (this.state.imglocs2 == require("./../../../assets/images/masks/black.png")){
      this.setState({MaskColor: "black"}, () => console.log(this.state.MaskColor));
    }
    if (this.state.imglocs2 == require("./../../../assets/images/masks/khaki.png")){
      this.setState({MaskColor: "khaki"}, () => console.log(this.state.MaskColor));
    }
    if (this.state.imglocs2 == require("./../../../assets/images/masks/white.png")){
      this.setState({MaskColor: "white"}, () => console.log(this.state.MaskColor));
    }

    this.setState({MaskColorClicked: true});

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

 

  XSclicked = () => {

    //
    //  밑에 사이즈 클릭시 MaskSize 를 바꿔줌
    //

    this.setState({MaskSize: "XS"}, () => console.log(this.state.MaskSize));
    
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

    //
    //  밑에 사이즈 클릭시 MaskSize 를 바꿔줌
    //

    this.setState({MaskSize: "SS"}, () => console.log(this.state.MaskSize));
    
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

    //
    //  밑에 사이즈 클릭시 MaskSize 를 바꿔줌
    //

    this.setState({MaskSize: "S"}, () => console.log(this.state.MaskSize));

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

    //
    //  밑에 사이즈 클릭시 MaskSize 를 바꿔줌
    //

    this.setState({MaskSize: "M"}, () => console.log(this.state.MaskSize));

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

    //
    //  밑에 사이즈 클릭시 MaskSize 를 바꿔줌
    //

    this.setState({MaskSize: "L"}, () => console.log(this.state.MaskSize));

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

          <TouchableOpacity onPress={() => this.leftmaskclicked()}>
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

          <TouchableOpacity onPress={() => this.rightmaskclicked()}>
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






