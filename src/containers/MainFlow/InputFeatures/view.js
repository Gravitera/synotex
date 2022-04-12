import React, { useEffect, useState } from 'react';
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

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get("window")


const InputFeaturesView = (props) => {
  const navigation = useNavigation()

  console.log(" ====== width,  height    ", width, "    ", height);
  
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

  const [privacylink, setPrivacylink] = useState("");

  useEffect(() => {
    fetch("https://a96d26d9839f933f1.awsglobalaccelerator.com/privacylink", {
      mode: 'no-cors',
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
      },

    }).then((res) => res.json())
      .then((resdata) => {
          setPrivacylink(resdata.privacylink);
  }).catch((err) => {
      setPrivacylink(resdata.privacylink);
  })
  }, []);

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
    navigation.navigate("intro");
  }

  BackHandler.addEventListener("hardwareBackPress", () => {backbuttonhandler});
  


  return (
    <>


      <View style={{width: wp("100%"), height: hp("90%"), backgroundColor: "white"}}>


          <View style={{width: wp("100%"), height: hp("8%"), backgroundColor: "#F2F4FA", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              <TouchableOpacity onPress={() => navigation.navigate("intro")}>
                  <Image resizeMode="contain" style={{width: hp("3%"),  height: hp("3%"), marginLeft: 15}} source={require("./../../../assets/images/newdesign/left_arrow.png")}/>
              </TouchableOpacity>
              <Image resizeMode="contain" style={{ width: hp("11%"),  height: hp("8%"), marginLeft: -15}} source={require("./../../../assets/images/newdesign/inputfeature_header_text.png")}/>
              <View style={{width: hp("3%"), height: hp("3%")}}></View>
          </View>

          <View style={{width: wp("100%"), height: hp("82%"), flexDirection: "row", alignItems:"center"}}>
              <View style={{width: wp("5%"), height: hp("82%")}}></View>
              <View style={{ width: wp("90%"), height: hp("82%")}}>
                  <View style={{ width: wp("90%"), height: hp("3%")}}></View>
                  <Image resizeMode="contain" style={{width: hp("20%"),  height: hp("5%")}} source={require("./../../../assets/images/newdesign/inputfeature_top_text.png")}/>
                  <View style={{width: wp("90%"), height: hp("2%")}}></View>
                  
                  <Image resizeMode="contain" style={{width: wp("12%"),  height: hp("2%")}} source={require("./../../../assets/images/newdesign/inputfeature_age.png")}/>
                  <View style={{width: wp("90%"), height: hp("1%")}}></View>
                  
                  <View style={{width: wp("90%"), height: hp("9%"), borderRadius: 50, borderColor: "#0380D8", borderWidth: 2}}>
                        <View style={{marginTop: 2, height: "100%", width: wp("20%"), alignItems:"center", position: "absolute", flexDirection:"column", justifyContent:"center"}}>
                            <View style={{height: "33%"}}/>
                            <Text style={{fontSize: 12, fontWeight: "bold", color: "black", height: "33%"}}>나이 (필수)</Text>
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
                  
                  {/*<ImageBackground resizeMode="contain" style={{ width: wp("90%"),  height: hp("9%")}} source={require("./../../../assets/images/newdesign/inputfeature_age_field.png")}>
                      <View style={{marginTop: 2, height: "100%", width: wp("20%"), alignItems:"center", position: "absolute", flexDirection:"column", justifyContent:"center"}}>
                          <View style={{height: "33%"}}/>
                          <Text style={{fontSize: 12, fontWeight: "bold", color: "black", height: "33%"}}>나이 (필수)</Text>
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
                  </ImageBackground>*/}
                  
                  <View style={{width: wp("90%"), height: hp("2%")}}></View>

                  <Image resizeMode="contain" style={{ width: wp("12%"),  height: hp("2%")}} source={require("./../../../assets/images/newdesign/inputfeature_height.png")}/>
                  <View style={{width: wp("90%"), height: hp("1%")}}></View>

                  <View style={{width: wp("90%"), height: hp("9%"), borderRadius: 50, borderColor: "#0380D8", borderWidth: 2}}>
                      <View style={{marginTop: 2, height: "100%", width: wp("20%"), alignItems:"center", position: "absolute", flexDirection:"column", justifyContent:"center"}}>
                          <View style={{height: "33%"}}/>
                          <Text style={{fontSize: 12, fontWeight: "bold", color: "black", height: "33%"}}>신장 (필수)</Text>
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
                  
                  {/*<ImageBackground resizeMode="contain" style={{width: wp("90%"),  height: hp("9%")}} source={require("./../../../assets/images/newdesign/inputfeature_age_field.png")}>
                      <View style={{marginTop: 2, height: "100%", width: wp("20%"), alignItems:"center", position: "absolute", flexDirection:"column", justifyContent:"center"}}>
                          <View style={{height: "33%"}}/>
                          <Text style={{fontSize: 12, fontWeight: "bold", color: "black", height: "33%"}}>신장 (필수)</Text>
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
                  
                  </ImageBackground>*/}

                  <View style={{width: wp("90%"), height: hp("2%")}}></View>

                  <TouchableOpacity onPress={props.onNext}>
                      <ImageBackground resizeMode="contain" style={{ width: wp("90%"),  height: hp("8%")}} source={require("./../../../assets/images/newdesign/next_button_blue.png")}>
                      </ImageBackground>
                  </TouchableOpacity>

                  <View style={{ alignItems:"center", justifyContent: "center", flexDirection: "row", width: wp("90%"), height: hp("10%")}}>
                  <Image resizeMode="contain" style={{width: hp("40%"),  height: hp("10%")}} source={require("./../../../assets/images/newdesign/inputfeature_bottom_text.png")}/>
                  </View>

                  <View style = {{flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", width: wp("90%"), height: hp("20%"), borderWidth: 1, borderRadius: 10, borderColor: "#E2E2E2"}}>
                        <View style={{flexdirection: "column", width: "70%", height: "100%"}}>
                            <Image resizeMode="contain" style={{marginTop: 2, marginLeft: 8, width: hp("30%"),  height: hp("14%")}} source={require("./../../../assets/images/newdesign/inputfeature_bottom_square_text.png")}/>
                            <TouchableOpacity onPress={() => {Linking.openURL(privacylink)}}>
                                <Image resizeMode="contain" style={{marginLeft: 8, width: hp("30%"),  height: hp("5%")}} source={require("./../../../assets/images/newdesign/inputfeature_disclaimer.png")}/>
                            </TouchableOpacity> 
                            
                        </View>
                        <Image resizeMode="contain" style={{ marginTop: 0, width: "30%",  height: "80%"}} source={require("./../../../assets/images/newdesign/inputfeature_logo.png")}/>

                    {/*<View style={{ flexdirection: "column", width: wp("55%"), height: hp("20%")}}>
                            <Image resizeMode="contain" style={{marginTop: 2, marginLeft: 8, width: hp("30%"),  height: hp("14%")}} source={require("./../../../assets/images/newdesign/inputfeature_bottom_square_text.png")}/>
                            <TouchableOpacity onPress={() => {Linking.openURL("http://synotexmall.com/member/privacy.html")}}>
                                <Image resizeMode="contain" style={{marginLeft: 8, width: hp("30%"),  height: hp("5%")}} source={require("./../../../assets/images/newdesign/inputfeature_disclaimer.png")}/>
                            </TouchableOpacity>
                        </View>
                    <Image resizeMode="contain" style={{marginTop: 8, width: hp("19%"),  height: hp("20%")}} source={require("./../../../assets/images/newdesign/inputfeature_logo.png")}/>
                    */}
                  </View>

                  
                  {/*<ImageBackground resizeMode="cover" style={{backgroundColor: "purple", flexDirection: "row", width: wp("90%"),  height: hp("22%")}} source={require("./../../../assets/images/newdesign/inputfeature_bottom_square.png")}>
                      <View style={{ flexdirection: "column", width: wp("55%"), height: hp("20%")}}>
                          <Image resizeMode="contain" style={{marginTop: 2, marginLeft: 8, width: hp("30%"),  height: hp("14%")}} source={require("./../../../assets/images/newdesign/inputfeature_bottom_square_text.png")}/>
                          <TouchableOpacity onPress={() => {Linking.openURL("http://synotexmall.com/member/privacy.html")}}>
                              <Image resizeMode="contain" style={{marginLeft: 8, width: hp("30%"),  height: hp("5%")}} source={require("./../../../assets/images/newdesign/inputfeature_disclaimer.png")}/>
                          </TouchableOpacity>
                      </View>
                      <Image resizeMode="contain" style={{marginTop: 8, width: hp("19%"),  height: hp("20%")}} source={require("./../../../assets/images/newdesign/inputfeature_logo.png")}/>

                  
                  </ImageBackground>*/}
                  

              
              </View>
              <View style={{width: wp("5%"), height: hp("82%")}}></View>
          </View>




      </View>

      {/*
      <View style={{width: width, height: height, backgroundColor: theme.color.bgLight}}>
        <CustomBackForwardButtonHeader title={'입력 정보'} backFunction={() => {navigation.navigate("intro")}} forwardFunction={props.onNext} />
        <ScrollView style={{ flex: 1, marginTop: 64, paddingTop: 0 }}>
          <View style={{backgroundColor: "#0D3A71", width: wp("100%"), height: hp("20%"), flexDirection: "row", alignItems:"center", justifyContent: "center"}}>

            <View style={{width: wp("40%"), height: hp("20%")}}>
              <ImageBackground resizeMode="contain" style={{width: wp("40%"), height: hp("20%")}} source={require("./../../../assets/images/input_privacy_notice.png")}>
                <TouchableOpacity onPress={() => Linking.openURL("http://synotexmall.com/member/privacy.html")} style={{width: wp("35%"), height: hp("5%"), marginTop: "55%"}}/>
              </ImageBackground>
            </View>

            <View style={{width: wp("10%")}}/>

            <Image resizeMode="contain" style={{width: wp("20%"),  height: hp("20%")}} source={require("./../../../assets/images/input_privacy_logo.png")}>
            </Image>

          </View>

          <View style={{height: hp("10%")}}/>

          <View style={{flexDirection: "column", alignItems: "center", justifyContent:"center"}}>
            <View style={{width: wp("80%"), height: hp("10%"), borderRadius: 30, backgroundColor: "white", shadowColor: "#000", shadowOffset: {width: 3,height: 3}, shadowOpacity: 0.25, shadowRadius: 4.65, elevation: 5,}}>
                <View style={{ height: "100%", width: wp("20%"), alignItems:"center", position: "absolute", flexDirection:"column", justifyContent:"center"}}>
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

            <View style={{height: hp("5%")}}/>

            <View style={{width: wp("80%"), height: hp("10%"), borderRadius: 30, backgroundColor: "white", shadowColor: "#000", shadowOffset: {width: 3,height: 3}, shadowOpacity: 0.25, shadowRadius: 4.65, elevation: 5,}}>
                <View style={{ height: "100%", width: wp("20%"), alignItems:"center", position: "absolute", flexDirection:"column", justifyContent:"center"}}>
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
            <View style={{height: hp("5%")}}/>

          </View>
        </ScrollView>

        <View style={{ position: 'absolute', width: wp("100%"), height: hp("9%"), bottom: hp("8%")}}>
          <Button style={{ width: '100%' }} onPress={props.onNext} label="측정 시작하기" />
        </View>

      </View>
      */}

      <View style={{zIndex: 10, position: "absolute", bottom: 0, width: wp("100%"), height: hp("10%"), maxHeight: 80, backgroundColor: "#F2F4FA", flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity onPress={props.toHome} style={{width: wp("20%"), height: "100%", flexDirection: "column", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{width: "100%", height: "10%"}}></View>
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_home_icon.png")} />
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "45%", height: "20%"}}  source={require("./../../../assets/images/newdesign/bottomtab_home_text.png")} />
          <View style={{width: "100%", height: "10%"}}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.toBrandstory} style={{width: wp("20%"), height: "100%", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{width: "100%", height: "10%"}}></View>
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_brandstory_icon.png")} />
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "80%", height: "25%"}}  source={require("./../../../assets/images/newdesign/bottomtab_brandstory_text.png")} />
          <View style={{width: "100%", height: "10%"}}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.toSynotexmall} style={{width: wp("20%"), height: "100%", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{width: "100%", height: "10%"}}></View>
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_store_icon.png")} />
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "45%", height: "20%"}}  source={require("./../../../assets/images/newdesign/bottomtab_store_text.png")} />
          <View style={{width: "100%", height: "10%"}}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.toOfflinestore} style={{width: wp("20%"), height: "100%", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{width: "100%", height: "10%"}}></View>
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_offline_icon.png")} />
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "80%", height: "20%"}}  source={require("./../../../assets/images/newdesign/bottomtab_offline_text.png")} />
          <View style={{width: "100%", height: "10%"}}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.toExit} style={{width: wp("20%"), height: "100%", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{width: "100%", height: "10%"}}></View>
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "35%", height: "35%"}}  source={require("./../../../assets/images/newdesign/bottomtab_exit_icon.png")} />
          <Image resizeMode="contain" style={{resizeMode: "contain", width: "45%", height: "20%"}}  source={require("./../../../assets/images/newdesign/bottomtab_exit_text.png")} />
          <View style={{width: "100%", height: "10%"}}></View>
        </TouchableOpacity>
      </View>


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