import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Switch, ScrollView } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
  Drawer,
  Avatar,
  List,
  Modal,
  Portal,
  Button,
  Provider,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../../theme';
import {
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { logout, toggleAuthActionCreator } from '../../store/actions/authActions';
import { onSnackbar } from '../../store/actions/layoutActions';
import { useNavigation } from '@react-navigation/core';
import { color, font } from '../../../theme';
import { getStorageItem } from '../../utils';
// import LogOut from '../../containers/MainFlow/LogOut'

const DrawerContent = (props) => {
  const [driverData, setDriverData] = useState();
  // let driverData
  useEffect(() => {
    (async () => {
      driver_data = await getStorageItem('UserData');
      // console.log('getting data from Async in useeffect', driver_data);
      setDriverData(driver_data);
      props.navigation.addListener('focus', async () => {
        const driver_data = await getStorageItem('UserData');
        // console.log(
        //   'getting data from Async in navigation on focus',
        //   driver_data,
        // );
        setDriverData(driver_data);
      });
      // const parent_data = await getStorageItem("UserData")
      // console.log("getting data from Async in useeffect", parent_data)
      // setParentData(parent_data)
      // props.fetchStudents(parent_data)
      // props.navigation.addListener('focus', async () => {
      //   const parent_data = await getStorageItem("UserData")
      //   console.log("getting data from Async in navigation on focus", parent_data)
      //   setParentData(parent_data)
    })();
  }, []);

  // console.log('object1 DRAWER DRIVER', driverData);

  const navigation = useNavigation();
  // console.log('user -->', props.user);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <Text style={styles.username}>
              {driverData?.schoolId ? driverData?.schoolId?.name : 'Lynx Bus'}
            </Text>
          </View>
          <Drawer.Section>
            <View>
              <List.Accordion title="Account Info">
                <View>
                  <View style={styles.collapsible}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#B7B7B7',
                        fontSize: 16,
                      }}>
                      NAME
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#373C44',
                        fontSize: 16,
                      }}>
                      {props?.driverData?.name}
                    </Text>
                  </View>

                  <View style={styles.collapsible}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#B7B7B7',
                        fontSize: 16,
                      }}>
                      PHONE NO
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#373C44',
                        fontSize: 16,
                      }}>
                      {props?.driverData?.contact}
                    </Text>
                  </View>

                  <View style={styles.collapsible}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#B7B7B7',
                        fontSize: 16,
                      }}>
                      BUS NO
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#373C44',
                        fontSize: 16,
                      }}>
                      {props?.driverData?.busId
                        ? driverData?.busId?.busNo
                        : 'N/A'}
                    </Text>
                  </View>
                </View>
              </List.Accordion>

              <List.Accordion title="Contact Admin">
                <View>
                  <View style={styles.collapsible}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#B7B7B7',
                        fontSize: 16,
                      }}>
                      Phone no
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#373C44',
                        fontSize: 16,
                      }}>
                      {props?.driverData?.schoolId
                        ? driverData?.schoolId?.contact
                        : 'N/A'}
                    </Text>
                  </View>
                </View>
              </List.Accordion>
            </View>

            {/* 
            <DrawerItem
              icon={({ color, size }) => (
                <Image
                  resizeMode="contain"
                  style={{ width: size, tintColor: color }}
                  source={require('../../assets/images/about.png')}
                />
              )}
              label="About"
              onPress={() => props.navigation.navigate('about')}
            /> */}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <View>
          <View style={{ alignItems: 'center', marginBottom: -10 }}>
            <DrawerItem
              label="Reset Your Password"
              labelStyle={{ fontSize: 15 }}
              onPress={() => props.navigation.navigate('ResetOldPassword')}
            />
          </View>

          <View style={{ alignItems: 'center' }}>
            <DrawerItem
              label="Logout"
              style={{ fontSize: 90 }}
              labelStyle={{ fontSize: 20, fontFamily: font.regular }}
              onPress={() => navigation.navigate('LogOut')}
            // logout(() => {
            //   console.log("LOGOUT CALLED")
            //   props.showAlert('Logging out');
            //   // console.log('nav -->', props.navigation);
            //   props.toggleAuth('');
            //   navigation.navigate('AuthFlow', { screen: 'AlreadyVerified' });
            //   // props.logout();
            // })
            />
          </View>
        </View>
      </Drawer.Section>
    </View>
  );
};

const mapStateToProps = (state) => {
  // console.log('auth -->', state.auth);
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAuth: (data) => dispatch(toggleAuthActionCreator(data)),
    showAlert: (message) => dispatch(onSnackbar(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

const styles = StyleSheet.create({
  drawerContent: {
    // padding: 20
  },
  userInfoSection: {
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomColor: '#00000029',
    borderBottomWidth: 1,
    marginTop: 50,
    height: 100,
    marginBottom: 50,
  },
  avatar: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  username: {
    fontFamily: theme.font.bold,
    fontSize: 16,
  },
  bottomDrawerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  socialItem: {
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    // paddingTop: Constants.statusBarHeight,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },

  collapsible: {
    alignContent: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
});
