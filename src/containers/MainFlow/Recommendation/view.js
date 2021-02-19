import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  processColor
} from 'react-native';
import theme from '../../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomBackButtonHeader, CustomDrawerButtonHeader } from '../../../components/Header';
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

var whitemasktext = '';
var blackmasktext = '';
var overallsize = '';

const AI_large = new Sound('ai_large.mp3', Sound.MAIN_BUNDLE);
const AI_medium = new Sound('ai_medium.mp3', Sound.MAIN_BUNDLE);
const AI_small = new Sound('ai_small.mp3', Sound.MAIN_BUNDLE);
const AI_kids = new Sound('ai_kids.mp3', Sound.MAIN_BUNDLE);

const RecommendationView = (props) => {


  const storeData = useSelector((store) => store);

  var maskImage = "M";

    console.log("reco props",props)
  const [data, setData] = useState({
    dataSets: [{
      values: [{ value: 100 }, { value: 110 }, { value: 105 }, { value: 115 }, { value: 110 }],
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
    valueFormatter: ['얼굴길이 (%)', '이마길이 (%)', '인중길이 (%)', '코길이 (%)', '볼길이 (%)']
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
    whitemasktext = "화이트대형(L)";
    blackmasktext = "블랙대형(L)";
    overallsize = "대형(L)";
    maskImage = "L";
  }

  console.log(" =================================== MaskSize in Recomm =============== ", storeData.attendanceReducer.res.MaskSize);

  if (storeData.attendanceReducer.res.MaskSize == "XS"){
      AI_kids.play((success) => {
        console.log("success");
      });

  }

  if (storeData.attendanceReducer.res.MaskSize == "S"){

      AI_small.play((success) => {
        console.log("success");
      });

  }

  if (storeData.attendanceReducer.res.MaskSize == "M"){

      AI_medium.play((success) => {
        console.log("success");
      });

  }

  if (storeData.attendanceReducer.res.MaskSize == "L"){

      AI_large.play((success) => {
        console.log("success");
      });

  }




  return (
    <>
      <View style={styles.container}>
        {/* <CustomBackButtonHeader backFunction={() => props.navigation.navigate('input')} title={'측정결과'} /> */}
        <CustomBackButtonHeader backFunction={() => props.navigation.dispatch(
          StackActions.pop(3)
        )} title={'측정결과'} />
        <ScrollView style={styles.cardContainer}>

          <Animatable.View animation="slideInUp" direction="alternate">
            <View style={styles.headerContainer}>

              {/*<Image style={{ marginRight: 10 }} resizeMode="contain" source={require(`./../../../assets/images/user.png`)} />*/}
              <Text style={styles.header}>당신의 추천 사이즈는 {overallsize} 입니다.</Text>
            </View>
          </Animatable.View>

          <Animatable.View animation="slideInUp" direction="alternate">
            <Table borderStyle={{ borderWidth: 1, borderColor: '#dfdfdf', backgroundColor: theme.color.light, marginBottom: 24 }}>
              <Row data={tableHead} style={styles.head} textStyle={styles.text} />
              <Rows data={tableData} style={{ backgroundColor: theme.color.light }} textStyle={styles.text} />
            </Table>
          </Animatable.View>




          <Animatable.View animation="slideInUp" direction="alternate">
            {/* <View style={{ height: 80 }}>
              <Text> selected entry</Text>
              <Text> {selectedEntry}</Text>
            </View> */}
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
            {/* <Image style={{ width: width - 40, height: 489 * ratio, marginVertical: 40, borderRadius: 5 }} resizeMode="contain" source={require('./../../../assets/images/graph.png')} /> */}
            {maskImage == "XS" ?
            <View style={styles.gallery}>
              <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/product/eptfe-%ED%95%84%ED%84%B0-%EB%A7%88%EC%8A%A4%ED%81%AC-%ED%82%A4%EC%A6%88-50%EB%A7%A4/27/category/1/display/2/")} style={styles.maskButton}>
                <View style={styles.buttonCont}>

                  <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/white.png`)} />
                  <Text style={styles.prodText}>
                    ePTFE 필터마스크{'\n'}
                    {whitemasktext}{'\n'}
                  ￦ 25,000원
                </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/product/eptfe-%ED%95%84%ED%84%B0-%EB%A7%88%EC%8A%A4%ED%81%AC-%ED%82%A4%EC%A6%88-50%EB%A7%A4/27/category/1/display/2/")} style={styles.maskButton}>
                <View style={styles.buttonCont}>

                  <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/white.png`)} />
                  <Text style={styles.prodText}>
                    ePTFE 필터마스크{'\n'}
                    {blackmasktext}{'\n'}
                  ￦ 25,000원
                </Text>
                </View>
              </TouchableOpacity>
            </View>
            : null}
            {maskImage == "S" || maskImage == "M" || maskImage == "L" ?
            <View style={styles.gallery}>
              <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/product/eptfe-%ED%95%84%ED%84%B0-%EB%A7%88%EC%8A%A4%ED%81%AC-%ED%99%94%EC%9D%B4%ED%8A%B8-50%EB%A7%A4/31/category/1/display/2/")} style={styles.maskButton}>
                <View style={styles.buttonCont}>

                  <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/white.png`)} />
                  <Text style={styles.prodText}>
                    ePTFE 필터마스크{'\n'}
                    {whitemasktext}{'\n'}
                  ￦ 25,000원
                </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/product/eptfe-%ED%95%84%ED%84%B0-%EB%A7%88%EC%8A%A4%ED%81%AC-%EB%B8%94%EB%9E%99-50%EB%A7%A4/32/category/1/display/2/")} style={styles.maskButton}>
                <View style={styles.buttonCont}>

                  <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/black.png`)} />
                  <Text style={styles.prodText}>
                    ePTFE 필터마스크{'\n'}
                    {blackmasktext}{'\n'}
                  ￦ 35,000원
                </Text>
                </View>
              </TouchableOpacity>
            </View>
            : null}
          </Animatable.View>
          {/* <Text style={styles.header}>추천상품</Text> */}
          {/* {
            props.route.params?.MaskSize.toLowerCase() === 'xs'
              ?
              <View style={styles.gallery}>
                <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/product/eptfe-%ED%95%84%ED%84%B0-%EB%A7%88%EC%8A%A4%ED%81%AC-%ED%82%A4%EC%A6%88-50%EB%A7%A4/27/category/1/display/2/")} style={{ flex: 1 }}>
                  <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/Mask/White/xs/xs.png`)} />
                </TouchableOpacity>
 
                <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/product/eptfe-%ED%95%84%ED%84%B0-%EB%A7%88%EC%8A%A4%ED%81%AC-%ED%82%A4%EC%A6%88-50%EB%A7%A4/27/category/1/display/2/")} style={{ flex: 1 }}>
                  <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/Mask/Black/xs/xs.png`)} />
                </TouchableOpacity>
              </View>
              : props.route.params?.MaskSize.toLowerCase() === 's'
                ?
                <View style={styles.gallery}>
                  <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/product/eptfe-%ED%95%84%ED%84%B0-%EB%A7%88%EC%8A%A4%ED%81%AC-%ED%99%94%EC%9D%B4%ED%8A%B8-%EB%8B%A8%ED%92%88/29/category/1/display/2/")} style={{ flex: 1 }}>
                    <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/Mask/White/s/s.png`)} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/product/eptfe-%ED%95%84%ED%84%B0-%EB%A7%88%EC%8A%A4%ED%81%AC-%EB%B8%94%EB%9E%99-%EB%8B%A8%ED%92%88/30/category/1/display/2/")} style={{ flex: 1 }}>
                    <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/Mask/Black/s/s.png`)} />
                  </TouchableOpacity>
                </View>
                : props.route.params?.MaskSize.toLowerCase() === 'm'
                  ?
                  <View style={styles.gallery}>
                    <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/product/eptfe-%ED%95%84%ED%84%B0-%EB%A7%88%EC%8A%A4%ED%81%AC-%ED%99%94%EC%9D%B4%ED%8A%B8-%EB%8B%A8%ED%92%88/29/category/1/display/2/")} style={{ flex: 1 }}>
                      <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/Mask/White/m/m.png`)} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/product/eptfe-%ED%95%84%ED%84%B0-%EB%A7%88%EC%8A%A4%ED%81%AC-%EB%B8%94%EB%9E%99-%EB%8B%A8%ED%92%88/30/category/1/display/2/")} style={{ flex: 1 }}>
                      <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/Mask/Black/m/m.png`)} />
                    </TouchableOpacity>
                  </View>
                  : props.route.params?.MaskSize.toLowerCase() === 'l'
                    ?
                    <View style={styles.gallery}>
                      <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/product/eptfe-%ED%95%84%ED%84%B0-%EB%A7%88%EC%8A%A4%ED%81%AC-%ED%99%94%EC%9D%B4%ED%8A%B8-%EB%8B%A8%ED%92%88/29/category/1/display/2/")} style={{ flex: 1 }}>
                        <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/Mask/White/m/m.png`)} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/product/eptfe-%ED%95%84%ED%84%B0-%EB%A7%88%EC%8A%A4%ED%81%AC-%EB%B8%94%EB%9E%99-%EB%8B%A8%ED%92%88/30/category/1/display/2/")} style={{ flex: 1 }}>
                        <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/Mask/Black/m/m.png`)} />
                      </TouchableOpacity>
                    </View>
                    : null
          } */}

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