import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../../../theme';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { getStorageItem } from '../../utils';
import { Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');

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
    <View style={styles.headerContainer2}>
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

const CustomBackButtonHeader2 = (props) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.drawerTrigger}
        onPress={() => props.backFunction()}>
        <IonIcon name="chevron-back" size={24} color="#0380D8" />
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

const CustomBrandstoryHeader = (props) => {
  return (
    <View style={styles.headerContainerbrandstory}>
      <TouchableOpacity
        style={styles.drawerTrigger}
      >
      </TouchableOpacity>
      <Text style={styles.heading}>{props.title}</Text>
      <TouchableOpacity
        style={styles.drawerTrigger}
      >
      </TouchableOpacity>
    </View>
  );
}

const CustomBackForwardButtonHeader2 = (props) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.drawerTrigger}
        onPress={() => props.backFunction()}>
        <IonIcon name="chevron-back" size={24} color="#0380D8" />
      </TouchableOpacity>
      <Text style={styles.heading2}>{props.title}</Text>
      <TouchableOpacity
        style={styles.drawerTrigger}
        onPress={() => props.forwardFunction()}>
        <Text style={styles.heading}>처음화면</Text>
      </TouchableOpacity>
    </View>
  );
};

export { CustomBrandstoryHeader, CustomDrawerButtonHeader, CustomBackButtonHeader, CustomBackForwardButtonHeader, CustomHeader, CustomBackButtonHeader2, CustomBackForwardButtonHeader2};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#F2F4FA",
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 200,
  },
  headerContainerbrandstory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.color.bg,
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 400
  },
  headerContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.color.bg,
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 200
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
    color: "#0380D8"
  },
  busNo: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {

    fontFamily: theme.font.bold,
    fontSize: 18,
    fontWeight: '600',
    color: "#0380D8",
  },
  heading2: {
    marginLeft: 35,
    fontFamily: theme.font.bold,
    fontSize: 18,
    fontWeight: '600',
    color: "#0380D8",
  },
});
