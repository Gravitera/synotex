import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  processColor,
  ImageBackground
} from 'react-native';
import theme from '../../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomBackButtonHeader, CustomDrawerButtonHeader, CustomBackForwardButtonHeader2 } from '../../../components/Header';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Table, Row, Rows } from 'react-native-table-component';
import * as Animatable from 'react-native-animatable';
import { RadarChart } from 'react-native-charts-wrapper';
import { useState } from 'react';
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Platform } from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Sound = require('react-native-sound');

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;
const ratio = (width - 40) / 576;
const tableHead = ['', '평균사이즈', '실측사이즈', '추천사이즈'];
var tableData = [
  ['얼굴길이(mm)', '10mm', '10mm', '소형(S)'],
  ['얼굴넓이(mm)', '40mm', '40mm', '소형(S)']
]

const tableHead2 = ['', '얼굴넓이', '얼굴길이', '턱밑넓이', '머리둘레', '사이즈'];
var tableData2 = [
  ['평균', '10mm', '10mm', '10mm', '10mm', '소형(XS)'],
  ['당신', '10mm', '10mm', '10mm', '10mm', '소형(XS)'],
  ['%', '10mm', '10mm', '10mm', '10mm', '소형(XS)'],
]


/*
var whitemasktext = '';
var blackmasktext = '';
var overallsize = '';
*/

const AI_large = new Sound('largesize.mp3', Sound.MAIN_BUNDLE);
const AI_medium = new Sound('mediumsize.mp3', Sound.MAIN_BUNDLE);
const AI_small = new Sound('smallsize.mp3', Sound.MAIN_BUNDLE);
const AI_smallsmall = new Sound('smallsmallsize.mp3', Sound.MAIN_BUNDLE);
const AI_kids = new Sound('kidssize.mp3', Sound.MAIN_BUNDLE);
const feedbackvoice = new Sound("feedbackvoice.mp3", Sound.MAIN_BUNDLE);

const nonesizesmall = new Sound("nonesizesmall.mp3", Sound.MAIN_BUNDLE);
const nonesizemedium = new Sound("nonesizemedium.mp3", Sound.MAIN_BUNDLE);
const nonesizelarge = new Sound("nonesizelarge.mp3", Sound.MAIN_BUNDLE);

const unrecognized = new Sound('unrecognized.mp3', Sound.MAIN_BUNDLE);

const RecommendationView = (props) => {

  const [feedbacksent, setfeedbacksent] = useState(0);

  var [baserecommendationtext, setbaseRecommendationtext] = useState([]);
  var [Nrecommendationtext, setNRecommendationtext] = useState([]);
  var [NNetworkrecommendationtext, setNNetworkRecommendationtext] = useState([]);
  var [Unrecognizedrecommendationtext, setUnrecognizedRecommendationtext] = useState([]);
  var [recommtext, setRecommtext] = useState({});

  useEffect(() => {
        fetch("https://synotexmasks.s3.ap-northeast-2.amazonaws.com/recommendationtext/recommendationtext.json"  + '?time=' + Date.now().toString().substring(0,10) + "000",{
          mode: 'no-cors',
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*"
          },})
          .then((res) => res.json())
          .then((resdata) => {
              console.log('recommendationtext RESPONSE SUCCESS =>', resdata);
              console.log('recommendationtext RESPONSE SUCCESS =>', resdata);
              setRecommtext(resdata);
              setbaseRecommendationtext(resdata.base);
              setNRecommendationtext(resdata.N);
              setNNetworkRecommendationtext(resdata.NNetwork);
              setUnrecognizedRecommendationtext(resdata.Unrecognized);
              /*
              console.log( " =============   baserecommendationtext     ", baserecommendationtext);
              console.log( " =============   Nrecommendationtext     ", Nrecommendationtext);
              console.log( " =============   NNetworkrecommendationtext     ", NNetworkrecommendationtext);
              console.log( " =============   Unrecognizedrecommendationtext     ", Unrecognizedrecommendationtext);
              */
        })
  }, []);


  const storeData = useSelector((store) => store);
