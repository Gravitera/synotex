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


  const storeData = useSelector((store) => store);
/*
  var maskImage = "M";
  */
    console.log("reco props",props)
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

    console.log(event.nativeEvent)
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


  console.log(" =================================== MaskSize in Recomm =============== ", storeData.attendanceReducer.res.MaskSize);

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
            <View style={styles.headerContainer, {flexDirection: "column"}}>

              {/*<Image style={{ marginRight: 10 }} resizeMode="contain" source={require(`./../../../assets/images/user.png`)} />*/}

    
                {(storeData.attendanceReducer.res.MaskSize.toLowerCase() == "xs" || storeData.attendanceReducer.res.MaskSize.toLowerCase() == "ss" || storeData.attendanceReducer.res.MaskSize.toLowerCase() == "s" || storeData.attendanceReducer.res.MaskSize.toLowerCase() == "m") && storeData.attendanceReducer.res.ID != "Unrecognized" && storeData.attendanceReducer.res.ID != "NNetwork"?
                  <View style={{flexDirection: "column", alignItems:'center'}}>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>시노텍스앱에서 측정한</Text>
                    <Text style={{marginTop: -1*height*0.01, color: theme.color.light, marginBottom: height*0.02}}>당신의 추천 사이즈는 <Text style={{fontSize: width*0.04, color: "yellow"}}>{overallsize}</Text> 입니다.</Text>
                  
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025, marginTop: height*0.02}}>소중한 피부 보호를 위해서 자외선 차단 기능이 있는</Text>
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025 }}>그레이, 블랙 색상의 마스크를 추천 드립니다.</Text>


                    {/*
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025, marginTop: height*0.02}}>날씨가 더워지고 있습니다.</Text>
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025 }}>사이즈를 약간 낙낙하게</Text>
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025 }}>착용하시면 최고의 편안함을 드립니다.</Text>
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025, marginTop: height*0.02}}>여름철에는 자외선 차단 기능이 있는</Text>
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025 }}>UV 화이트콜라보, 블랙, 그레이 마스크를 추천 드립니다.</Text>*/}


                  </View>
                  :
                  null}

                {storeData.attendanceReducer.res.MaskSize.toLowerCase() == "l"?
                  <View style={{flexDirection: "column", alignItems:'center'}}>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>시노텍스앱에서 측정한</Text>
                    <Text style={{marginTop: -1*height*0.01, color: theme.color.light, marginBottom: height*0.02}}>당신의 추천 사이즈는 <Text style={{fontSize: width*0.04, color: "yellow"}}>{overallsize}</Text> 입니다.</Text>
                    
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025, marginTop: height*0.02}}>소중한 피부 보호를 위해서 자외선 차단 기능이 있는</Text>
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025 }}>그레이, 블랙 색상의 마스크를 추천 드립니다.</Text>
                    
                    {/*<Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025, marginTop: height*0.02 }}>여름철에는 자외선 차단 기능이 있는</Text>
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025 }}>UV 화이트콜라보, 블랙, 그레이 마스크를 추천 드립니다.</Text>*/}
                  
                  
                  </View>
                  :
                  null}

                  {storeData.attendanceReducer.res.MaskSize == "NS"?
                  <View style={{flexDirection: "column", alignItems:'center'}}>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>얼굴이 작아 보이는 <Text style={{fontSize: width*0.04, color: "yellow"}}>"</Text><Text style={{fontSize: width*0.04, color: "yellow"}}>키즈(XS)</Text><Text style={{fontSize: width*0.04, color: "yellow"}}>"</Text> 사이즈를 추천드리며,</Text>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>편한 호흡을 원하시면 <Text style={{fontSize: width*0.04, color: "yellow"}}>"</Text><Text style={{fontSize: width*0.04, color: "yellow"}}>소형(S)</Text><Text style={{fontSize: width*0.04, color: "yellow"}}>"</Text> 사이즈를 추천드립니다.</Text>
                    
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025, marginTop: height*0.02}}>소중한 피부 보호를 위해서 자외선 차단 기능이 있는</Text>
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025 }}>그레이, 블랙 색상의 마스크를 추천 드립니다.</Text>
                    {/*<Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025 , marginTop: height*0.02}}>여름철에는 자외선 차단 기능이 있는</Text>
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025 }}>UV 화이트콜라보, 블랙, 그레이 색상 마스크도 좋습니다.</Text>*/}
                  
                  </View>
                  :
                  null} 
                  {storeData.attendanceReducer.res.MaskSize == "NM"?
                  <View style={{flexDirection: "column", alignItems:'center'}}>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>얼굴이 작아 보이는 <Text style={{fontSize: width*0.04, color: "yellow"}}>"</Text><Text style={{fontSize: width*0.04, color: "yellow"}}>소형(S)</Text><Text style={{fontSize: width*0.04, color: "yellow"}}>"</Text> 사이즈를 추천드리며,</Text>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>편한 호흡을 원하시면 <Text style={{fontSize: width*0.04, color: "yellow"}}>"</Text><Text style={{fontSize: width*0.04, color: "yellow"}}>중형(M)</Text><Text style={{fontSize: width*0.04, color: "yellow"}}>"</Text> 사이즈를 추천드립니다.</Text>
                    
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025, marginTop: height*0.02}}>소중한 피부 보호를 위해서 자외선 차단 기능이 있는</Text>
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025 }}>그레이, 블랙 색상의 마스크를 추천 드립니다.</Text>


                    {/*<Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025 , marginTop: height*0.02}}>여름철에는 자외선 차단 기능이 있는</Text>
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025 }}>UV 화이트콜라보, 블랙, 그레이 색상 마스크도 좋습니다.</Text>*/}
                  
                  </View>
                  :
                  null} 
                  {storeData.attendanceReducer.res.MaskSize == "NL"?
                  <View style={{flexDirection: "column", alignItems:'center'}}>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>얼굴이 작아 보이는 <Text style={{fontSize: width*0.04, color: "yellow"}}>"</Text><Text style={{fontSize: width*0.04, color: "yellow"}}>중형(M)</Text><Text style={{fontSize: width*0.04, color: "yellow"}}>"</Text> 사이즈를 추천드리며,</Text>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>편한 호흡을 원하시면 <Text style={{fontSize: width*0.04, color: "yellow"}}>"</Text><Text style={{fontSize: width*0.04, color: "yellow"}}>대형(L)</Text><Text style={{fontSize: width*0.04, color: "yellow"}}>"</Text> 사이즈를 추천드립니다.</Text>
                    
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025, marginTop: height*0.02}}>소중한 피부 보호를 위해서 자외선 차단 기능이 있는</Text>
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025 }}>그레이, 블랙 색상의 마스크를 추천 드립니다.</Text>

                    {/*<Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025 , marginTop: height*0.02}}>여름철에는 자외선 차단 기능이 있는</Text>
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025 }}>UV 화이트콜라보, 블랙, 그레이 색상 마스크도 좋습니다.</Text>*/}

                  </View>
                  :
                  null} 

                  {storeData.attendanceReducer.res.MaskSize == "N" && storeData.attendanceReducer.res.ID != "NNetwork" && storeData.attendanceReducer.res.ID != "Unrecognized"?
                  <View style={{flexDirection: "column", alignItems:'center'}}>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>정확한 측정을 위해 다시한번 시도해 주세요.</Text>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>팔을 쭉 뻗어서 가이드 라인에 얼굴을 맞춰 측정하시면</Text>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>정확한 측정결과를 확인 하실 수 있습니다.</Text>
                  </View>
                  :
                  null} 
                  {storeData.attendanceReducer.res.ID == "NNetwork"?
                  <View style={{flexDirection: "column", alignItems:'center'}}>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>인터넷 연결을 확인 해주세요.</Text>
                  </View>
                  :
                  null} 
                  {storeData.attendanceReducer.res.ID == "Unrecognized"?
                  <View style={{flexDirection: "column", alignItems:'center'}}>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>정확한 측정을 위해 다시한번 시도해 주세요.</Text>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>팔을 쭉 뻗어서 가이드 라인에 얼굴을 맞춰 측정하시면</Text>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>정확한 측정결과를 확인 하실 수 있습니다.</Text>
                  </View>
                  :
                  null} 



              <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.03, width:width*0.8, marginLeft: width*0.07}}>※ 아래 원하는 색상을 선택한후 바로 구매를 해보세요!</Text>


  
            </View>
        </Animatable.View>

        <View style={{flexDirection:"row", justifyContent: "space-between", marginLeft: width*0.03}}>
          <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/category/%ED%99%94%EC%9D%B4%ED%8A%B8%EB%A7%88%EC%8A%A4%ED%81%AC/30/")}>
            <Image style={{width: width*0.2,height: width*0.2,marginBottom: height*0.01}} resizeMode="contain" source={require(`./../../../assets/images/whitemaskicon.png`)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/category/%EA%B7%B8%EB%A0%88%EC%9D%B4%EB%A7%88%EC%8A%A4%ED%81%AC/49/")}>
            <Image style={{width: width*0.2,height: width*0.2,marginBottom: height*0.01}} resizeMode="contain" source={require(`./../../../assets/images/greymaskicon.png`)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/category/%EB%B8%94%EB%9E%99%EB%A7%88%EC%8A%A4%ED%81%AC/29/")}>
            <Image style={{width: width*0.2,height: width*0.2,marginBottom: height*0.01}} resizeMode="contain" source={require(`./../../../assets/images/blackmaskicon.png`)} />
          </TouchableOpacity>

          {/*<TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/product/eptfe-%ED%95%84%ED%84%B0-%EB%A7%88%EC%8A%A4%ED%81%AC-%ED%99%94%EC%9D%B4%ED%8A%B8%EC%BD%9C%EB%9D%BC%EB%B3%B4-50%EB%A7%A4/51/category/30/display/1/")}>
            <Image style={{width: width*0.2,height: width*0.2,marginBottom: height*0.01, marginTop: -1*height*0}} resizeMode="contain" source={require(`./../../../assets/images/whitecollabmaskicon.png`)} />
          </TouchableOpacity>*/}
        </View>
  

        {Platform.OS == 'android' ? 
          <Animatable.View animation="slideInUp" direction="alternate">
            <View style={{marginLeft: width*0.1}}>
              <TouchableOpacity style={{flexDirection:"row", alignItems:"space-between", marginTop: height*0.05, width:width*0.7}} onPress={() => props.navigation.navigate('ArCamera',{MaskSize: storeData.attendanceReducer.res.MaskSize})} > 
                

                <ImageBackground resizeMode="contain" style={{width:width*0.7,height:height*0.05,alignItems:'center',justifyContent:'center'}}  source={require("./../../../assets/images/intro_white_button_recommendation.png")} >
                  <Text style={{color:'#214A84'}}>
                    시노텍스 마스크 가상착용
                  </Text>
                </ImageBackground>

                <Image resizeMode="contain" style={{width:width*0.15,height:height*0.05,alignItems:'center',justifyContent:'center',  marginLeft: -1*width*0.13, marginTop: -1*height*0.06}}  source={require("./../../../assets/images/goicon.png")} />

              </TouchableOpacity>

            </View>
          </Animatable.View> 
        : null}



          <Animatable.View animation="slideInUp" direction="alternate">
            <View style={styles.headerContainer}>

              {/*<Image style={{ marginRight: 10 }} resizeMode="contain" source={require(`./../../../assets/images/user.png`)} />*/}
              <Text style={styles.header}>측정결과에 따른 평균 얼굴규격을 확인해보세요</Text>
              
            </View>
          </Animatable.View>

          
          {/*<Animatable.View animation="slideInUp" direction="alternate">
            <Table borderStyle={{ borderWidth: 1, borderColor: '#dfdfdf', backgroundColor: theme.color.light, marginBottom: 24 }}>
              <Row data={tableHead} style={styles.head} textStyle={styles.text} />
              <Rows data={tableData} style={{ backgroundColor: theme.color.light }} textStyle={styles.text} />
            </Table>
          </Animatable.View>*/}

          {/*<Animatable.View animation="slideInUp" direction="alternate">
            <View style={styles.headerContainer}>
              <Text style={styles.header4}>  </Text>
              
            </View>
          </Animatable.View>*/}
          
          <Animatable.View animation="slideInUp" direction="alternate">
            <Table borderStyle={{ borderWidth: 1, borderColor: '#dfdfdf', backgroundColor: theme.color.light, marginBottom: 24 }}>
              <Row data={tableHead2} style={styles.head} textStyle={styles.text} />
              <Rows data={tableData2} style={{ backgroundColor: theme.color.light }} textStyle={styles.text} />
            </Table>
          </Animatable.View>

        


          <Animatable.View animation="slideInUp" direction="alternate">
            {/* <View style={{ height: 80 }}>
              <Text> selected entry</Text>
              <Text> {selectedEntry}</Text>
            </View> */}
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
               : null}
            
          </Animatable.View>

          {feedbacksent == 0 && storeData.attendanceReducer.res.MaskSize != "N"?
          <Animatable.View animation="slideInUp" direction="alternate">

          <View style={{marginTop:"-5%"}}>


          <View style={styles.headerContainer}>
          <Text style={styles.header3}>착용 사이즈가 다를경우 아래 중 하나을 선택해주세요</Text>
          </View>


            <View style={styles.gallery} >
                <TouchableOpacity onPress={sendFeedbackXS} style={{marginTop:"0%"}}>
                {/*<ImageBackground style={{width:60,height:34,alignItems:'center',justifyContent:'center'}}  source={require("./../../../assets/images/intro_white_button.png")} >*/}
                
                <View style={{backgroundColor:"white", height:"40%", width: "85%", justifyContent: "center", borderRadius:10}}>
                <Text style={{color:'#214A84', fontSize:17, marginLeft: "9%"}}>
                  XS (키즈)
                </Text>
                </View>

              {/*</ImageBackground>*/}
                </TouchableOpacity>

                <TouchableOpacity onPress={sendFeedbackS} >
                {/*<ImageBackground style={{width:60,height:34,alignItems:'center',justifyContent:'center'}}  source={require("./../../../assets/images/intro_white_button.png")} >*/}
                
                <View style={{backgroundColor:"white", height:"40%", width: "85%", justifyContent: "center", borderRadius:10}}>
                <Text style={{color:'#214A84', fontSize:17, marginLeft: "9%"}}>
                  S (소형)
                </Text>
                </View>

              {/*</ImageBackground>*/}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={sendFeedbackM} >
                                    {/*<ImageBackground style={{width:60,height:34,alignItems:'center',justifyContent:'center'}}  source={require("./../../../assets/images/intro_white_button.png")} >*/}
                
                <View style={{backgroundColor:"white", height:"40%", width: "85%", justifyContent: "center", borderRadius:10}}>
                <Text style={{color:'#214A84', fontSize:17, marginLeft: "9%"}}>
                  M (중형)
                </Text>
                </View>

              {/*</ImageBackground>*/}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={sendFeedbackL} >
                {/*<ImageBackground style={{width:60,height:34,alignItems:'center',justifyContent:'center'}}  source={require("./../../../assets/images/intro_white_button.png")} >*/}
                
                <View style={{backgroundColor:"white", height:"40%", width: "85%", justifyContent: "center", borderRadius:10}}>
                <Text style={{color:'#214A84', fontSize:17, marginLeft: "9%"}}>
                  L (대형)
                </Text>
                </View>

              {/*</ImageBackground>*/}
                </TouchableOpacity>
            </View>

            </View>

          </Animatable.View>
            : null }
          <View style={{marginTop: "15%"}}></View>

        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.bg,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  header: {
    marginTop: 10,
    color: theme.color.light,
    marginBottom: 30,
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