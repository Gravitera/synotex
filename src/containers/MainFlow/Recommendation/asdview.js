import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import theme from '../../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomBackButtonHeader, CustomDrawerButtonHeader } from '../../../components/Header';
import * as Animatable from 'react-native-animatable';


import AntIcon from 'react-native-vector-icons/AntDesign';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import { StackActions } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;
const ratio = (width - 40) / 576;


const RecommendationView = (props) => {
  let data = {
    "name": "Root",
    "children": [{
      "name": "Santa Catarina",
      "children": [{
        "name": "Tromp"
      }, {
        "name": "Thompson"
      }, {
        "name": "Ryan"
      }]
    }, {
      "name": "Acre",
      "children": [{
        "name": "Dicki"
      }, {
        "name": "Armstrong"
      }, {
        "name": "Nitzsche"
      }]
    }]
  }

  let options = {
    margin: {
      top: 20,
      left: 50,
      right: 80,
      bottom: 20
    },
    width: 200,
    height: 200,
    fill: "#2980B9",
    stroke: "#3E90F0",
    r: 2,
    animate: {
      type: 'oneByOne',
      duration: 200,
      fillTransition: 3
    },
    label: {
      fontFamily: 'Arial',
      fontSize: 8,
      fontWeight: true,
      fill: '#34495E'
    }
  }

  return (
    <>
      <Animatable.View style={styles.container} animation="slideInDown">
        {/* <CustomBackButtonHeader backFunction={() => props.navigation.navigate('input')} title={'측정결과'} /> */}
        <CustomBackButtonHeader backFunction={() => props.navigation.dispatch(
          StackActions.pop(3)
        )} title={'측정결과'} />
        <ScrollView style={styles.cardContainer}>
          <View style={{marginLeft:'10%',flexDirection:'row',alignItems:'center'}}>
          <Image style={{ width: 40, height: 40,  }} resizeMode="contain" source={require('./../../../assets/images/face.png')} />
            <Text style={{marginLeft:15,fontFamily:'bold',color:'white',fontSize:14}}>{'당신의 추천 사이즈는 소형(S)입니다.'}</Text>
          </View>
          {/* <Text style={styles.header}>결과(mm)</Text> */}



          <View style={{marginTop:40,marginBottom:40}}>
          <View style={{flexDirection:'row',height:34,borderBottomWidth:1} }>
              <View style={{flex:1.1,alignItems:'center',justifyContent:'center',backgroundColor:'#e2e2e2',borderRightWidth:1}}><Text style={{fontSize:10}}>{''}</Text></View>
              <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#e2e2e2',borderRightWidth:1}}><Text style={{fontSize:10}}>{'평균 사이즈'}</Text></View>
              <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#e2e2e2',borderRightWidth:1}}><Text style={{fontSize:10}}>{'실측 사이즈'}</Text></View>
              <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#e2e2e2'}}><Text style={{fontSize:10}}>{'추천 사이즈'}</Text ></View>
            </View>
            <View style={{flexDirection:'row',height:34,borderBottomWidth:1}}>
              <View style={{flex:1.1,alignItems:'center',justifyContent:'center',backgroundColor:'white',borderRightWidth:1}}><Text style={{fontSize:10}}>{'얼굴길이(mm)'}</Text></View>
              <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'white',borderRightWidth:1}}><Text style={{fontSize:10}}>{'10mm'}</Text></View>
              <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'white',borderRightWidth:1}}><Text style={{fontSize:10}}>{'10mm'}</Text></View>
              <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'white'}}><Text style={{fontSize:10}}>{'소형(s)'}</Text ></View>
            </View>
            <View style={{flexDirection:'row',height:34,borderBottomWidth:1}}>
              <View style={{flex:1.1,alignItems:'center',justifyContent:'center',backgroundColor:'white',borderRightWidth:1}}><Text style={{fontSize:10}}>{'인중길이(mm)'}</Text></View>
              <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'white',borderRightWidth:1}}><Text style={{fontSize:10}}>{'40mm'}</Text></View>
              <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'white',borderRightWidth:1}}><Text style={{fontSize:10}}>{'40mm'}</Text></View>
              <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'white'}}><Text style={{fontSize:10}}>{'소형(s)'}</Text></View>
            </View>
          </View>

          <View>
          
          </View>
          <Image style={{ width: width - 40, height: 489 * ratio, marginBottom: 60 }} resizeMode="contain" source={require('./../../../assets/images/graph.png')} />
          
          {
            props.route.params.MaskSize.toLowerCase() === 'xs'
              ?
              <View style={styles.gallery}>
                <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/product/eptfe-%ED%95%84%ED%84%B0-%EB%A7%88%EC%8A%A4%ED%81%AC-%ED%82%A4%EC%A6%88-50%EB%A7%A4/27/category/1/display/2/")} style={{ flex: 1 }}>
                  <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/Mask/White/xs/xs.png`)} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/product/eptfe-%ED%95%84%ED%84%B0-%EB%A7%88%EC%8A%A4%ED%81%AC-%ED%82%A4%EC%A6%88-50%EB%A7%A4/27/category/1/display/2/")} style={{ flex: 1 }}>
                  <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/Mask/Black/xs/xs.png`)} />
                </TouchableOpacity>
              </View>
              : props.route.params.MaskSize.toLowerCase() === 's'
                ?
                <View style={styles.gallery}>
                  <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/product/eptfe-%ED%95%84%ED%84%B0-%EB%A7%88%EC%8A%A4%ED%81%AC-%ED%99%94%EC%9D%B4%ED%8A%B8-%EB%8B%A8%ED%92%88/29/category/1/display/2/")} style={{ flex: 1 }}>
                    <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/Mask/White/s/s.png`)} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/product/eptfe-%ED%95%84%ED%84%B0-%EB%A7%88%EC%8A%A4%ED%81%AC-%EB%B8%94%EB%9E%99-%EB%8B%A8%ED%92%88/30/category/1/display/2/")} style={{ flex: 1 }}>
                    <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/Mask/Black/s/s.png`)} />
                  </TouchableOpacity>
                </View>
                : props.route.params.MaskSize.toLowerCase() === 'm'
                  ?
                  <View style={styles.gallery}>
                    <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/product/eptfe-%ED%95%84%ED%84%B0-%EB%A7%88%EC%8A%A4%ED%81%AC-%ED%99%94%EC%9D%B4%ED%8A%B8-%EB%8B%A8%ED%92%88/29/category/1/display/2/")} style={{ flex: 1 }}>
                      <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/Mask/White/m/m.png`)} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/product/eptfe-%ED%95%84%ED%84%B0-%EB%A7%88%EC%8A%A4%ED%81%AC-%EB%B8%94%EB%9E%99-%EB%8B%A8%ED%92%88/30/category/1/display/2/")} style={{ flex: 1 }}>
                      <Image style={styles.galleryImage} resizeMode="contain" source={require(`./../../../assets/images/Mask/Black/m/m.png`)} />
                    </TouchableOpacity>
                  </View>
                  : props.route.params.MaskSize.toLowerCase() === 'l'
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
          }

        </ScrollView>
      </Animatable.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D3A71',
  },
  header: {
    marginTop: 20,
    borderBottomColor: theme.color.secondary,
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 20
  },
  gallery: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  galleryImage: { width: ((width - 40) / 2) - 10, height: ((width - 40) / 2) - 10, marginBottom: 60 },
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
  }
});

export default RecommendationView;
