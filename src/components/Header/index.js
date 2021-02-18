import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../../../theme';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { getStorageItem } from '../../utils';

const CustomDrawerButtonHeader = (props) => {
  // console.log('{{====', props);
  const [bus, setBusId] = useState('');
  useEffect(() => {
    (async () => {
      const busID = await getStorageItem('UserData');
      const busNumber = busID?.busId?.busNo;
      // console.log('BU SN', await getStorageItem('UserData'));
      setBusId(busNumber);
      // props.studentsOfSingleBus(busNumber);
    })();
  }, []);

  // console.log('BUSSSSSSSSS NO', bus);
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.drawerTrigger}
        onPress={() => navigation.openDrawer()}>
        <Icon name="bars" size={46} color="#fff" />
      </TouchableOpacity>
      <View style={styles.busNo}>
        <Icon name="bus" size={32} color="#fff" />
        <Text style={styles.heading}>{bus}</Text>
      </View>
    </View>
  );
};

const CustomBackButtonHeader = (props) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.drawerTrigger}
        onPress={() => props.backFunction()}>
        <IonIcon name="chevron-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.heading}>{props.title}</Text>
      <View style={{ width: 66 }} />
    </View>
  );
};

const CustomHeader = (props) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={{ ...styles.heading, textAlign: 'center', width: '100%', paddingVertical: 20 }}>{props.title}</Text>
    </View>
  );
};

const CustomBackForwardButtonHeader = (props) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.drawerTrigger}
        onPress={() => props.backFunction()}>
        <IonIcon name="chevron-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.heading}>{props.title}</Text>
      <TouchableOpacity
        style={styles.drawerTrigger}
        onPress={() => props.forwardFunction()}>
        <IonIcon name="chevron-forward" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export { CustomDrawerButtonHeader, CustomBackButtonHeader, CustomBackForwardButtonHeader, CustomHeader };

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.color.bg,
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 200,
  },
  drawerTrigger: {
    // backgroundColor: 'green',
    // height: 72,
    // width: 64,,
    padding: 20,
    paddingRight: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.color.light
  },
  busNo: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {

    fontFamily: theme.font.bold,
    fontSize: 18,
    fontWeight: '600',
    color: theme.color.light,
  },
});
