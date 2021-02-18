import React, { useState, useEffect } from 'react';
import SignupView from './view';
import { getStorageItem, setStorageItem, validateEmail } from '../../../utils';
import { signUpEmail } from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import { onSnackbar } from '../../../store/actions/layoutActions';
import { StackActions, useNavigation } from '@react-navigation/core';

const Signup = (props) => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState({ error: false, message: '' });
  const [driverData, setDriverData] = useState()

  useEffect(() => {
    (async () => {
      const driver_data = await getStorageItem("UserData")
      // console.log("ALREADY VERFIIFED PROPS", driver_data)
      setDriverData(driver_data)
      // props.fetchStudents(driver_data)


    })()
  }, [])
  console.log("ASYNC STOPRAGE AT SIGNUP", driverData)
  const onChange = (data) => {
    const { text, name } = data;
    if (name.toLowerCase() === 'email') {
      setEmail(text);
      // } else if (name.toLowerCase() === 'password') {
      //   setPassword(text);
      // } else if (name.toLowerCase() === 'first name') {
      //   setfirstName(text);
      // } else {
      //   setlastName(text);
      // }
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
    props.navigation.navigate('AlreadyVerified');
  };

  const onSubmit = () => {

    try {
      if (

        email.trim() &&
        !emailError.error) {

        // if (!checked) {
        //   props.showAlert('Please agree to Terms & Conditions to continue.');
        //   return;
        // }
        setLoading(true);
        const SIGNUP_DATA = {
          email,
          flag: "signup"

        };
        console.log("SIGN UP EMAIL", SIGNUP_DATA)

        props.signUpEmail(
          SIGNUP_DATA,
          (res) => {
            console.log('res of SIGNUP -->', res);
            // setStorageItem('Authorization', res.data.token);
            // setStorageItem("UserID", res.data.user._id)
            // setStorageItem("BusID", res.data.user.busId)

            // setStorageItem("UserData",res.data.user)
            setLoading(false);
            props.showAlert('An email have been sent to your account. Please verify to login into your account.');

            props.navigation.dispatch(
              StackActions.replace('SignupOTP', {
                email: email
              })
            )
            // navigation.navigate('SignupOTP', )
          },
          (err) => {
            if (err == "Network Error") {
              props.showAlert(err);

            }
            else {
              props.showAlert("Invalid Email ")
            }
            // props.showAlert('Invalid Email');
            console.log('err of SIGNUP -->', err);
            setLoading(false);
          },
        );
      }
      else {
        props.showAlert('Please fill all fields with valid data.');
      }
    } catch (e) {
      console.log('e in signup -->', e);
      setLoading(false);
    }
  };

  const viewProps = {
    email,
    emailError,

    // checked,
    loading,
    onChange,

    navigateToSignin,

    onBlur,
    onSubmit,
  };

  return <SignupView {...viewProps} />;
};

const mapStateToProps = (state) => {
  return {
    open: state.layoutReducer.snackbarState,
    message: state.layoutReducer.snackbarMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAuth: (data) => dispatch(toggleAuthActionCreator(data)),
    showAlert: (message) => dispatch(onSnackbar(message)),
    signUpEmail: (SIGNUP_DATA, Sucess, Error) => dispatch(signUpEmail(SIGNUP_DATA, Sucess, Error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