/*
  var maskImage = "M";
  */
  //  console.log("reco props",props)
  const [data, setData] = useState({
    dataSets: [{
      values: [{ value: storeData.attendanceReducer.res.Pentagram.FaceHeight }, { value: storeData.attendanceReducer.res.Pentagram.HeadHeight }, { value: storeData.attendanceReducer.res.Pentagram.HeadWidth }, { value: storeData.attendanceReducer.res.Pentagram.ChinWidth }, { value: storeData.attendanceReducer.res.Pentagram.HeadRound }],
      label: 'DS 1',
      config: {
        color: processColor('#FF8C9D'),

        drawFilled: true,
        fillColor: processColor('#FF8C9D'),
        fillAlpha: 100,
        lineWidth: 2
      }
    },


    ],
  });
  const [legend, setLegend] = useState({
    enabled: false,
    textSize: 28,
    form: 'CIRCLE',
    wordWrapEnabled: true
  })
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [xAxis, setXAxis] = useState({
    valueFormatter: ['얼굴수직길이 (%)', '머리수직길이 (%)', '머리너비 (%)', '아래턱사이너비 (%)', '머리둘레 (%)']
  })



  const handleSelect = (event) => {
    let entry = event.nativeEvent
    if (entry == null) {
      setSelectedEntry(null)
    } else {
      setSelectedEntry(JSON.stringify(entry))
    }

    //console.log(event.nativeEvent)
  }

  let MaskSize_Korean = "키즈(XS)";
  let whitemasktext = "화이트키즈(XS)";
  let blackmasktext = "블랙키즈(XS)";
  let overallsize = "키즈(XS)";
  let maskImage = "XS";
  if (storeData.attendanceReducer.res.MaskSize.toLowerCase() == "s"){
    MaskSize_Korean = "소형(S)";
    whitemasktext = "화이트소형(S)";
    blackmasktext = "블랙소형(S)";
    overallsize = "소형(S)";
    maskImage = "S";
  }
  if (storeData.attendanceReducer.res.MaskSize.toLowerCase() == "ss"){
    MaskSize_Korean = "초등학생용(SS)";
    whitemasktext = "화이트초등학생용(SS)";
    blackmasktext = "블랙초등학생용(SS)";
    overallsize = "초등학생용(SS)";
    maskImage = "S";
  }
  if (storeData.attendanceReducer.res.MaskSize.toLowerCase() == "m"){
    MaskSize_Korean = "중형(M)";
    whitemasktext = "화이트중형(M)";
    blackmasktext = "블랙중형(M)";
    overallsize = "중형(M)";
    maskImage = "M";
  }
  if (storeData.attendanceReducer.res.MaskSize.toLowerCase() == "l"){
    MaskSize_Korean = "대형(L)";
    whitemasktext = "화이트대형(L)";
    blackmasktext = "블랙대형(L)";
    overallsize = "대형(L)";
    maskImage = "L";
  }
  if (storeData.attendanceReducer.res.MaskSize == "NS"){
    MaskSize_Korean = "소형(S)";
    whitemasktext = "화이트소형(S)";
    blackmasktext = "블랙소형(S)";
    overallsize = "소형(S)";
    maskImage = "S";
  }
  if (storeData.attendanceReducer.res.MaskSize == "NM"){
    MaskSize_Korean = "중형(M)";
    whitemasktext = "화이트중형(M)";
    blackmasktext = "블랙중형(M)";
    overallsize = "중형(M)";
    maskImage = "M";
  }
  if (storeData.attendanceReducer.res.MaskSize == "NL"){
    MaskSize_Korean = "대형(L)";
    whitemasktext = "화이트대형(L)";
    blackmasktext = "블랙대형(L)";
    overallsize = "대형(L)";
    maskImage = "L";
  }
  if (storeData.attendanceReducer.res.MaskSize == "N"){
    MaskSize_Korean = "재측청";
    whitemasktext = "화이트";
    blackmasktext = "블랙";
    overallsize = "";
    maskImage = "L";
  }



  var maskidx = [0,1,2,3,4,5,6,7,8]
  // 총 9 색상의 마스크를 리스트로 정리 

  var maskcolorlist = ["white", "black", "beige", "lightpink", "darkpink", "lightgrey", "darkgrey", "khaki"]

  // 총 9지 색상의 마스크가 있는 RN 베이스 경로
  var maskloc = "./../../../assets/images/masks/"

  // 현재 보여지고 있는 왼쪽, 오른쪽 마스크의 인덱스 (예: [3,4], [6,7])
  //var currmaskidx = [0,1]

  // 현재 보여지고 있는 왼쪽, 오른쪽 마스크중 왼쪽의 이미지 소스
  var imglocs = require("./../../../assets/images/masks/white.png")
  // 현재 보여지고 있는 왼쪽, 오른쪽 마스크중 오른쪽의 이미지 소스
  var imglocs2 = require("./../../../assets/images/masks/black.png")
  var imglocs3 = require("./../../../assets/images/masks/beige.png")

  var [currmaskidx, setcurrmaskidx] = useState(0)
  var [currmaskidx2, setcurrmaskidx2] = useState(1)
  var [currmaskidx3, setcurrmaskidx3] = useState(2)
  //
  //  밑에 왼쪽 화살표 눌렀을떄 반응
  //
  const pressLeft = () => {
    //
    //  왼쪽 화살표를 눌렀을떄 currmaskidx 를 왼쪽으로 옮겨줌 (예: [2,3] -> [1,2])
    //

    var temp = [currmaskidx, currmaskidx2, currmaskidx3];
    var temp2 = true;

    if (temp[0] == 0){
      
      //setcurrmaskidx([8,0,1]);
      setcurrmaskidx(7);
      setcurrmaskidx2(0);
      setcurrmaskidx3(1)
      temp2 = false;
    }
    if (temp[0] == 7 && temp[1] == 0){

      //setcurrmaskidx([7,8,0]);
      setcurrmaskidx(6);
      setcurrmaskidx2(7);
      setcurrmaskidx3(0)
      temp2 = false;
    }
    if (temp[0] == 6 && temp[1] == 7){

      //setcurrmaskidx([6,7,8]);
      setcurrmaskidx(5);
      setcurrmaskidx2(6);
      setcurrmaskidx3(7)
      temp2 = false;
    }

    if (temp2 == true){

      var newtemp = [currmaskidx-1, currmaskidx2-1, currmaskidx3-1];

      //setcurrmaskidx(newtemp);
      setcurrmaskidx(newtemp[0]);
      setcurrmaskidx2(newtemp[1]);
      setcurrmaskidx3(newtemp[2])
    }

    console.log(" ======== new mask idx   ", currmaskidx, "   ", currmaskidx2, "   ", currmaskidx3);

  }

  //
  //  밑에 오른쪽 화살표 눌렀을떄 반응
  //
  const pressRight = () => {
    //
    //  오른쪽 화살표를 눌렀을떄 currmaskidx 를 오른쪽으로 옮겨줌 (예: [2,3] -> [3,4])
    //

    var temp = [currmaskidx, currmaskidx2, currmaskidx3];
    var temp2 = true;

    if (temp[2] == 7){
      
      //setcurrmaskidx([7,8,0]);
      setcurrmaskidx(6);
      setcurrmaskidx2(7);
      setcurrmaskidx3(0)
      temp2 = false;
    }
    if (temp[2] == 0 && temp[1] == 7){

      //setcurrmaskidx([8,0,1]);
      setcurrmaskidx(7);
      setcurrmaskidx2(0);
      setcurrmaskidx3(1)
      temp2 = false;
    }
    if (temp[2] == 1 && temp[1] == 0){

      //setcurrmaskidx([0,1,2]);
      setcurrmaskidx(0);
      setcurrmaskidx2(1);
      setcurrmaskidx3(2)
      temp2 = false;
    }

    if (temp2 == true){

      var newtemp = [currmaskidx+1, currmaskidx2+1, currmaskidx3+1];

      setcurrmaskidx(newtemp[0]);
      setcurrmaskidx2(newtemp[1]);
      setcurrmaskidx3(newtemp[2]);
    }

  }




  let FaceHeightPercent_str = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceHeightPercent))) + "mm";
  let FaceHeight_str = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceHeight))) + "mm";
  let FaceWidthPercent_str = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceWidthPercent)-60)) + "mm";
  let FaceWidth_str = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceWidth))) + "mm";
  let ChinWidthAverage_str = String(parseInt(parseFloat(storeData.attendanceReducer.res.PentagramAverage.ChinWidth))) + "mm";
  let HeadRoundAverage_str = String(parseInt(parseFloat(storeData.attendanceReducer.res.PentagramAverage.HeadRound))) + "mm";
  let ChinWidthPredicted_str = String(parseInt(parseFloat(storeData.attendanceReducer.res.PentagramPredicted.ChinWidth))) + "mm";
  let HeadRoundPredicted_str = String(parseInt(parseFloat(storeData.attendanceReducer.res.PentagramPredicted.HeadRound))) + "mm";
  let FaceWidth_pst = String(Math.trunc(parseFloat(storeData.attendanceReducer.res.FaceWidth)/(parseFloat(storeData.attendanceReducer.res.FaceWidthPercent)-60)*100*100)/100)+"%";
  let FaceHeight_pst = String(storeData.attendanceReducer.res.Pentagram.FaceHeight)+"%";
  let ChinWidth_pst = String(storeData.attendanceReducer.res.Pentagram.ChinWidth)+"%";
  let HeadRound_pst = String(storeData.attendanceReducer.res.Pentagram.HeadRound)+"%";
  tableData = [
    ['얼굴길이(mm)', FaceHeightPercent_str, FaceHeight_str, MaskSize_Korean],
    ['얼굴넓이(mm)', FaceWidthPercent_str, FaceWidth_str, MaskSize_Korean]
  ];

  tableData2 = [
    ['평균', FaceWidthPercent_str,FaceHeightPercent_str, ChinWidthAverage_str, HeadRoundAverage_str, MaskSize_Korean],
    ['당신', FaceWidth_str, FaceHeight_str, ChinWidthPredicted_str, HeadRoundPredicted_str, MaskSize_Korean],
    ['%', FaceWidth_pst, FaceHeight_pst, ChinWidth_pst, HeadRound_pst, MaskSize_Korean],
  ]

  const sendFeedbackXS = () => {
    const data = {
      ID: storeData.attendanceReducer.res.ID,  // storeData.attendanceReducer.res.ID
      MaskSize: "XS"
    };
    setfeedbacksent(1);
    props.sendFeedback(data);
    
  }

  const sendFeedbackSS = () => {
    const data = {
      ID: storeData.attendanceReducer.res.ID,  // storeData.attendanceReducer.res.ID
      MaskSize: "SS"
    };
    setfeedbacksent(1);
    props.sendFeedback(data);
    
  }

  const sendFeedbackS = () => {

    const data = {
      ID: storeData.attendanceReducer.res.ID,  // storeData.attendanceReducer.res.ID
      MaskSize: "S"
    };
    setfeedbacksent(1);
    props.sendFeedback(data);
    
  }

  const sendFeedbackM = async() => {
    console.log(" ========== feedback pressed ")
    const data = {
      ID: storeData.attendanceReducer.res.ID,  // storeData.attendanceReducer.res.ID
      MaskSize: "M"
    };
    setfeedbacksent(1);
    props.sendFeedback(data);
    
  }

  const sendFeedbackL = () => {
    const data = {
      ID: storeData.attendanceReducer.res.ID,  // storeData.attendanceReducer.res.ID
      MaskSize: "L"
    };
    setfeedbacksent(1);
    props.sendFeedback(data);
  }


  //console.log(" =================================== MaskSize in Recomm =============== ", storeData.attendanceReducer.res.MaskSize);

  if (storeData.attendanceReducer.res.MaskSize == "XS" && feedbacksent == 0){
    AI_kids.play((success) => {
      console.log("success");
    });

}

