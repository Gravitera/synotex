/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Dimensions, SafeAreaView, Image } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Button from '../Button'
const { height, width } = Dimensions.get("window");
import { color, font } from '../../../theme'

const AuthLayout = (props) => {
  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      {/* <SafeAreaView> */}
      <ScrollView style={{
        height,
        width,
        backgroundColor: color.primary,
        flexDirection: 'column'
      }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <View
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}> */}
        <View style={styles.body}>
          {/* <View style={styles.imageWrapper} >
              <Image source={require("../../assets/images/signin.png")} />
            </View> */}
          <View>
            <Text style={styles.heading}>
              {props.heading}
            </Text>
            <Text style={styles.text}>
              {props.text}
            </Text>
          </View>
          <View style={styles.inputWrapper}>
            {props.children}
          </View>
          <View style={styles.buttonWrapper} >
            <Button loading={props.loading} onPress={props.onPress} label={props.buttonLabel} />
            {
              props.canCancel
                ? <Button onPress={props.onCancel} label={'Cancel'} mode="text" />
                : null
            }
          </View>
          {props.onAuthToggle ?
            <View style={props.page == 'Signup' ? { ...styles.clickWrapper, marginTop: 13 } : styles.clickWrapper} >
              <Text style={styles.clickText} >
                {props.clickText}
              </Text>

              <Text style={styles.clickTextBold} onPress={() => props.onAuthToggle()} >
                {"CLICK HERE"}
              </Text>
            </View>
            : <View style={{ height: 30 }}>
            </View>}
        </View>
        {/* </View> */}
      </ScrollView>
      {/* </SafeAreaView> */}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: height
  },
  body: {
    backgroundColor: Colors.white,
    alignItems: "center",
    paddingHorizontal: 20,
    width: 460,
    borderRadius: 7,
    alignSelf: 'center'
  },
  imageWrapper: {
    marginTop: 30
  },
  inputWrapper: {
    flexDirection: "column"
  },
  heading: {
    fontSize: 30,
    marginTop: 39,
    color: "black",
    textAlign: "center",
    width: 280,
    fontFamily: font.thin
  },
  buttonWrapper: {
    marginTop: 25
  },
  text: {
    fontSize: 18,
    marginBottom: 30,
    marginTop: 20,
    color: color.dark,
    textAlign: "center",
    width: 280,
    fontFamily: font.thin
  },
  clickWrapper: {
    flexDirection: "row",
    width: 280,
    marginTop: 20,
    paddingBottom: 20
  },
  clickText: {
    fontFamily: font.thin,
    fontSize: 13,
    color: color.primary
  },
  clickTextBold: {
    fontSize: 13,
    color: color.primary,
    fontFamily: font.bold
  }
});

export default AuthLayout;
