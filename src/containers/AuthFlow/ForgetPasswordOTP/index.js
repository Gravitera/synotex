import React, { useState, useContext } from 'react';
import ForgetPasswordOTPView from './view';
import { validateEmail, setStorageItem } from '../../../utils';
import { confirmOTP } from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import { onSnackbar } from '../../../store/actions/layoutActions';
import { StackActions, useNavigation } from '@react-navigation/core';

const ForgetPasswordOTP = (props) => {

    const [pin, setPin] = useState('')
    const navigation = useNavigation()
    
    const { email } = props.route.params;
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pinError, setPinError] = useState({ error: false, message: '' });





    const onSubmit = () => {
      
        console.log("FORGETPASSWORDOTP_DATA", pin)
        try {
            if (
                pin.trim() &&
                !pinError.error) {
                setLoading(true);
                const FORGETPASSWORDOTP_DATA = {
                    pin,
                    email

                };
                console.log("FORGETPASSWORDOTP_DATA", FORGETPASSWORDOTP_DATA)
                props.confirmOTP(
                    FORGETPASSWORDOTP_DATA,
                    (res) => {
                        console.log('res of FORGETPASSWORDOTP -->', res);
                        // setStorageItem('Authorization', res.token);
                        // setStorageItem("UserID", res.user._id)
                        // setStorageItem("BusID", res.user.busId)
                        // setStorageItem("UserData", res.data.user)
                        props.showAlert('OTP Verified Succesfully.');
                        // props.toggleAuth(res.user);
                        setLoading(false);
                        // navigation.navigate('ForgetPasswordPIN',{
                        //     email:email
                        // })

                        props.navigation.dispatch(
                            StackActions.replace('ForgetPasswordPIN',
                            {
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
        }
    };

    const viewProps = {
        checked,
        loading,
        onSubmit,
        pin,
        setPin

    };

    return <ForgetPasswordOTPView {...viewProps} />;
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
        confirmOTP:(FORGETPASSWORDOTP_DATA,Sucess,Error)=>dispatch(confirmOTP(FORGETPASSWORDOTP_DATA,Sucess,Error))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordOTP);