if (storeData.attendanceReducer.res.MaskSize == "S" && feedbacksent == 0){

    AI_small.play((success) => {
      console.log("success");
    });

}
if (storeData.attendanceReducer.res.MaskSize == "SS" && feedbacksent == 0){

  AI_smallsmall.play((success) => {
    console.log("success");
  });

}

if (storeData.attendanceReducer.res.MaskSize == "M" && feedbacksent == 0 && storeData.attendanceReducer.res.ID != "Unrecognized" && storeData.attendanceReducer.res.ID != "NNetwork"){

    AI_medium.play((success) => {
      console.log("success");
    });

}

if (storeData.attendanceReducer.res.MaskSize == "L" && feedbacksent == 0){

    AI_large.play((success) => {
      console.log("success");
    });

}

if (storeData.attendanceReducer.res.MaskSize == "NS" && feedbacksent == 0){

  nonesizesmall.play((success) => {
    console.log("success");
  });

}

if (storeData.attendanceReducer.res.MaskSize == "NM" && feedbacksent == 0){

  nonesizemedium.play((success) => {
    console.log("success");
  });

}

if (storeData.attendanceReducer.res.MaskSize == "NL" && feedbacksent == 0){

  nonesizelarge.play((success) => {
    console.log("success");
  });

}


if (storeData.attendanceReducer.res.MaskSize == "N" && feedbacksent == 0 && storeData.attendanceReducer.res.ID == "NNetwork"){

}

