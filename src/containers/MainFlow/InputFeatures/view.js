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
import { TouchableOpacity, ImageBackground } from 'react-native';
import { ceil } from 'react-native-reanimated';
import Button from '../../../components/Button';
import { Image } from 'react-native';
const { width, height } = Dimensions.get("window")


const InputFeaturesView = (props) => {
  const navigation = useNavigation()

  const gender = '녀';
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);

  const maleClick = () => {
    setMale(true);
    setFemale(false);
    props.setGender("Male");
  };

  const femaleClick = () => {
    setMale(false);
    setFemale(true);
    props.setGender("Female");
  }



  return (
    <>
      <View style={styles.container}>
        <CustomBackForwardButtonHeader title={'입력 정보'} backFunction={navigation.goBack} forwardFunction={props.onNext} />
        <ScrollView style={{ flex: 1, marginTop: 64, paddingTop: 24 }}>
          <Text style={styles.heading}></Text>
          {male == false && female == false ?
          <View style={{justifyContent: "center", alignItems: 'center', width: width*1.155}}>
          <View style={{ width: width, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 20}}>
              <TouchableOpacity style={{ width: '50%' }} onPress={maleClick}>
                <ImageBackground style={{ width: (width - 40) / 2.5, height: (width - 40) / 2.5}} resizeMode="contain" source={require(`./../../../assets/images/male.png`)} >
                  <Text  style={{marginLeft: width*0.15, marginTop:width*0.26, fontWeight:"bold", color: "white"}} >남성</Text>
                </ImageBackground>
                {/*<Text style={{ color: props.gender === "Male" ? 'white' : "#000", textDecorationLine: props.gender === 'Male' ? "underline" : 'none', textAlign: 'center', marginTop: -46, fontWeight: 'bold' }}>남성</Text>*/}
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '50%' }} onPress={femaleClick}>
                <ImageBackground style={{ width: (width - 40) / 2.5, height: (width - 40) / 2.5}} resizeMode="contain" source={require(`./../../../assets/images/female.png`)} >
                <Text style={{marginLeft: width*0.15, marginTop: width*0.26,fontWeight:"bold", color: "white"}}>여성</Text>
                </ImageBackground>
                {/*<Text style={{ color: props.gender === 'Female' ? "#fff" : '#000', textDecorationLine: props.gender === 'Female' ? "underline" : 'none', marginTop: -46, textAlign: 'center', fontWeight: 'bold' }}>여성</Text>*/}
              </TouchableOpacity>
          </View>
          </View>
          :
          null }
          {male == true && female == false ?
          <View style={{justifyContent: "center", alignItems: 'center', width: width*1.155}}>
          <View style={{ width: width, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 20}}>
              <TouchableOpacity style={{ width: '50%' }} onPress={maleClick}>
                <ImageBackground style={{ width: (width - 40) / 2.5, height: (width - 40) / 2.5}} resizeMode="contain" source={require(`./../../../assets/images/male_clicked.png`)} >
                <Text style={{marginLeft: width*0.15, marginTop:width*0.26, fontWeight:"bold", color: "white"}}>남성</Text>
                </ImageBackground>
                {/*<Text style={{ color: props.gender === "Male" ? 'white' : "#000", textDecorationLine: props.gender === 'Male' ? "underline" : 'none', textAlign: 'center', marginTop: -46, fontWeight: 'bold' }}>남성</Text>*/}
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '50%' }} onPress={femaleClick}>
                <ImageBackground style={{ width: (width - 40) / 2.5, height: (width - 40) / 2.5}} resizeMode="contain" source={require(`./../../../assets/images/female.png`)} >
                <Text style={{marginLeft: width*0.15, marginTop: width*0.26,fontWeight:"bold", color: "white"}}>여성</Text>
                </ImageBackground>
                {/*<Text style={{ color: props.gender === 'Female' ? "#fff" : '#000', textDecorationLine: props.gender === 'Female' ? "underline" : 'none', marginTop: -46, textAlign: 'center', fontWeight: 'bold' }}>여성</Text>*/}
              </TouchableOpacity>
          </View>
          </View>
          :
          null }
          {male == false && female == true ?
          <View style={{justifyContent: "center", alignItems: 'center', width: width*1.155}}>
          <View style={{ width: width, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 20}}>
              <TouchableOpacity style={{ width: '50%' }} onPress={maleClick}>
                <ImageBackground style={{ width: (width - 40) / 2.5, height: (width - 40) / 2.5}} resizeMode="contain" source={require(`./../../../assets/images/male.png`)} >
                <Text  style={{marginLeft: width*0.15, marginTop:width*0.26, fontWeight:"bold", color: "white"}}>남성</Text>
                </ImageBackground>
                {/*<Text style={{ color: props.gender === "Male" ? 'white' : "#000", textDecorationLine: props.gender === 'Male' ? "underline" : 'none', textAlign: 'center', marginTop: -46, fontWeight: 'bold' }}>남성</Text>*/}
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '50%' }} onPress={femaleClick}>
                <ImageBackground style={{ width: (width - 40) / 2.5, height: (width - 40) / 2.5}} resizeMode="contain" source={require(`./../../../assets/images/female_clicked.png`)} >
                <Text style={{marginLeft: width*0.15, marginTop: width*0.26,fontWeight:"bold", color: "white"}}>여성</Text>
                </ImageBackground>
                {/*<Text style={{ color: props.gender === 'Female' ? "#fff" : '#000', textDecorationLine: props.gender === 'Female' ? "underline" : 'none', marginTop: -46, textAlign: 'center', fontWeight: 'bold' }}>여성</Text>*/}
              </TouchableOpacity>
          </View>
          </View>
          :
          null }


          <View style={styles.inputBox}>

            <Text style="label">나이 (필수)</Text>
            <TextInput
              style={styles.field}
              label="Age"
              errorText={props.ageError.message}
              error={props.ageError.error}
              onBlur={props.onBlur}
              value={props.age}
              onChangeText={text => props.onChange({ text, name: "age" })}
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
                  onChangeText={text => props.onChange({ text, name: "height" })}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.rightField}>
                <Picker
                  selectedValue={props.heightUnit}
                  style={{ borderBottomColor: theme.color.secondary, borderBottomWidth: 1 }}
                  onValueChange={(itemValue, itemIndex) =>
                    props.setHeightUnit(itemValue)
                  }
                >
                  <Picker.Item label="cm" value="cm" color='#757575' />
                  <Picker.Item label="feet" value="feet" color='#757575' />
                </Picker>
              </View>
            </View>
          </View>

          <Text style={styles.heading}>더 정확한 측정을 원하신다면 아래사항을 입력하여 주세요.</Text>

          <View style={{ ...styles.inputBox, marginBottom: 86 }}>


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
                  style={{ borderBottomColor: theme.color.secondary, borderBottomWidth: 1 }}
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
                  style={{ borderBottomColor: theme.color.secondary, borderBottomWidth: 1 }}
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
          </View>


        </ScrollView>
        <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>

          <Button style={{ width: '100%' }} onPress={props.onNext} label="측정 시작하기" />
        </View>
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