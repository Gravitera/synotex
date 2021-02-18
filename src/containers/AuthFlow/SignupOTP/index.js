import React, { useState, useContext } from 'react';
import SignupOTPView from './view';
import { validateEmail, setStorageItem } from '../../../utils';
import { confirmOTP } from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import { onSnackbar } from '../../../store/actions/layoutActions';
import { StackActions, useNavigation } from '@react-navigation/core';

const SignupOTP = (props) => {

    const navigation = useNavigation()

    const { email } = props.route.params;
    
    const [pin, setPin] = useState('')
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pinError, setPinError] = useState({ error: false, message: '' });


    const onSubmit = () => {
      
        console.log("SIGNUPOTP_DATA", pin)
        try {
            if (
                pin.trim() &&
                !pinError.error) {
                setLoading(true);
                const SIGNUPOTP_DATA = {
                    pin,
                    email

                };
                console.log("SIGNUPOTP_DATA", SIGNUPOTP_DATA)
                props.confirmOTP(
                    SIGNUPOTP_DATA,
                    (res) => {
                        console.log('res of SignupOTP -->', res);
                        // setStorageItem('Authorization', res.token);
                        // setStorageItem("UserID", res.user._id)
                        // setStorageItem("BusID", res.user.busId)
                        // props.toggleAuth(res.user);
                        props.showAlert('OTP Verified Succesfully.');
                        // setLoading(false);
                        // navigation.navigate('SignupPin',{
                        //     email:email
                        // })
                        props.navigation.dispatch(
                            StackActions.replace('SignupPin',{
                              email: email
                            })
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
                            props.showAlert('Invalid OTP Code.');
                        }
                        console.log('err of SignupOTP -->', err);
                        setLoading(false);
                    },
                );
            } else {
                props.showAlert('Please fill all fields with valid data.');
            }
        } catch (e) {
            console.log('e in SignupOTP -->', e);
            setLoading(false);
            props.showAlert('Invalid OTP Code.');
        }
    };

    const viewProps = {
        checked,
        loading,
        onSubmit,
        pin,
        setPin
    };

    return <SignupOTPView {...viewProps} />;
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
        confirmOTP:(SIGNUPOTP_DATA,Sucess,Error)=>dispatch(confirmOTP(SIGNUPOTP_DATA,Sucess,Error))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupOTP);
