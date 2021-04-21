import React,{useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import theme from '../../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomDrawerButtonHeader } from '../../../components/Header';
import Button from './../../../components/Button'
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import { CustomBrandstoryHeader } from '../../../components/Header';
//import { styles } from '../../../styles/styles';

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

const Brandstory = (props) => {


  return (
    <>

        <CustomBrandstoryHeader title={"브랜드 스토리"}/>

        <Image source={require("./../../../assets/images/brandstorytop2x.png")} style={styles.topimage}/>

        <View style={{justifyContent: "center"}}>
            <Image source={require("./../../../assets/images/brandstorybottom2x.png")} style={styles.bottomimage}/>
        </View>

    </>
  );
};

const styles = StyleSheet.create({
  logo:{
    width: 300,
    height: 300
  },
  topimage:{
    width: width*0.99,
    height: height*0.5,
    marginTop: height*0.08,
    marginLeft: width*0.035
  },
  bottomimage:{
    width: width*1,
    height: height*0.33,
    marginTop: -1*height*0.02,
    marginLeft: -1*width*0.00
  }

});

export default Brandstory;
