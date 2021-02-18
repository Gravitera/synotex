import React, { useState, useContext } from 'react';
import ForgetPasswordPINView from './view';
import { validateEmail, setStorageItem, getStorageItem } from '../../../utils';
import {
  fetchNewPassword,
 
} from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import { onSnackbar } from '../../../store/actions/layoutActions';
import { useNavigation } from '@react-navigation/core';

const ForgetPasswordPIN = (props) => {
  const [pin, setPin] = useState('')
  const navigation = useNavigation()

  const { email } = props.route.params;
  // const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pinError, setPinError] = useState({ error: false, message: '' });






  const onSubmit = () => {
   
    console.log("FORGETPASSWORDPIN_DATA", pin)
  
    try {
      if (
        pin.trim() &&
        !pinError.error) {
        setLoading(true);
        const FORGETPASSWORDPIN_DATA = {
          pin,
          email
        };
        console.log("FORGETPASSWORDPIN_DATA", FORGETPASSWORDPIN_DATA)

        props.fetchNewPassword(
          FORGETPASSWORDPIN_DATA,
         async (res) => {
            console.log('res of SignupPin -->', res);
            // setStorageItem('Authorization', res.token);
            // setStorageItem("UserID", res.user._id)
            // setStorageItem("BusID", res.user.busId)
            props.showAlert('Pin Set Succesfully.');
            // setStorageItem("UserData", res.data.user)

            const asyncDivers = await getStorageItem("Drivers")
            if (asyncDivers) {
              asyncDivers.push(res.data.user)
              setStorageItem("Drivers", asyncDivers)
            } else {
              setStorageItem("Drivers", [res.data.user])
            }
            setStorageItem("UserData", res.data.user)





            // props.toggleAuth(res.user);
            setLoading(false);
            navigation.navigate('AuthFlow',{screen:'AlreadyVerified'})
            
               props.navigation.dispatch(
                            StackActions.replace('AuthFlow',{screen:'AlreadyVerified'})
                          )
          },
          (err) => {
            if(err=="Network Error")
            {
              props.showAlert(err);

            }
            else
            {
                // props.showAlert("Invalid OTP ")
                props.showAlert('Invaild pin , please try again.');
            }
            console.log('err of SignupPin -->', err);
            setLoading(false);
            // navigation.navigate('Signin')
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

  return <ForgetPasswordPINView {...viewProps} />;
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
    fetchNewPassword:(FORGETPASSWORDPIN_DATA,Sucess,Error)=>dispatch(fetchNewPassword(FORGETPASSWORDPIN_DATA,Sucess,Error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordPIN);
