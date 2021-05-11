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
const AI_kids = new Sound('kidssize.mp3', Sound.MAIN_BUNDLE);
const feedbackvoice = new Sound("feedbackvoice.mp3", Sound.MAIN_BUNDLE);

const nonesizesmall = new Sound("nonesizesmall.mp3", Sound.MAIN_BUNDLE);
const nonesizemedium = new Sound("nonesizemedium.mp3", Sound.MAIN_BUNDLE);
const nonesizelarge = new Sound("nonesizelarge.mp3", Sound.MAIN_BUNDLE);
const nonesize = new Sound("nonesize.mp3", Sound.MAIN_BUNDLE);

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

      // {
      //   values: [{ value: 115 }, { value: 100 }, { value: 105 }, { value: 110 }, { value: 120 }],
      //   label: 'DS 2',
      //   config: {
      //     color: processColor('#C0FF8C'),

      //     drawFilled: true,
      //     fillColor: processColor('#C0FF8C'),
      //     fillAlpha: 150,
      //     lineWidth: 1.5
      //   }
      // }, {
      //   values: [{ value: 105 }, { value: 115 }, { value: 121 }, { value: 110 }, { value: 105 }],
      //   label: 'DS 3',
      //   config: {
      //     color: processColor('#8CEAFF'),

      //     drawFilled: true,
      //     fillColor: processColor('#8CEAFF')
      //   }
      // }
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

  // useEffect(() => {
  //   setData({
  //     $set: {
  //       dataSets: [{
  //         values: [{ value: 100 }, { value: 110 }, { value: 105 }, { value: 115 }, { value: 110 }],
  //         label: 'DS 1',
  //         config: {
  //           color: processColor('#FF8C9D'),

  //           drawFilled: true,
  //           fillColor: processColor('#FF8C9D'),
  //           fillAlpha: 100,
  //           lineWidth: 2
  //         }
  //       }, {
  //         values: [{ value: 115 }, { value: 100 }, { value: 105 }, { value: 110 }, { value: 120 }],
  //         label: 'DS 2',
  //         config: {
  //           color: processColor('#C0FF8C'),

  //           drawFilled: true,
  //           fillColor: processColor('#C0FF8C'),
  //           fillAlpha: 150,
  //           lineWidth: 1.5
  //         }
  //       }, {
  //         values: [{ value: 105 }, { value: 115 }, { value: 121 }, { value: 110 }, { value: 105 }],
  //         label: 'DS 3',
  //         config: {
  //           color: processColor('#8CEAFF'),

  //           drawFilled: true,
  //           fillColor: processColor('#8CEAFF')
  //         }
  //       }],
  //     }
  //   })
  //   setXAxis({
  //     $set: {
  //       valueFormatter: ['A', 'B', 'C', 'D', 'E']
  //     }
  //   })
  // }, [])

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
  let FaceWidthPercent_str = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceWidthPercent))) + "mm";
  let FaceWidth_str = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceWidth))) + "mm";
  let ChinWidthAverage_str = String(parseInt(parseFloat(storeData.attendanceReducer.res.PentagramAverage.ChinWidth))) + "mm";
  let HeadRoundAverage_str = String(parseInt(parseFloat(storeData.attendanceReducer.res.PentagramAverage.HeadRound))) + "mm";
  let ChinWidthPredicted_str = String(parseInt(parseFloat(storeData.attendanceReducer.res.PentagramPredicted.ChinWidth))) + "mm";
  let HeadRoundPredicted_str = String(parseInt(parseFloat(storeData.attendanceReducer.res.PentagramPredicted.HeadRound))) + "mm";
  let FaceWidth_pst = String(Math.trunc(parseFloat(storeData.attendanceReducer.res.FaceWidth)/parseFloat(storeData.attendanceReducer.res.FaceWidthPercent)*100*100)/100)+"%";
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




  /*
  if (storeData.attendanceReducer.res.MaskSize.toLowerCase() == "xs") {
    let faceheightpercent = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceHeightPercent))) + "mm";
    let faceheight = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceHeight))) + "mm";
    let facewidthpercent = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceWidthPercent))) + "mm";
    let facewidth = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceWidth))) + "mm";
    tableData = [
      ['얼굴길이(mm)', faceheightpercent, faceheight, '키즈(XS)'],
      ['얼굴넓이(mm)', facewidthpercent, facewidth, '키즈(XS)']
    ];
    whitemasktext = "화이트키즈(XS)";
    blackmasktext = "블랙키즈(XS)";
    overallsize = "키즈(XS)";
    maskImage = "XS";


  }
  if (storeData.attendanceReducer.res.MaskSize.toLowerCase() == "s") {
    let faceheightpercent = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceHeightPercent))) + "mm"
    let faceheight = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceHeight))) + "mm"
    let facewidthpercent = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceWidthPercent))) + "mm"
    let facewidth = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceWidth))) + "mm"
    tableData = [
      ['얼굴길이(mm)', faceheightpercent, faceheight, '소형(S)'],
      ['얼굴넓이(mm)', facewidthpercent, facewidth, '소형(S)']
    ]
    whitemasktext = "화이트소형(S)";
    blackmasktext = "블랙소형(S)";
    overallsize = "소형(S)";
    maskImage = "S";
  }
  if (storeData.attendanceReducer.res.MaskSize.toLowerCase() == "m") {
    let faceheightpercent = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceHeightPercent))) + "mm"
    let faceheight = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceHeight))) + "mm"
    let facewidthpercent = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceWidthPercent))) + "mm"
    let facewidth = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceWidth))) + "mm"
    tableData = [
      ['얼굴길이(mm)', faceheightpercent, faceheight, '중형(M)'],
      ['얼굴넓이(mm)', facewidthpercent, facewidth, '중형(M)']
    ]
    whitemasktext = "화이트중형(M)";
    blackmasktext = "블랙중형(M)";
    overallsize = "중형(M)";
    maskImage = "M";
  }
  if (storeData.attendanceReducer.res.MaskSize.toLowerCase() == "l") {
    let faceheightpercent = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceHeightPercent))) + "mm"
    let faceheight = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceHeight))) + "mm"
    let facewidthpercent = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceWidthPercent))) + "mm"
    let facewidth = String(parseInt(parseFloat(storeData.attendanceReducer.res.FaceWidth))) + "mm"
    tableData = [
      ['얼굴길이(mm)', faceheightpercent, faceheight, '대형(L)'],
      ['얼굴넓이(mm)', facewidthpercent, facewidth, '대형(L)']
    ]
    tableData2 = [
      ['평균', facewidthpercent,faceheightpercent, storeData.attendanceReducer.res.PentagramAverage.ChinWidth, storeData.attendanceReducer.res.PentagramAverage.HeadRound, '대형(L)'],
      ['당신', facewidth, faceheight, storeData.attendanceReducer.res.PentagramPredicted.ChinWidth, storeData.attendanceReducer.res.PentagramPredicted.HeadRound, '대형(L)'],
      ['%', '10mm', '10mm', '10mm', '10mm', '대형(L)'],
    ]

    whitemasktext = "화이트대형(L)";
    blackmasktext = "블랙대형(L)";
    overallsize = "대형(L)";
    maskImage = "L";
  }
  */

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

