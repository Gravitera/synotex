import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import theme from '../../../../theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { CustomBackButtonHeader, CustomDrawerButtonHeader } from '../../../components/Header';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;
const ratio = (width - 40) / 534;


const InitialView = (props) => {


  return (
    <>
      <View style={styles.container}>
        <CustomBackButtonHeader backFunction={props.navigation.goBack} title={'AI 시노텍스'} />
        <View style={{ alignItems: 'center', marginTop: 68, flex: 1 }}>
          <TouchableOpacity style={styles.buttonOver} onPress={() => props.navigation.navigate('input')}>
            <Image style={{ width: width - 40, height: 622 * ratio, zIndex: 0 }} resizeMode="contain" source={require('./../../../assets/images/portrait.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOver} onPress={() => props.navigation.navigate('input')}>
            <Text style={styles.text}>마스크 측정 시작하기</Text>
          </TouchableOpacity>
          <View style={{ position: 'absolute', bottom: 32, }}>

            <TouchableOpacity style={styles.progressButton} onPress={() => { props.navigation.navigate("method") }}>
              <View>
                <Text style={styles.heading}>측정 알고리즘</Text>
                <Text style={styles.paragraph}>마스크 측정방식이 궁금하다면?</Text>
              </View>
              <View>
                <Icon name="chevron-forward" size={42} color={theme.color.secondary} />
              </View>
            </TouchableOpacity>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    fontSize: 18,
    color: theme.font.color
  },
  paragraph: {
    fontFamily: theme.font.regular,
    fontSize: 14,
    color: theme.font.color
  },
  text: {
    fontFamily: theme.font.bold,
    color: theme.color.light,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    height: 54,
    textAlignVertical: 'center'
  }
});

export default InitialView;
