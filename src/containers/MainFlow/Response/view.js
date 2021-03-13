import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import theme from '../../../../theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { CustomHeader } from '../../../components/Header';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;
const ratio = (width - 40) / 534;
let windowHeight = 220;

const ResponseView = (props) => {
   
    const storeData = useSelector((store) => store);
    console.log("store",storeData)
    console.log("props : ",props)

  return (
    <>
      <View style={styles.container}>
        {/* <CustomHeader title={'측정 결과'} /> */}
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Image style={{ width: width, height: height - windowHeight, zIndex: 0 }} resizeMode="cover" source={{ uri: "data:image/jpg;base64," + storeData.attendanceReducer.res.FrontImage }} />
          <View style={{ width, height: windowHeight, zIndex: 1000, position: 'absolute', bottom: 0, backgroundColor: theme.color.light }}>
            <View style={styles.buttonOver}>
              <Text style={styles.text}>측정사진이 마음에 들지 않으시면 재촬영{"\n"}
            측정사진이 맘에 드신다면 측정결과 확인 버튼을 눌러주세요.</Text>
            </View>
            <View style={{ marginTop: 4 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => props.navigation.navigate("input")}>
                  <Image style={{ width: 98, height: 121, marginRight: 15 }} source={require("./../../../assets/images/refresh.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={props.onNext}>

                  <Image style={{ width: 98, height: 121, marginLeft: 15 }} source={require("./../../../assets/images/result.png")} />
                </TouchableOpacity>
              </View>

              {/* <TouchableOpacity style={styles.progressButton} onPress={props.onNext}>
              <View>
                <Text style={styles.heading}>AI 자동인식 을 통한 열굴 치수확인</Text>
                <Text style={styles.paragraph}>얼굴 치수에 따른 추천 마스크 사이즈을 확인해주세요</Text>
              </View>
              <View>
                <Icon name="chevron-forward" size={42} color={theme.color.secondary} />
              </View>
            </TouchableOpacity> */}
            </View>
          </View>

        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonOver: {
    // backgroundColor: 'rgba(0,0,0,0.5)',
    width: width - 40,
    zIndex: 120
  },
  progressButton: {
    fontSize: 16,
    fontWeight: "bold",
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: width - 40,
    justifyContent: 'space-between',
    padding: 20,
    borderBottomColor: theme.color.secondary,
    borderBottomWidth: 1,
  },
  heading: {
    fontFamily: theme.font.bold,
    marginBottom: 6,
    fontSize: 16,
    color: theme.font.color
  },
  paragraph: {
    fontFamily: theme.font.regular,
    fontSize: 14,
    color: theme.font.color
  },
  text: {
    fontFamily: theme.font.bold,
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    textAlignVertical: 'center',
    width,
    marginVertical: 20
  }
});

export default ResponseView;
