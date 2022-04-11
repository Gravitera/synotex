import React, { useState, useEffect } from 'react';
import InputFeaturesView from './view';
import { validateEmail, setStorageItem, getStorageItem } from '../../../utils';
import { login } from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import { onSnackbar } from '../../../store/actions/layoutActions';
import { StackActions, useNavigation } from '@react-navigation/core';
import { BackHandler } from 'react-native';

const InputFeatures = (props) => {

  // console.log("LOGIN PROPS", props)

  const navigation = useNavigation()
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm')
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kilogram')
  const [shoeSize, setShoeSize] = useState('')
  const [shoeSizeUnit, setShoeSizeUnit] = useState('mm')
  const [gender, setGender] = useState('Male')
  const [ageError, setAgeError] = useState({ error: false, message: '' });
  const [heightError, setHeightError] = useState({ error: false, message: '' });

  const onChange = (data) => {
    const { text, name } = data;
    // console.log(data)
    if (name === 'age') {
      setAge(text);
    } else if (name === 'height') {
      setHeight(text);
    } else if (name === 'weight') {
      setWeight(text);
    } else if (name === 'shoe size') {
      setShoeSize(text)
    } else if (name === 'gender') {
      setGender(text);
    }
  };

  const onBlur = (name) => {
    // console.log('name in blur');
    if (name === 'age') {
      if (age.length <= 0) {
        setAgeError({
          error: true,
          message: 'Age cannot be empty',
        });
      } else {
        setAgeError({ error: false, message: '' });
      }
    } else if (name === 'height') {
      if (height.length <= 0) {
        setHeightError({
          error: true,
          message: 'Height cannot be empty',
        });
      } else {
        setHeightError({ error: false, message: '' });
      }
    }
  };

  const onNext = () => {
    console.log(age, height, heightUnit, weight, weightUnit, shoeSize, shoeSizeUnit, gender);
    let scannerProps = {
      "Precision": true,
      "Age": parseInt(age),
      "Height": parseInt(height),
      "HeightUnit": heightUnit,
      "Weight": isNaN(parseInt(weight)) ? 0 : parseInt(weight),
      "WeightUnit": weightUnit,
      "Shoesize": isNaN(parseInt(shoeSize)) ? 0 : parseInt(shoeSize),
      "ShoesizeUnit": shoeSizeUnit,
      "Gender": gender
    };

    if (scannerProps.Weight == 0 || scannerProps.Weight == "0") {
      scannerProps.Precision = false;
    }


    console.log("scanner props", scannerProps)

    if (!age || ageError.error || !height || heightError.error) {
      props.showAlert("필수입력값을 확인해 주세요")
    }
    else {
      setAge('');
      setHeight('');
      setHeightUnit('cm')
      setWeight('');
      setWeightUnit('kilogram')
      setShoeSize('')
      setShoeSizeUnit('mm')
      setGender('Male')
      console.log(" =========== scanner props   ", scannerProps);
      props.navigation.navigate("scanner", scannerProps)
    }
  }

  const toHome = () => {
    props.navigation.navigate("intro", props);
  }

  const toBrandstory = () => {
    props.navigation.navigate("Brandstory", props);
  }

  const toSynotexmall = () => {
    props.navigation.navigate("Store", props);
  }

  const toOfflinestore = () => {
    props.navigation.navigate("OfflineStore", props);
  }

  const toExit = () => {
    BackHandler.exitApp();
  }



  const viewProps = {
    age,
    height,
    weight,
    shoeSize,
    ageError,
    heightError,
    gender,
    heightUnit,
    weightUnit,
    shoeSizeUnit,
    setGender,
    setWeightUnit,
    setShoeSizeUnit,
    setHeightUnit,
    onChange,
    onBlur,
    onNext,
    toHome,
    toBrandstory,
    toSynotexmall,
    toOfflinestore,
    toExit
  };

  return <InputFeaturesView {...viewProps} />;
};

const mapStateToProps = (state) => {
  console.log("state", state)
  return {
    open: state.layoutReducer.snackbarState,
    message: state.layoutReducer.snackbarMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // toggleAuth: (data) => dispatch(toggleAuthActionCreator(data)),
    showAlert: (message) => dispatch(onSnackbar(message)),
    login: (LOGIN_DATA, Sucess, Error) => dispatch(login(LOGIN_DATA, Sucess, Error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputFeatures);