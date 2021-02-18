import React, { useState, useEffect } from 'react';
import SigninView from './view';
import { validateEmail, setStorageItem } from '../../../utils';
import { login } from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import { onSnackbar } from '../../../store/actions/layoutActions';
import { StackActions, useNavigation } from '@react-navigation/core';

const Signin = (props) => {
  const [pin, setPin] = useState('')
  const navigation = useNavigation()

  // console.log("SIGNIN PROPS",props)
  const email = props.route.params.logemail
  // const { email } = props.route.params;
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pinError, setPinError] = useState({ error: false, message: '' });
  // const [driverData, setDriverData] = useState()

  // useEffect(() => {
  //   (async () => {
  //     const driver_data = await getStorageItem("UserData")

  //     setDriverData(driver_data)

  //     // props.fetchStudents(driver_data)


  //   })() },   [])

  // console.log("SIGNIN PROPS EMAIL", email)



  // const onChange = (data) => {
  //   const { text, name } = data;
  //   if (name.toLowerCase() === 'email') {
  //     setEmail(text);
  //   } else if (name.toLowerCase() === 'password') {
  //     setPassword(text);
  //   }
  // };

  // const onBlur = (name) => {
  //   console.log('name in blur');
  //   if (name.toLowerCase() === 'email') {
  //     const res = validateEmail(email);
  //     if (!res) {
  //       setEmailError({ error: true, message: 'Please enter a valid email.' });
  //     } else {
  //       setEmailError({ error: false, message: '' });
  //     }
  //   }
  //   if (name.toLowerCase() === 'password') {
  //     if (password.length < 4) {
  //       setPasswordError({
  //         error: true,
  //         message: 'Password should have atleast 5 charcters.',
  //       });
  //     } else {
  //       setPasswordError({ error: false, message: '' });
  //     }
  //   }
  // };

  // const onCheckToggle = () => {
  //   setChecked(!checked);
  // };

  const navigateToForgetPassword = () => {
    props.navigation.navigate('ForgetPasswordEmail');
  };

  // const onForgetPress = () => {
  //   props.navigation.navigate('ResetPasswordEmail');
  // };

  const onSubmit = () => {

    console.log("FORGETPASSWORDOTP_DATA", pin)
    try {
      if (
        pin.trim() &&
        !pinError.error) {
        setLoading(true);
        const LOGIN_DATA = {
          pin,
          email

        };
        console.log("LOGIN_DATA", LOGIN_DATA)

        props.login(
          LOGIN_DATA,
          (res) => {
            console.log('res of SIGN IN -->', res);
            // setStorageItem('Authorization', res.token);
            // setStorageItem("UserID", res.user._id)
            setStorageItem("Token", res.data.token)
            // const beforeset = await getStorageItem("UserData")
            // console.log("BEFORE SEETING USER SIGNIN",beforeset)
            setStorageItem("UserData", res.data.user)
            props.showAlert('Logged In Succesfully.');
            // props.toggleAuth(res.user);
            setLoading(false);
            navigation.dispatch(
              StackActions.replace('MainFlow', { screen: 'scanner' })
            )
          },
          (err) => {
            if (err == "Network Error") {
              props.showAlert(err);

            }
            else {
              props.showAlert("Invalid OTP ")
            }
            console.log('err of Sign IN OTP -->', err);
            setLoading(false);
          },
        );
      } else {
        props.showAlert('Please fill all fields with valid data.');
      }
    } catch (e) {
      console.log('e in SignupOTP -->', e);
      setLoading(false);
    }
  };

  const viewProps = {
    checked,
    loading,
    onSubmit,
    pin,
    setPin,
    navigateToForgetPassword
  };

  return <SigninView {...viewProps} />;
};

const mapStateToProps = (state) => {
  console.log("SIGN IN state", state)
  return {
    open: state.layoutReducer.snackbarState,
    message: state.layoutReducer.snackbarMessage,
    errorMessage: state.auth.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // toggleAuth: (data) => dispatch(toggleAuthActionCreator(data)),
    showAlert: (message) => dispatch(onSnackbar(message)),
    login: (LOGIN_DATA, Sucess, Error) => dispatch(login(LOGIN_DATA, Sucess, Error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
