import React, { useState, useEffect } from 'react';
import LoginEmailView from './view';
import { validateEmail, setStorageItem, getStorageItem } from '../../../utils';
import { loginScreenEmail } from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import { onSnackbar } from '../../../store/actions/layoutActions';
import { useNavigation } from '@react-navigation/core';

const LoginEmail = (props) => {

  // console.log("LoginEmail PROPS", props)

  const navigation = useNavigation()
  const [email, setEmail] = useState('');
  // const [pin, setPin] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState({ error: false, message: '' });
  // const [pinError, setPinError] = useState({
  //   error: false,
  //   message: '',
  // });
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

      console.log("RESPONSE ASYNC AT LoginEmail", ancDivers[0].email)
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
    // if (name.toLowerCase() === 'password') {
    //   if (pin.length < 4 && pin.length > 4) {
    //     setPinError({
    //       error: true,
    //       message: 'Password should have 4 charcters.',
    //     });
    //   } else {
    //     setPinError({ error: false, message: '' });
    //   }
    // }
  };

  // const onCheckToggle = () => {
  //   setChecked(!checked);
  // };

  const navigateToSignup = () => {
    props.navigation.navigate('Signup');
  };

  const onForgetPress = () => {
    props.navigation.navigate('ForgetPasswordEmail');
    // console.log("hello")
  };

  const onSubmit = () => {
    try {
      if (
        email.trim() &&
        !emailError.error
      ) {
        setLoading(true);
        const LoginEmail_DATA = {
          email,
          flag: "signup"
        };
        console.log("LoginEmail data", LoginEmail_DATA)


        props.loginScreenEmail(
          LoginEmail_DATA,
          async (res) => {
            console.log('res of LoginEmail -->', res);
            setStorageItem("Token", res.data.token)
            // setLoading(false);

            // navigation.navigate('LoginPin',{
            //   email:email,
            //   flag:"forgotPassword"
            // })

            if (res?.data?.alreadyRegistered) {
              console.log("REGISTERED TRUUUEEEEEEE", res.data.alreadyRegistered)
              navigation.navigate('LoginPin', {
                email: email,
                // flag:"signup"
              })

              // props.showAlert('An email have been send to your account. Please verify to login into your account.');
              setLoading(false);
            }
            else {
              console.log("REGISTERED FALSE LOGIN", res.data.alreadyRegistered)
              props.showAlert('An email have been send to your account. Please verify to login into your account.');
              setLoading(false);
              props.navigation.navigate('SignupOTP', {
                email: email
              });

            }


          },
          (err) => {
            if (err == "Network Error") {
              props.showAlert(err);

            }
            else {
              // props.showAlert("Invalid OTP ")
              props.showAlert('Invaild Email, please try again.');
            }

            console.log('err of LoginEmail -->', err);
            setLoading(false);
          },
        );

      } else {
        props.showAlert('Please fill all fields with valid data.');
        setLoading(false);
      }
    } catch (e) {
      console.log('e in LoginEmail -->', e);
      setLoading(false);
    }
  };

  const viewProps = {
    email,
    // pin,
    checked,
    loading,
    onChange,
    // onCheckToggle,
    navigateToSignup,
    onForgetPress,
    onBlur,
    emailError,
    // pinError,
    onSubmit,
  };

  return <LoginEmailView {...viewProps} />;
};

const mapStateToProps = (state) => {
  // console.log("state", state)
  return {
    open: state.layoutReducer.snackbarState,
    message: state.layoutReducer.snackbarMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // toggleAuth: (data) => dispatch(toggleAuthActionCreator(data)),
    showAlert: (message) => dispatch(onSnackbar(message)),
    loginScreenEmail: (LoginEmail_DATA, Sucess, Error) => dispatch(loginScreenEmail(LoginEmail_DATA, Sucess, Error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginEmail);