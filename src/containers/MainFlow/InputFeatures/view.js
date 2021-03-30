import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import AuthLayout from '../../../components/AuthLayout';
import Input from '../../../components/TextInput';
import theme, { color, font } from '../../../../theme';
import { CustomBackForwardButtonHeader } from '../../../components/Header';
import { useNavigation } from '@react-navigation/core';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { Dimensions } from 'react-native';
import { Touchable } from 'react-native';
import { TouchableOpacity, ImageBackground, TouchableNativeFeedback } from 'react-native';
import { ceil } from 'react-native-reanimated';
import Button from '../../../components/Button';
import { Image } from 'react-native';
import { Keyboard, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { BackHandler } from 'react-native';
import { Linking } from 'react-native';

import { SafeAreaView, StatusBar } from "react-native";
import { Fragment } from 'react';

const { width, height } = Dimensions.get("window")


const InputFeaturesView = (props) => {
  const navigation = useNavigation()

  
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [currheight, setcurrheight] = useState(0);
  const [currheightlen, setcurrheightlen] = useState(0);
  const [currage, setcurrage] = useState(0);
  const [curragelen, setcurragelen] = useState(0);
  const [currgender, setcurrgender] = useState("None");
  const [buttonclicked, setbuttonclicked] = useState(false);

  const maleClick = () => {
    if (male == false && female == true){
      setMale(true);
      setFemale(false);
      setcurrgender("Male");
      props.setGender("Male");
    }
    if (male == true && female == false){
      setMale(false);
      setcurrgender("None");
      props.setGender("None");
    }
    if (male == false && female == false){
      setMale(true);
      setcurrgender("Male");
      props.setGender("Male");
    }

  };

  const femaleClick = () => {
    if (female == false && male == true){
      setFemale(true);
      setMale(false);
      setcurrgender("Female");
      props.setGender("Female");
    }
    if (female == true && male == false){
      setFemale(false);
      setcurrgender("None");
      props.setGender("None");
    }
    if (female == false && male == false){
      setFemale(true);
      setcurrgender("Female");
      props.setGender("Female");
    }
  }

  const onChange2 = (data) => {
    props.onChange(data);
    const { text, name } = data;
    // console.log(data)
    if (name === 'age') {
      var curr_age = parseInt(text);
      setcurrage(curr_age);
      console.log(" ========== age length " , `${curr_age}`.length);
      if (`${curr_age}`.length == 1){
        setcurragelen(1);
      }
      if (`${curr_age}`.length == 2){
        setcurragelen(1);
      }
    } else if (name === 'height') {
      var curr_height = parseInt(text);
      setcurrheight(curr_height);
      console.log(" ========== height length " , `${curr_height}`.length);
      if (`${curr_height}`.length == 2){
        setcurrheightlen(2);
      }
      if (`${curr_height}`.length == 3){
        setcurrheightlen(3);
      }
    };
  };

  const male_kor = "남자";
  const female_kor = "여자";
  const none_kor = "무입력";

  const screentouched = () => {
    setbuttonclicked(false);
  }

  const setbuttonclickedfunc = () => {
    Keyboard.dismiss();
    var heightstatus = true;
    if (currheight == 0 || currheight == "0"){
      heightstatus = false;
    }
    var agestatus = true;
    if (!currage || currage == undefined || currage == ''){
      agestatus = false;
    }

    if (heightstatus && agestatus){
      setbuttonclicked(true);
    }else{
      alert("필수입력값을 확인해 주세요");
    }
  }
  
  const backbuttonhandler = () => {
    navigation.navigate("intro2");
  }

  BackHandler.addEventListener("hardwareBackPress", backbuttonhandler);
  


  return (
    <>
      <Fragment>
          <SafeAreaView style={{ flex: 0, backgroundColor: "#0D3A71" }} />
          <StatusBar barStyle="light-content" />

          <SafeAreaView style={{ flex: 1, backgroundColor: "#0D3A71" }}>
  


                  <TouchableNativeFeedback onPress={() => screentouched()}>
                  <View style={styles.container} onResponderGrant = { () => screentouched() }>
                    <CustomBackForwardButtonHeader title={'입력 정보'} backFunction={() => {navigation.navigate("intro")}} forwardFunction={props.onNext} />
                    <ScrollView style={{ flex: 1, marginTop: 64, paddingTop: 24 }}>
                      <Text style={styles.heading}></Text>

                      <Image resizeMode="contain" source={require("./../../../assets/images/inputfeaturestop.png")} style={{marginLeft: "-9.25%", marginTop:"1%", width: "120%"}}></Image>
                      <View style={{marginTop:"12%"}}>

                      </View>
                      <View style={styles.inputBox}>

                        <Text style="label">나이 (필수)</Text>
                        <TextInput
                          style={styles.field}
                          label="Age"
                          errorText={props.ageError.message}
                          error={props.ageError.error}
                          onBlur={props.onBlur}
                          value={props.age}
                          onChangeText={text => onChange2({ text, name: "age" })}
                          keyboardType="numeric"
                        />
                        <View style={{ ...styles.nestedFields, borderTopColor: theme.color.secondary, borderTopWidth: 1, paddingTop: 18 }}>
                        <View style={styles.leftField}>

                          <Text style="label">신장 (필수)</Text>
                          <TextInput
                            // style={{width: '100%'}}
                            label="Height"
                            error={props.heightError.error}
                            errorText={props.heightError.message}
                            onBlur={props.onBlur}
                            value={props.height}
                            onChangeText={text => onChange2({ text, name: "height" })}
                            keyboardType="numeric"
                          />
                          </View>
                          {/*<View style={styles.leftField}>

                            <Text style="label">신장 (필수)</Text>
                            <TextInput
                              // style={{width: '100%'}}
                              label="Height"
                              error={props.heightError.error}
                              errorText={props.heightError.message}
                              onBlur={props.onBlur}
                              value={props.height}
                              onChangeText={text => props.onChange({ text, name: "height" })}
                              keyboardType="numeric"
                            />
                          </View>*/}
                          {/*
                          <View style={styles.rightField}>
                            <Picker
                              selectedValue={props.heightUnit}
                              style={{ borderBottomColor: theme.color.secondary, borderBottomWidth: 1 ,height: 44} } itemStyle={{height: 44}}
                              onValueChange={(itemValue, itemIndex) =>
                                props.setHeightUnit(itemValue)
                              }
                            >
                              <Picker.Item label="cm" value="cm" color='#757575' />
                              <Picker.Item label="feet" value="feet" color='#757575' />
                            </Picker>
                          </View>
                          */}
                        </View>
                      </View>

                      <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/member/privacy.html")} style={{}}>
                        <Text style={styles.heading}>개인정보 보호방침 보러가기</Text>
                      </TouchableOpacity>
                      {/*<Text style={styles.heading}>더 정확한 측정을 원하신다면 아래사항을 입력하여 주세요.</Text>*/}



                      {/*<View style={{ ...styles.inputBox, marginBottom: 86 }}>


                        <View style={styles.nestedFields}>
                          <View style={styles.leftField}>
                            <Text style="label">몸무게 (필수)</Text>
                            <TextInput
                              label="Weight"
                              value={props.weight}
                              onChangeText={text => props.onChange({ text, name: "weight" })}
                              keyboardType="numeric"
                            />
                          </View>
                          <View style={styles.rightField}>
                            <Picker
                              selectedValue={props.weightUnit}
                              style={{ borderBottomColor: theme.color.secondary, borderBottomWidth: 1 ,height: 44} } itemStyle={{height: 44}}
                              onValueChange={(itemValue, itemIndex) =>
                                props.setWeightUnit(itemValue)
                              }
                            >
                              <Picker.Item label="kg" value="kilogram" color='#757575' />
                              <Picker.Item label="lbs" value="pounds" color='#757575' />
                            </Picker>
                          </View>
                        </View>

                        <View style={{ ...styles.nestedFields, borderTopColor: theme.color.secondary, borderTopWidth: 1, paddingTop: 18 }}>
                          <View style={styles.leftField}>

                            <Text style="label">신발 사이즈 (필수)</Text>
                            <TextInput
                              label="Shoe Size"
                              value={props.shoeSize}
                              onChangeText={text => props.onChange({ text, name: "shoe size" })}
                              keyboardType="numeric"
                            />
                          </View>
                          <View style={styles.rightField}>
                            <Picker
                              selectedValue={props.shoeSizeUnit}
                              style={{ borderBottomColor: theme.color.secondary, borderBottomWidth: 1 ,height: 44} } itemStyle={{height: 44}}
                              onValueChange={(itemValue, itemIndex) =>
                                props.setShoeSizeUnit(itemValue)
                              }
                            >
                              <Picker.Item label="mm" value="mm" color='#757575' />
                              <Picker.Item label="US" value="US" color='#757575' />
                              <Picker.Item label="EU" value="EU" color='#757575' />
                            </Picker>
                          </View>
                        </View>
                      </View>*/}


                    </ScrollView>
                    <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>

                      {/*<Button style={{ width: '100%' }} onPress={props.onNext} label="측정 시작하기" />*/}
                      <Button style={{ width: '100%' }} onPress={props.onNext} label="측정 시작하기" />
                    </View>
                  </View>
                  </TouchableNativeFeedback>

          </SafeAreaView>

      </Fragment>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.bgLight,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  heading: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 30,
    fontSize: 12,
    marginBottom: 10
  },
  field: {
    // backgroundColor: 'red',
    width: width - 100,
    // borderBottomColor: theme.color.secondary,
    // borderBottomWidth: 1
  },
  label: {
    textAlign: 'left'
  },
  nestedFields: {
    width: width - 100,
    flexDirection: 'row',
    // borderBottomColor: theme.color.secondary,
    // borderBottomWidth: 1,
    alignItems: 'flex-end'
  },
  leftField: {
    flex: 1,
    marginRight: 20,
  },
  rightField: {
    width: 100,

  },
  headerText: {
    fontSize: 16,
    color: '#4595C4',
    fontWeight: 'bold',
    marginBottom: 30
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    width: width - 60,
  },
  inputBox: {
    backgroundColor: theme.color.light,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    elevation: 5,
    marginHorizontal: 30
  }
});

export default InputFeaturesView;