import React, { useState, useEffect } from 'react';
import LoginView from './view';
import { validateEmail, setStorageItem, getStorageItem } from '../../../utils';
import { login } from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import { onSnackbar } from '../../../store/actions/layoutActions';
import { StackActions, useNavigation } from '@react-navigation/core';

const Login = (props) => {

  // console.log("LOGIN PROPS", props)

  const navigation = useNavigation()
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState({ error: false, message: '' });
  const [pinError, setPinError] = useState({
    error: false,
    message: '',
  });

  const onChange = (data) => {
    const { text, name } = data;
    if (name.toLowerCase() === 'email') {
      setEmail(text);
    } else if (name.toLowerCase() === 'password') {
      setPin(text);
    }
  };
  useEffect(() => {
    (async () => {

      const asyncDivers = await getStorageItem("Drivers")

      console.log("RESPONSE ASYNC AT LOGIN", ancDivers[0].email)
      const currentlyLoggedin = res.data.user.email

      //  if(currentlyLoggedin===asyncDivers.email)
      // if (asyncDivers) {

      //   setStorageItem("Drivers", [res.data.user])

      // } else {
      //   asyncDivers.push(res.data.user)
      //   setStorageItem("Drivers", asyncDivers)
      // }



    })()
  }, [])


  const onBlur = (name) => {
    // console.log('name in blur');
    if (name.toLowerCase() === 'email') {
      const res = validateEmail(email);
      if (!res) {
        setEmailError({ error: true, message: 'Please enter a valid email.' });
      } else {
        setEmailError({ error: false, message: '' });
      }
    }
    if (name.toLowerCase() === 'password') {
      if (pin.length < 4 && pin.length > 4) {
        setPinError({
          error: true,
          message: 'Password should have 4 charcters.',
        });
      } else {
        setPinError({ error: false, message: '' });
      }
    }
  };

  const onCheckToggle = () => {
    setChecked(!checked);
  };

  const navigateToSignup = () => {
    props.navigation.navigate('Signup');
  };

  const onForgetPress = () => {
    props.navigation.navigate('ForgetPasswordEmail');
  };

  const onSubmit = () => {
    try {
      if (
        email.trim() &&
        !emailError.error &&
        pin.trim() &&
        !pinError.error
      ) {
        setLoading(true);
        const LOGIN_DATA = {
          email,
          pin,
        };
        console.log("login data", LOGIN_DATA)
        props.login(
          LOGIN_DATA,
          async (res) => {
            console.log('res of Login -->', res);
            // setStorageItem('Authorization', res.data.token);
            // setStorageItem("UserID", res.data.user._id)
            // setStorageItem("BusID", res.data.user.busId)

            setStorageItem("Token", res.data.token)
            const asyncDivers = await getStorageItem("Drivers")
            console.log("LOGIN DRIVERS", asyncDivers)

            const currentlyLoggedin = res.data.user.email
            console.log("CUREENTLY LOGGED IN EMAIL", currentlyLoggedin)

            console.log("CUREENTLY LOGGED IN USER", res.data.user)
            const beforeset = await getStorageItem("UserData")
            console.log("BEFORE SEETING USER", beforeset)
            setStorageItem("UserData", res.data.user)
            console.log("CUREENTLY LOGGED IN USER 2", res.data.user)


            if (asyncDivers) {
              const filteredDrivers = asyncDivers.filter((driver) => driver.email === currentlyLoggedin)
              console.log("FILTERE DRIVERS", filteredDrivers)
              if (filteredDrivers.length == 0) {
                asyncDivers.push(res.data.user)
                setStorageItem("Drivers", asyncDivers)
              }
            } else {
              setStorageItem("Drivers", [res.data.user])
            }

            setLoading(false);
            // navigation.navigate('MainFlow', { screen: 'scanner' });
            navigation.dispatch(
              StackActions.replace('MainFlow', { screen: 'scanner' })
            )

            // props.toggleAuth(res.user);
          },
          (err) => {
            props.showAlert('Invaild Email or pin, please try again.');
            console.log('err of Login -->', err);
            setLoading(false);
          },
        );
      } else {
        props.showAlert('Please fill all fields with valid data.');
      }
    } catch (e) {
      console.log('e in Login -->', e);
      setLoading(false);
    }
  };

  const viewProps = {
    email,
    pin,
    checked,
    loading,
    onChange,
    onCheckToggle,
    navigateToSignup,
    onForgetPress,
    onBlur,
    emailError,
    pinError,
    onSubmit,
  };

  return <LoginView {...viewProps} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);