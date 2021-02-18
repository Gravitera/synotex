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
import AntIcon from 'react-native-vector-icons/AntDesign';
import { Image } from 'react-native';

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;
const ratio = (width - 40) / 497;


const MethodView = (props) => {


  return (
    <>
      <View style={styles.container}>
        <CustomBackButtonHeader backFunction={props.navigation.goBack} title={'측정 알고리즘'} />
        <ScrollView style={styles.cardContainer}>
          {props.cardDetails.map((item, index) => (
            <View style={{ flexDirection: 'row', marginBottom: 30 }}>
              <View style={{ marginRight: 10 }}>
                <AntIcon name="tago" size={20} color={theme.color.primary} style={{ paddingTop: 2 }} />
              </View>
              <View>
                <Text style={styles.heading}>{item.heading}</Text>
                <Text style={styles.paragraph} >{item.desc}</Text>
                <Text style={{ fontSize: 12, marginTop: 10 }}>{item.dateTime}</Text>
              </View>
            </View>
          ))}
          <Image style={{ width: width - 40, height: 429 * ratio }} resizeMode="contain" source={require('./../../../assets/images/method.png')} />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  }
});

export default MethodView;
