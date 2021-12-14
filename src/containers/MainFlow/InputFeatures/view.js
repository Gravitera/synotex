import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
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
  const [initialage, setInitialage] = useState(30);
  const [initialheight, setInitialheight] = useState(175);

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

  const onFocusage = () => {
    this.setInitialage('');
  }
  const onFocusheight = () => {
    this.setInitialheight('');
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
    {width < 1500?
      <View style={{width: width, height: height, backgroundColor: theme.color.bgLight}}>
        <CustomBackForwardButtonHeader title={'입력 정보'} backFunction={() => {navigation.navigate("intro")}} forwardFunction={props.onNext} />
        <ScrollView style={{ flex: 1, marginTop: 64, paddingTop: 0 }}>
          
          <View style={{backgroundColor: "#0D3A71", width: width, height: height*0.2, flexDirection: "row", alignItems:"center", justifyContent: "center"}}>

            <View style={{width: width*0.4, height: height*0.2}}>
              <ImageBackground resizeMode="contain" style={{width: width*0.4, height: height*0.2}} source={require("./../../../assets/images/input_privacy_notice.png")}>
                <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/member/privacy.html")} style={{width: width*0.35, height: height*0.05, marginTop: "55%"}}/>
              </ImageBackground>
            </View>

            <View style={{width: width*0.1}}/>

            <Image resizeMode="contain" style={{width: width*0.2,  height: height*0.2}} source={require("./../../../assets/images/input_privacy_logo.png")}>
            </Image>

          </View>

          <View style={{height: height*0.1}}/>

          <View style={{flexDirection: "column", alignItems: "center", justifyContent:"center"}}>
            <View style={{width: width*0.8, height: height*0.1, borderRadius: 30, backgroundColor: "white", shadowColor: "#000", shadowOffset: {width: 3,height: 3}, shadowOpacity: 0.25, shadowRadius: 4.65, elevation: 5,}}>
                <View style={{ height: "100%", width: width*0.2, alignItems:"center", position: "absolute", flexDirection:"column", justifyContent:"center"}}>
                  <View style={{height: "33%"}}/>
                  <Text style={{fontSize: 15, fontWeight: "bold", color: "black", height: "33%"}}>나이 (필수)</Text>
                  <View style={{height: "33%"}}/>
                </View>
                <TextInput
                  label="Age"
                  errorText={props.ageError.message}
                  error={props.ageError.error}
                  onBlur={props.onBlur}
                  value={props.age}
                  onChangeText={text => onChange2({ text, name: "age" })}
                  keyboardType="numeric"
                  placeholder="예시: 30"
                  placeholderTextColor="grey"
                  style={{fontSize: 15, position: "absolute", height: "100%", right: "5%"}}
                />
            </View>

            <View style={{height: height*0.05}}/>

            <View style={{width: width*0.8, height: height*0.1, borderRadius: 30, backgroundColor: "white", shadowColor: "#000", shadowOffset: {width: 3,height: 3}, shadowOpacity: 0.25, shadowRadius: 4.65, elevation: 5,}}>
                <View style={{ height: "100%", width: width*0.2, alignItems:"center", position: "absolute", flexDirection:"column", justifyContent:"center"}}>
                  <View style={{height: "33%"}}/>
                  <Text style={{fontSize: 15, fontWeight: "bold", color: "black", height: "33%"}}>신장 (필수)</Text>
                  <View style={{height: "33%"}}/>
                </View>
                <TextInput
                  // style={{width: '100%'}}
                  label="Height"
                  error={props.heightError.error}
                  errorText={props.heightError.message}
                  onBlur={props.onBlur}
                  value={props.height}
                  onChangeText={text => onChange2({ text, name: "height" })}
                  keyboardType="numeric"
                  placeholder="예시: 175"
                  placeholderTextColor="grey"
                  style={{fontSize: 15, position: "absolute", height: "100%", right: "5%"}}
                />
            </View>
            <View style={{height: height*0.05}}/>

          </View>


        </ScrollView>

        <View style={{ position: 'absolute', bottom: height*0.08, width: '100%' }}>

          <Button style={{ width: '100%' }} onPress={props.onNext} label="측정 시작하기" />
        </View>

      </View>



      :
      <View style={{width: width, height: height, backgroundColor: theme.color.bgLight}}>
        <CustomBackForwardButtonHeader title={'입력 정보'} backFunction={() => {navigation.navigate("intro")}} forwardFunction={props.onNext} />
        <ScrollView style={{ flex: 1, marginTop: 64, paddingTop: 0 }}>
          
          <View style={{backgroundColor: "#0D3A71", width: width, height: height*0.2, flexDirection: "row", alignItems:"center", justifyContent: "center"}}>

            <View style={{width: width*0.4, height: height*0.2}}>
              <ImageBackground resizeMode="contain" style={{width: width*0.4, height: height*0.2}} source={require("./../../../assets/images/input_privacy_notice.png")}>
                <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/member/privacy.html")} style={{width: width*0.35, height: height*0.05, marginTop: "45%"}}/>
              </ImageBackground>
            </View>

            <View style={{width: width*0.1}}/>

            <Image resizeMode="contain" style={{width: width*0.2,  height: height*0.2}} source={require("./../../../assets/images/input_privacy_logo.png")}>
            </Image>

          </View>

          <View style={{height: height*0.1}}/>

          <View style={{flexDirection: "column", alignItems: "center", justifyContent:"center"}}>
            <View style={{width: width*0.8, height: height*0.1, borderRadius: 30, backgroundColor: "white", shadowColor: "#000", shadowOffset: {width: 3,height: 3}, shadowOpacity: 0.25, shadowRadius: 4.65, elevation: 5,}}>
                <View style={{ height: "100%", width: width*0.2, alignItems:"center", position: "absolute", flexDirection:"column", justifyContent:"center"}}>
                  <View style={{height: "33%"}}/>
                  <Text style={{fontSize: 15, fontWeight: "bold", color: "black", height: "33%"}}>나이 (필수)</Text>
                  <View style={{height: "33%"}}/>
                </View>
                <TextInput
                  label="Age"
                  errorText={props.ageError.message}
                  error={props.ageError.error}
                  onBlur={props.onBlur}
                  value={props.age}
                  onChangeText={text => onChange2({ text, name: "age" })}
                  keyboardType="numeric"
                  placeholder="예시: 30"
                  placeholderTextColor="grey"
                  style={{fontSize: 15, position: "absolute", height: "100%", right: "5%"}}
                />
            </View>

            <View style={{height: height*0.05}}/>

            <View style={{width: width*0.8, height: height*0.1, borderRadius: 30, backgroundColor: "white", shadowColor: "#000", shadowOffset: {width: 3,height: 3}, shadowOpacity: 0.25, shadowRadius: 4.65, elevation: 5,}}>
                <View style={{ height: "100%", width: width*0.2, alignItems:"center", position: "absolute", flexDirection:"column", justifyContent:"center"}}>
                  <View style={{height: "33%"}}/>
                  <Text style={{fontSize: 15, fontWeight: "bold", color: "black", height: "33%"}}>신장 (필수)</Text>
                  <View style={{height: "33%"}}/>
                </View>
                <TextInput
                  // style={{width: '100%'}}
                  label="Height"
                  error={props.heightError.error}
                  errorText={props.heightError.message}
                  onBlur={props.onBlur}
                  value={props.height}
                  onChangeText={text => onChange2({ text, name: "height" })}
                  keyboardType="numeric"
                  placeholder="예시: 175"
                  placeholderTextColor="grey"
                  style={{fontSize: 15, position: "absolute", height: "100%", right: "5%"}}
                />
            </View>
            <View style={{height: height*0.05}}/>

          </View>


        </ScrollView>

        <View style={{ position: 'absolute', top: height*0.825, width: '100%', height:height*0.08}}>

          <Button style={{ width: '100%' }} onPress={props.onNext} label="측정 시작하기" />
        </View>

      </View>
      }
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
    paddingTop: 50,
    paddingBottom: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    width: width*0.85,
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    elevation: 5,
    marginHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'space-between'

  },
  inputBox2: {
    backgroundColor: theme.color.light,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 50,
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
    marginHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'space-between'
  }
});

export default InputFeaturesView;