if (storeData.attendanceReducer.res.MaskSize == "N" && feedbacksent == 0 && storeData.attendanceReducer.res.ID == "Unrecognized"){

  unrecognized.play((success) => {
    console.log("success");
  });

}


if (feedbacksent == 1){
  feedbackvoice.play((success) => {
    console.log("success");
  })
}

  var display2 = [1,2,3]


  if (Object.keys(recommtext).length != 0){
    var display = recommtext.base;
    if (storeData.attendanceReducer.res.MaskSize == "NS" || storeData.attendanceReducer.res.MaskSize == "NM" || storeData.attendanceReducer.res.MaskSize == "NL"){
        console.log(" ========== reducer MaskSize is NS or NM or NL type   ");  
        display = [];
    }
    else if (storeData.attendanceReducer.res.MaskSize == "N" && storeData.attendanceReducer.res.ID != "NNetwork" && storeData.attendanceReducer.res.ID != "Unrecognized"){
        console.log(" ========== reducer MaskSize is pure N   ");  
        display = recommtext.N;
    }
    else if (storeData.attendanceReducer.res.ID == "NNetwork"){
      console.log(" ========== reducer ID is NNetwork  ");  
        display = recommtext.NNetwork;
    }
    else if (storeData.attendanceReducer.res.ID == "Unrecognized"){
       
      display = recommtext.Unrecognized;
      console.log(" ========== reducer ID is Unrecognized  ", display); 
    }

    console.log( " ================================================================= ");
    console.log( " =============   recommtext     ", recommtext);
    console.log( " =============   storeData.attendanceReducer.res.MaskSize     ", storeData.attendanceReducer.res.MaskSize);
    console.log( " =============   storeData.attendanceReducer.res.ID     ", storeData.attendanceReducer.res.ID);
    console.log( " =============   baserecommendationtext     ", baserecommendationtext);
    console.log( " =============   Nrecommendationtext     ", Nrecommendationtext);
    console.log( " =============   NNetworkrecommendationtext     ", NNetworkrecommendationtext);
    console.log( " =============   Unrecognizedrecommendationtext     ", Unrecognizedrecommendationtext);
    console.log( " ================================================================= ");
      
    return (
      <>


        <View style={styles.container}>
          {/* <CustomBackButtonHeader backFunction={() => props.navigation.navigate('input')} title={'측정결과'} /> */}
          {/*<CustomBackButtonHeader backFunction={() => props.navigation.dispatch(
            StackActions.pop(3)
          )} title={'측정결과'} />
          */}

          <CustomBackForwardButtonHeader2 title={"측정결과"} backFunction={() => props.navigation.dispatch(StackActions.pop(3))} forwardFunction={() => props.navigation.navigate('intro')} />
          <ScrollView style={styles.cardContainer}>


          <Animatable.View animation="slideInUp" direction="alternate">


              <View style={{justifyContent: 'center', flexDirection: "column"}}>

                <View style={{flexDirection: "column", alignItems:'center'}}>

                  {(storeData.attendanceReducer.res.MaskSize.toLowerCase() == "xs" || storeData.attendanceReducer.res.MaskSize.toLowerCase() == "ss" || storeData.attendanceReducer.res.MaskSize.toLowerCase() == "s" || storeData.attendanceReducer.res.MaskSize.toLowerCase() == "m") && storeData.attendanceReducer.res.ID != "Unrecognized" && storeData.attendanceReducer.res.ID != "NNetwork"?
                    <>
                        <Text style={{marginTop: hp("2%"), color: "black", fontWeight: "bold", marginBottom: hp("2%")}}>시노텍스앱에서 측정한</Text>
                        <Text style={{marginTop: -1*hp("1%"), color: "black", fontWeight: "bold", marginBottom: hp("2%")}}>당신의 추천 사이즈는 <Text style={{fontSize: width*0.04, color: "#0380D8", fontWeight: "bold"}}>{overallsize}</Text> 입니다.</Text>
                    </>

                  : null}
                  {storeData.attendanceReducer.res.MaskSize.toLowerCase() == "l"?
                    <>
                      <Text style={{marginTop: hp("2%"), color: "black", fontWeight: "bold", marginBottom: hp("2%")}}>시노텍스앱에서 측정한</Text>
                      <Text style={{marginTop: -1*hp("1%"), color: "black", fontWeight: "bold", marginBottom: hp("2%")}}>당신의 추천 사이즈는 <Text style={{fontSize: width*0.04, color: "#0380D8", fontWeight: "bold"}}>{overallsize}</Text> 입니다.</Text>
                    </>

                  : null}
                  {storeData.attendanceReducer.res.MaskSize == "NS"?
                      <>
                          <Text style={{marginTop: hp("2%"), color: "black", fontWeight: "bold", marginBottom: hp("2%")}}>얼굴이 작아 보이는 <Text style={{fontSize: width*0.04, color: "#0380D8", fontWeight: "bold"}}>"</Text><Text style={{fontSize: width*0.04, color: "#0380D8", fontWeight: "bold"}}>키즈(XS)</Text><Text style={{fontSize: width*0.04, color: "#0380D8", fontWeight: "bold"}}>"</Text> 사이즈를 추천드리며,</Text>
                          <Text style={{marginTop: hp("2%"), color: "black", fontWeight: "bold", marginBottom: hp("2%")}}>편한 호흡을 원하시면 <Text style={{fontSize: width*0.04, color: "#0380D8", fontWeight: "bold"}}>"</Text><Text style={{fontSize: width*0.04, color: "#0380D8", fontWeight: "bold"}}>소형(S)</Text><Text style={{fontSize: width*0.04, color: "#0380D8", fontWeight: "bold"}}>"</Text> 사이즈를 추천드립니다.</Text>
                      </>
                  : null}

                  {storeData.attendanceReducer.res.MaskSize == "NM"?
                      <>
                          <Text style={{marginTop: hp("2%"), color: "black", fontWeight: "bold", marginBottom: hp("2%")}}>얼굴이 작아 보이는 <Text style={{fontSize: width*0.04, color: "#0380D8", fontWeight: "bold"}}>"</Text><Text style={{fontSize: width*0.04, color: "#0380D8", fontWeight: "bold"}}>소형(S)</Text><Text style={{fontSize: width*0.04, color: "#0380D8", fontWeight: "bold"}}>"</Text> 사이즈를 추천드리며,</Text>
                          <Text style={{marginTop: hp("2%"), color: "black", fontWeight: "bold", marginBottom: hp("2%")}}>편한 호흡을 원하시면 <Text style={{fontSize: width*0.04, color: "#0380D8", fontWeight: "bold"}}>"</Text><Text style={{fontSize: width*0.04, color: "#0380D8", fontWeight: "bold"}}>중형(M)</Text><Text style={{fontSize: width*0.04, color: "#0380D8", fontWeight: "bold"}}>"</Text> 사이즈를 추천드립니다.</Text>
                      </>
                  :null}
                  {storeData.attendanceReducer.res.MaskSize == "NL"?
                      <>
                          <Text style={{marginTop: hp("2%"), color: "black", fontWeight: "bold", marginBottom: hp("2%")}}>얼굴이 작아 보이는 <Text style={{fontSize: width*0.04, color: "#0380D8", fontWeight: "bold"}}>"</Text><Text style={{fontSize: width*0.04, color: "#0380D8", fontWeight: "bold"}}>중형(M)</Text><Text style={{fontSize: width*0.04, color: "#0380D8", fontWeight: "bold"}}>"</Text> 사이즈를 추천드리며,</Text>
                          <Text style={{marginTop: hp("2%"), color: "black", fontWeight: "bold", marginBottom: hp("2%")}}>편한 호흡을 원하시면 <Text style={{fontSize: width*0.04, color: "#0380D8", fontWeight: "bold"}}>"</Text><Text style={{fontSize: width*0.04, color: "#0380D8", fontWeight: "bold"}}>대형(L)</Text><Text style={{fontSize: width*0.04, color: "#0380D8", fontWeight: "bold"}}>"</Text> 사이즈를 추천드립니다.</Text>
                      </>
                  :null}
                  {display.map((data, index) => 
                      <Text key={index} style={{marginTop: -1*hp("1%"),color: "black", fontWeight: "bold",marginBottom: hp("2.5%"), marginTop: hp("2%")}}>{data}</Text>
                  )}

                  <Text style={{marginTop: hp("1%"), marginBottom: hp("1%")}}>  </Text>
                  <Text style={{marginTop: hp("2%"), color: "#0380D8", marginBottom: hp("2%"), fontWeight: "bold"}}>※ 아래 원하는 색상을 선택한후 바로 구매를 해보세요!</Text>
                  <Text style={{marginTop: hp("0.5%"), marginBottom: hp("0.5%")}}>  </Text>

                </View>

              </View>
          </Animatable.View>

          <View style={{ width: wp("90%"), height: wp("20%"), flexDirection: "row", justifyContent: "space-between"}}>
            
            <TouchableOpacity onPress={() => pressLeft()}>
                  <View style={{ height: width*0.2, width: width*0.1, justifyContent: "center" }}>
                    <Image resizeMode="contain" style={{marginLeft: "25%", resizeMode:"contain", height: "40%"}} source={require(`./../../../assets/images/newdesign/left_arrow_ar.png`)} />
                  </View>
            </TouchableOpacity>


            {currmaskidx == 0 && currmaskidx2 == 1 && currmaskidx3 == 2 ?
            <View style={{flexDirection:"row", height: wp("20%"), width: wp("65%") , justifyContent: "space-between"}}>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12, fontWeight: "bold", textAlign:"center"}}>화이트</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/white.png")} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12, fontWeight: "bold", textAlign:"center"}}>블랙</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/black.png")} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12,  fontWeight: "bold", textAlign:"center"}}>베이지</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/beige.png")} />
                </View>
              </TouchableOpacity>
            </View>
            :null}

            {currmaskidx == 1 && currmaskidx2 == 2 && currmaskidx3 == 3 ?
            <View style={{flexDirection:"row", height: wp("20%"), width: wp("65%") , justifyContent: "space-between"}}>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12, fontWeight: "bold", textAlign:"center"}}>블랙</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/black.png")} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12,  fontWeight: "bold", textAlign:"center"}}>베이지</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/beige.png")} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12,  fontWeight: "bold", textAlign:"center"}}>라-핑크</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/lightpink.png")} />
                </View>
              </TouchableOpacity>
            </View>
            :null}


            {currmaskidx == 2 && currmaskidx2 == 3 && currmaskidx3 == 4 ?
            <View style={{flexDirection:"row", height: wp("20%"), width: wp("65%") , justifyContent: "space-between"}}>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12, fontWeight: "bold", textAlign:"center"}}>베이지</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/beige.png")} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12, fontWeight: "bold", textAlign:"center"}}>라-핑크</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/lightpink.png")} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12,  fontWeight: "bold", textAlign:"center"}}>다크핑크</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/darkpink.png")} />
                </View>
              </TouchableOpacity>
            </View>
            :null}


            {currmaskidx == 3 && currmaskidx2 == 4 && currmaskidx3 == 5 ?
            <View style={{flexDirection:"row", height: wp("20%"), width: wp("65%") , justifyContent: "space-between"}}>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12, fontWeight: "bold", textAlign:"center"}}>라-핑크</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/lightpink.png")} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12,  fontWeight: "bold", textAlign:"center"}}>다크핑크</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/darkpink.png")} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12,  fontWeight: "bold", textAlign:"center"}}>라그레이</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/lightgrey.png")} />
                </View>
              </TouchableOpacity>
            </View>
            :null}

            {currmaskidx == 4 && currmaskidx2 == 5 && currmaskidx3 == 6 ?
            <View style={{flexDirection:"row", height: wp("20%"), width: wp("65%") , justifyContent: "space-between"}}>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12,  fontWeight: "bold", textAlign:"center"}}>다크핑크</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/darkpink.png")} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12, fontWeight: "bold", textAlign:"center"}}>라그레이</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/lightgrey.png")} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12,  fontWeight: "bold", textAlign:"center"}}>다그레이</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/darkgrey.png")} />
                </View>
              </TouchableOpacity>
            </View>
            :null}


            {currmaskidx == 5 && currmaskidx2 == 6 && currmaskidx3 == 7 ?
            <View style={{flexDirection:"row", height: wp("20%"), width: wp("65%") , justifyContent: "space-between"}}>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12, fontWeight: "bold", textAlign:"center"}}>라그레이</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/lightgrey.png")} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12, fontWeight: "bold", textAlign:"center"}}>다그레이</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/darkgrey.png")} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12,  fontWeight: "bold", textAlign:"center"}}>카키</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/khaki.png")} />
                </View>
              </TouchableOpacity>
            </View>
            :null}

            {currmaskidx == 6 && currmaskidx2 == 7 && currmaskidx3 == 0 ?
            <View style={{flexDirection:"row", height: wp("20%"), width: wp("65%") , justifyContent: "space-between"}}>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12,  fontWeight: "bold", textAlign:"center"}}>다그레이</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/darkgrey.png")} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12,  fontWeight: "bold", textAlign:"center"}}>카키</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/khaki.png")} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12, fontWeight: "bold", textAlign:"center"}}>화이트</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/white.png")} />
                </View>
              </TouchableOpacity>
            </View>
            :null}

            {currmaskidx == 7 && currmaskidx2 == 0 && currmaskidx3 == 1 ?
            <View style={{flexDirection:"row", height: wp("20%"), width: wp("65%") , justifyContent: "space-between"}}>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12, fontWeight: "bold", textAlign:"center"}}>카키</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/khaki.png")} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12,  fontWeight: "bold", textAlign:"center"}}>화이트</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/white.png")} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://synotexmall.com/product/%EC%8B%9C%EB%85%B8%ED%85%8D%EC%8A%A495eptfe-%EB%A7%88%EC%8A%A4%ED%81%AC-%EA%B3%A8%EB%9D%BC%EB%8B%B4%EA%B8%B01%EB%A7%A4/41/category/1/display/2/")}>
                <View style={{justifyContent: "center", width:wp("20%"), height: wp("20%"), backgroundColor: "#F2F4FA", borderRadius: 100, flexDirection: "column", shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <View style={{height: 7, width:"100%"}}></View>
                  <Text style={{fontSize: 12,  fontWeight: "bold", textAlign:"center"}}>블랙</Text>
                  <Image style={{width: wp("17.5%"),height: wp("17.5%"), marginLeft: 10}} resizeMode="contain" source={require("./../../../assets/images/masks/black.png")} />
                </View>
              </TouchableOpacity>
            </View>
            :null}







            <TouchableOpacity onPress={() => pressRight()}>
                  <View style={{height: wp("20%"), width: width*0.1, justifyContent: "center"  }}>
                    <Image resizeMode="contain" style={{height: "40%", resizeMode: "contain", marginLeft: "25%"}} source={require(`./../../../assets/images/newdesign/right_arrow_ar.png`)} />
                  </View>
            </TouchableOpacity>

          </View>



    

          {Platform.OS == 'android' ? 
            <Animatable.View animation="slideInUp" direction="alternate">
                <TouchableOpacity style={{backgroudColor: "purple", flexDirection:"row", alignItems:"center", justifyContent: "center", marginTop: height*0.05, width: wp("100%"), height: hp("10%")}} onPress={() => props.navigation.navigate('ArCamera',{MaskSize: storeData.attendanceReducer.res.MaskSize})} > 
                  
                    <Image resizeMode="contain" style={{resizeMode: "contain", width: "75%",height: "70%",alignItems:'center',justifyContent:'center', marginLeft: -1*width*0.08}}  source={require("./../../../assets/images/newdesign/recommendation_ar_button.png")} />
                </TouchableOpacity>

            </Animatable.View> 
          : 
          
          <Animatable.View animation="slideInUp" direction="alternate">
              <View style={{marginLeft: width*0.1}}>
                <TouchableOpacity style={{flexDirection:"row", alignItems:"space-between", marginTop: height*0.05, width:width*0.7}} onPress={() => props.navigation.navigate('ArCamera',{MaskSize: storeData.attendanceReducer.res.MaskSize})} > 
                  

                  <Image resizeMode="contain" style={{width:width*0.15,height:height*0.05,alignItems:'center',justifyContent:'center',  marginLeft: -1*width*0.13, marginTop: -1*height*0.06}}  source={require("./../../../assets/images/newdesign/recommendation_ar_button.png")} />
                </TouchableOpacity>

              </View>
            </Animatable.View> 
            
            }



            <Animatable.View animation="slideInUp" direction="alternate">
              <View style={styles.headerContainer}>

                {/*<Image style={{ marginRight: 10 }} resizeMode="contain" source={require(`./../../../assets/images/user.png`)} />*/}
                <Text style={styles.header}>측정결과에 따른 평균 얼굴규격을 확인해보세요</Text>
                
              </View>
            </Animatable.View>

          
            
            <Animatable.View animation="slideInUp" direction="alternate">
              <Table borderStyle={{ borderWidth: 1, borderColor: '#dfdfdf', backgroundColor: theme.color.light, marginBottom: 24 }}>
                <Row data={tableHead2} style={styles.head} textStyle={styles.text} />
                <Rows data={tableData2} style={{ backgroundColor: theme.color.light }} textStyle={styles.text} />
              </Table>
            </Animatable.View>

          


            <Animatable.View animation="slideInUp" direction="alternate">

              {Platform.OS == 'android' ? 
                <View style={{ height: 300, backgroundColor: theme.color.light, marginVertical: 40, padding: 3, borderRadius: 10 }}>
                <RadarChart
                    style={styles.chart}
                    data={data}
                    xAxis={xAxis}
                    yAxis={{ drawLabels: true }}
                    chartDescription={{ text: '' }}
                    legend={legend}
                    drawWeb={true}
    
                    webLineWidth={2}
                    webLineWidthInner={2}
                    webAlpha={255}
                    webColor={processColor("grey")}
                    webColorInner={processColor("grey")}
    
                    skipWebLineCount={0}
                    onSelect={handleSelect}
                    onChange={(event) => console.log(event.nativeEvent)}
                  />
                </View>
                :
                
                <View style={{ height: 300, backgroundColor: theme.color.light, marginVertical: 40, padding: 3, borderRadius: 10 }}>
                <RadarChart
                    style={styles.chart}
                    data={data}
                    xAxis={xAxis}
                    yAxis={{ drawLabels: true }}
                    chartDescription={{ text: '' }}
                    legend={legend}
                    drawWeb={true}
    
                    webLineWidth={2}
                    webLineWidthInner={2}
                    webAlpha={255}
                    webColor={processColor("grey")}
                    webColorInner={processColor("grey")}
    
                    skipWebLineCount={0}
                    onSelect={handleSelect}
                    onChange={(event) => console.log(event.nativeEvent)}
                  />
                </View>
                }
              
            </Animatable.View>

            <View style={{marginTop: "15%"}}></View>

          </ScrollView>
        </View>


        <View style={{zIndex: 10, position: "absolute", bottom: 0, width: wp("100%"), height: hp("10%"), maxHeight: 80, backgroundColor: "#F2F4FA", flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity onPress={() => props.navigation.navigate('intro')} style={{width: wp("20%"), height: "100%", flexDirection: "column", justifyContent: "space-between", alignItems:"center"}}>
            <View style={{width: "100%", height: "10%"}}></View>
            <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_home_icon.png")} />
            <Image resizeMode="contain" style={{resizeMode: "contain", width: "45%", height: "20%"}}  source={require("./../../../assets/images/newdesign/bottomtab_home_text.png")} />
            <View style={{width: "100%", height: "10%"}}></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('Brandstory')} style={{width: wp("20%"), height: "100%", justifyContent: "space-between", alignItems:"center"}}>
            <View style={{width: "100%", height: "10%"}}></View>
            <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_brandstory_icon.png")} />
            <Image resizeMode="contain" style={{resizeMode: "contain", width: "80%", height: "25%"}}  source={require("./../../../assets/images/newdesign/bottomtab_brandstory_text.png")} />
            <View style={{width: "100%", height: "10%"}}></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('Store')} style={{width: wp("20%"), height: "100%", justifyContent: "space-between", alignItems:"center"}}>
            <View style={{width: "100%", height: "10%"}}></View>
            <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_store_icon.png")} />
            <Image resizeMode="contain" style={{resizeMode: "contain", width: "45%", height: "20%"}}  source={require("./../../../assets/images/newdesign/bottomtab_store_text.png")} />
            <View style={{width: "100%", height: "10%"}}></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('OfflineStore')} style={{width: wp("20%"), height: "100%", justifyContent: "space-between", alignItems:"center"}}>
            <View style={{width: "100%", height: "10%"}}></View>
            <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_offline_icon.png")} />
            <Image resizeMode="contain" style={{resizeMode: "contain", width: "80%", height: "20%"}}  source={require("./../../../assets/images/newdesign/bottomtab_offline_text.png")} />
            <View style={{width: "100%", height: "10%"}}></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {BackHandler.exitApp()}} style={{width: wp("20%"), height: "100%", justifyContent: "space-between", alignItems:"center"}}>
            <View style={{width: "100%", height: "10%"}}></View>
            <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_exit_icon.png")} />
            <Image resizeMode="contain" style={{resizeMode: "contain", width: "45%", height: "20%"}}  source={require("./../../../assets/images/newdesign/bottomtab_exit_text.png")} />
            <View style={{width: "100%", height: "10%"}}></View>
          </TouchableOpacity>
        </View>

      </>
    )
  }

  return null;

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  header: {
    marginTop: 10,
    color: "black",
    marginBottom: 30,
    fontWeight: "bold",
  },
  header2: {
    marginTop: 30,
    color: theme.color.light,
    marginBottom: 10,
  },
  header3: {
    marginTop: 30,
    color: theme.color.light,
    marginBottom: 10,
  },
  header4: {
    marginTop: 10,
    color: theme.color.light,
    marginBottom: 10,
  },
  gallery: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  galleryImage: {
    width: 47.75,
    height: 76,
    marginBottom: 60,
  },
  cardContainer: {
    marginTop: 68,
    paddingHorizontal: 20
  },
  heading: {
    fontFamily: theme.font.bold,
    fontSize: 16,
    marginBottom: 12
  },
  paragraph: {
    fontFamily: theme.font.regular,
    fontSize: 14,
  },
  method: {
    backgroundColor: 'red',
    marginBottom: 30
  },
  head: { height: 40, backgroundColor: '#F0F0F0' },
  text: { margin: 6, fontSize: 11, textAlign: 'center' },
  maskButton: {
    width: (width - 40) / 2 - 5,
    height: 80,
  },
  buttonCont: {
    backgroundColor: theme.color.light,
    borderRadius: 5,
    height: 80,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 2,
  },
  prodText: {
    fontSize: 12,
    height: 76,
    textAlignVertical: 'center',
    marginLeft: 8
  },
  chart: {
    flex: 1
  }
});

export default RecommendationView;