import React, { useState, useContext, useEffect } from 'react';
import ResetOldPasswordView from './view';
import { validateEmail, setStorageItem, getStorageItem } from '../../../utils';
import { oldPasswordConfirm } from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import { onSnackbar } from '../../../store/actions/layoutActions';
import { useNavigation } from '@react-navigation/core';
// const bcrypt = require('bcryptjs');

const ResetOldPassword = (props) => {
    const [pin, setPin] = useState('')
    const navigation = useNavigation()
    const [bus, setBusId] = useState('');
    // const { email } = props.route.params;
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pinError, setPinError] = useState({ error: false, message: '' });

    useEffect(() => {
        (async () => {
            const bus = await getStorageItem("UserData")

            console.log("BUS EMAIL", bus)
            setBusId(bus)

            //   const busNumber = busID?.busId?.busNo


        })()
    }, [])


    // console.log("BU SN", bus?.email)
    const email = bus?.email
    const onSubmit = () => {

        console.log("ResetPASSWORDOTP_DATA", pin)
        // const matched=bcrypt.compareSync(pin, );
        try {
            if (
                pin.trim() &&
                !pinError.error) {
                setLoading(true);
                const OLD_PASSWORD_CHECK = {
                    pin,
                    email
                };

                console.log("OLD_PASSWORD_CHECK", OLD_PASSWORD_CHECK)

                props.oldPasswordConfirm(
                    OLD_PASSWORD_CHECK,
                    (res) => {
                        console.log('res of FORGETPASSWORDOTP -->', res);
                        // setStorageItem('Authorization', res.token);
                        // setStorageItem("UserID", res.user._id)
                        // setStorageItem("BusID", res.user.busId)
                        props.showAlert('Old Pin Verified Succesfully.');
                        // props.toggleAuth(res.user);
                        setLoading(false);
                        navigation.navigate('ResetNewPin', {
                            // email:email,
                            oldpin: pin
                        })



                    },
                    (err) => {
                        if (err == "Network Error") {
                            props.showAlert(err);

                        }
                        else {
                            // props.showAlert("Invalid OTP ")
                            setPin('')
                            props.showAlert('Invalid Old Pin.');
                        }
                        console.log('err of SignupOTP -->', err);
                        setLoading(false);
                    },
                );

            } else {
                props.showAlert('Please fill all fields with valid data.');
                setLoading(false);
            }
        } catch (e) {
            props.showAlert('Invalid Old  Pin.');
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

    return <ResetOldPasswordView {...viewProps} />;
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
        oldPasswordConfirm: (FORGETPASSWORDOTP_DATA, Sucess, Error) => dispatch(oldPasswordConfirm(FORGETPASSWORDOTP_DATA, Sucess, Error))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetOldPassword);
