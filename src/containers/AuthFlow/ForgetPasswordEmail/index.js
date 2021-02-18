import React, { useState, useContext } from 'react';
import ForgetPasswordEmailView from './view';
import { validateFullName, validateEmail } from '../../../utils';
import { signUpEmail } from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import { onSnackbar } from '../../../store/actions/layoutActions';
import { StackActions, useNavigation } from '@react-navigation/core';

const ForgetPasswordEmail = (props) => {
  const navigation = useNavigation()

  const [email, setEmail] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState({ error: false, message: '' });


  const onChange = (data) => {
    const { text, name } = data;
    if (name.toLowerCase() === 'email') {
      setEmail(text);

    };
  }
  const onBlur = (name) => {
    if (name.toLowerCase() === 'email') {
      const res = validateEmail(email);
      if (!res) {
        setEmailError({ error: true, message: 'Please enter a valid email.' });
      } else {
        setEmailError({ error: false, message: '' });
      }
    }
  };

  const navigateToSignin = () => {
    props.navigation.navigate('Signin');
  };

  const onSubmit = () => {


    try {
      if (

        email.trim() &&
        !emailError.error) {

        setLoading(true);
        const FORGETPASSWORDEMAIL_DATA = {
          email,
          flag: "forgotPassword"

        };
        console.log("FORGETPASSWORDEMAIL_DATA EMAIL", FORGETPASSWORDEMAIL_DATA)

        props.signUpEmail(
          FORGETPASSWORDEMAIL_DATA,
          (res) => {
            console.log('res of ResetPasswordEmail -->', res);
            // setStorageItem("UserData", res.data.user)
            setLoading(false);
            props.showAlert('An email have been sent to your account. Please verify to login into your account.');
            // navigation.navigate('ForgetPasswordOTP',)
            props.navigation.dispatch(
              StackActions.replace('ForgetPasswordOTP',
                {
                  email: email
                })
            )

          },
          (err) => {
            if (err == "Network Error") {
              props.showAlert(err);

            }
            else {
              // props.showAlert("Invalid OTP ")
              props.showAlert('Invalid Email');
            }
            console.log('err of ResetPasswordEmail -->', err);
            setLoading(false);
          },
        );
      }
      else {
        props.showAlert('Please fill all fields with valid data.');
      }
    } catch (e) {
      console.log('e in ResetPasswordEmail -->', e);
      setLoading(false);
    }
  };

  const viewProps = {
    email,
    emailError,
    loading,
    onChange,
    navigateToSignin,
    onBlur,
    onSubmit,
  };

  return <ForgetPasswordEmailView {...viewProps} />;
};

const mapStateToProps = (state) => {
  return {
    open: state.layoutReducer.snackbarState,
    message: state.layoutReducer.snackbarMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // toggleAuth: (data) => dispatch(toggleAuthActionCreator(data)),
    showAlert: (message) => dispatch(onSnackbar(message)),
    signUpEmail: (FORGETPASSWORDEMAIL_DATA, Sucess, Error) => dispatch(signUpEmail(FORGETPASSWORDEMAIL_DATA, Sucess, Error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordEmail);
