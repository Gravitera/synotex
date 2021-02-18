import React, { useState, useEffect } from 'react';
import SignupPinView from './view';
import { getStorageItem, setStorageItem } from '../../../utils';
import {
  fetchNewPassword,
  toggleAuthActionCreator,
} from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import { onSnackbar } from '../../../store/actions/layoutActions';
import { StackActions, useNavigation } from '@react-navigation/core';

const SignupPin = (props) => {
  const [pin, setPin] = useState('')
  const navigation = useNavigation()
  const { email } = props.route.params;
  const [driverData, setDriverData] = useState()
  // const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pinError, setPinError] = useState({ error: false, message: '' });

  useEffect(() => {
    (async () => {

      const driver_data = await getStorageItem("UserData")

      // console.log("ALREADY VERFIIFED PROPS", driver_data)
      setDriverData(driver_data)

      // props.fetchStudents(driver_data)


    })()
  }, [])
  console.log("ASYNC STORAGE AT SIGNUP PIN", driverData)




  const onSubmit = () => {

    // console.log("SIGNUPPIN_DATA", pin)

    try {
      if (
        pin.trim() &&
        !pinError.error) {
        setLoading(true);
        const SIGNUPPIN_DATA = {
          pin,
          email
        };
        console.log("SIGNUPPin_DATA", SIGNUPPIN_DATA)

        props.fetchNewPassword(
          SIGNUPPIN_DATA,
          async (res) => {
            console.log('res of SignupPin -->', res);
            // setStorageItem('Authorization', res.token);
            // setStorageItem("UserID", res.user._id)
            // setStorageItem("BusID", res.user.busId)
            setStorageItem("Token", res.data?.token)

            const asyncDivers = await getStorageItem("Drivers")
            if (asyncDivers) {
              asyncDivers.push(res.data.user)
              setStorageItem("Drivers", asyncDivers)
            } else {
              setStorageItem("Drivers", [res.data.user])
            }
            setStorageItem("UserData", res.data.user)

            props.showAlert('Pin Set Succesfully.');
            // props.toggleAuth(res.user);
            setLoading(false);
            // navigation.navigate('MainFlow',{screen:'scanner'})

            props.navigation.dispatch(
              StackActions.replace('MainFlow', { screen: 'scanner' })
            )


          },
          (err) => {
            if (err == "Network Error") {
              props.showAlert(err);

            }
            else {
              // props.showAlert("Invalid OTP ")
              props.showAlert('Invaild pin , please try again.');
            }
            console.log('err of SignupPin -->', err);
            setLoading(false);
          },
        );
      } else {
        props.showAlert('Please fill all fields with valid data.');
      }
    } catch (e) {
      console.log('e in SignupPin -->', e);
      setLoading(false);
    }
  };

  const viewProps = {
    loading,
    pinError,
    onSubmit,
    pin,
    setPin
  };

  return <SignupPinView {...viewProps} />;
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
    fetchNewPassword: (SIGNUPPIN_DATA, Sucess, Error) => dispatch(fetchNewPassword(SIGNUPPIN_DATA, Sucess, Error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPin);
