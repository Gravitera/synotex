import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  BackHandler,
  PermissionsAndroid,
  Platform
} from 'react-native';
import theme from '../../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomDrawerButtonHeader } from '../../../components/Header';
import Button from './../../../components/Button'
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ThemeProvider } from 'react-native-paper';

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;



class Uvairview extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      permissionsGranted: false,
      showPermsAlert: false,
      typeval: "", 
      backgroundImage: "",
      logoLocation: "",
      logo1width: "",
      logo1height: "",
      logo2width: "",
      logo2height: ""
      }
  }



  render(){

    return(
        null
    )
  }
}

export default Uvairview;