if (storeData.attendanceReducer.res.MaskSize == "M" && feedbacksent == 0){

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
if (storeData.attendanceReducer.res.MaskSize == "N" && feedbacksent == 0){

  nonesize.play((success) => {
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


                {storeData.attendanceReducer.res.MaskSize.toLowerCase() == "xs" ?
                  <View style={{flexDirection: "column", alignItems:'center'}}>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>시노텍스앱에서 측정한</Text>
                    <Text style={{marginTop: -1*height*0.01, color: theme.color.light, marginBottom: height*0.02}}>당신의 추천 사이즈는 <Text style={{fontSize: width*0.04, color: "yellow"}}>"키즈(XS)"</Text> 입니다.</Text>
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025 }}>더운 계절에는 <Text style={{fontSize: width*0.04, color: "yellow"}}>"소형(S)"</Text>도 사용하기 편하십니다.</Text>
                  </View>
                  :
                  null}      
                  {storeData.attendanceReducer.res.MaskSize.toLowerCase() == "s" ?
                  <View style={{flexDirection: "column", alignItems:'center'}}>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>시노텍스앱에서 측정한</Text>
                    <Text style={{marginTop: -1*height*0.01, color: theme.color.light, marginBottom: height*0.02}}>당신의 추천 사이즈는 <Text style={{fontSize: width*0.04, color: "yellow"}}>"소형(S)"</Text> 입니다.</Text>
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025 }}>더운 계절에는 <Text style={{fontSize: width*0.04, color: "yellow"}}>"중형(M)"</Text>도 사용하기 편하십니다.</Text>
                  </View>
                  :
                  null}   
                  {storeData.attendanceReducer.res.MaskSize.toLowerCase() == "m" ?
                  <View style={{flexDirection: "column", alignItems:'center'}}>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>시노텍스앱에서 측정한</Text>
                    <Text style={{marginTop: -1*height*0.01, color: theme.color.light, marginBottom: height*0.02}}>당신의 추천 사이즈는 <Text style={{fontSize: width*0.04, color: "yellow"}}>"중형(M)"</Text> 입니다.</Text>
                    <Text style={{marginTop: -1*height*0.01,color: theme.color.light,marginBottom: height*0.025 }}>더운 계절에는 <Text style={{fontSize: width*0.04, color: "yellow"}}>"대형(L)"</Text>도 사용하기 편하십니다.</Text>
                  </View>
                  :
                  null}   
                  {storeData.attendanceReducer.res.MaskSize.toLowerCase() == "l" ?
                  <View style={{flexDirection: "column", alignItems:'center'}}>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>시노텍스앱에서 측정한</Text>
                    <Text style={{marginTop: -1*height*0.01, color: theme.color.light, marginBottom: height*0.02}}>당신의 추천 사이즈는 <Text style={{fontSize: width*0.04, color: "yellow"}}>"대형(L)"</Text> 입니다.</Text>
                  </View>
                  :
                  null}  

                  {storeData.attendanceReducer.res.MaskSize == "NS" || storeData.attendanceReducer.res.MaskSize == "NM" || storeData.attendanceReducer.res.MaskSize == "NL"?
                  <View style={{flexDirection: "column", alignItems:'center'}}>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>측정결과, 딱 맞는 사이즈가 없습니다.</Text>
                    <Text style={{marginTop: 5,color: theme.color.light,marginBottom: 30 }}>넉넉한 사이즈 {overallsize}을 추천 드립니다.</Text>
                  </View>
                  :
                  null} 

                  {storeData.attendanceReducer.res.MaskSize == "N"?
                  <View style={{flexDirection: "column", alignItems:'center'}}>
                    <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.02}}>정확하게 맞는 사이즈가 없습니다. 재 측정 해주세요.</Text>
                  </View>
                  :
                  null} 



              <Text style={{marginTop: height*0.02, color: theme.color.light, marginBottom: height*0.03, marginLeft: width*0.07}}>※ 아래 원하는 색상을 선택한후 바로 구매를 해보세요!</Text>


  
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
          <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/index.html")}>
            <Image style={{width: width*0.245,height: width*0.245,marginBottom: height*0.01, marginTop: -1*height*0.015}} resizeMode="contain" source={require(`./../../../assets/images/whitecollabmaskicon.png`)} />
          </TouchableOpacity>
        </View>
  

        {Platform.OS == 'android' ? 
            <Animatable.View animation="slideInUp" direction="alternate">
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.header2} onPress={() => props.navigation.navigate('ArCamera',{MaskSize: storeData.attendanceReducer.res.MaskSize})} > 
              

              <ImageBackground resizeMode="contain" style={{width:width*0.7,height:height*0.05,alignItems:'center',justifyContent:'center'}}  source={require("./../../../assets/images/intro_white_button_recommendation.png")} >
                <Text style={{color:'#214A84'}}>
                  시노텍스 마스크 가상착용
                </Text>
              </ImageBackground>


            </TouchableOpacity>
          </View>
          <Image resizeMode="contain" style={{width:width*0.15,height:height*0.05,alignItems:'center',justifyContent:'center', marginLeft: width*0.675, marginTop: -1*height*0.06}}  source={require("./../../../assets/images/goicon.png")} />
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