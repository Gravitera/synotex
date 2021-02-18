import React, { useState, useContext, useEffect } from 'react';
import ResetNewPinView from './view';
import { validateEmail, setStorageItem, getStorageItem } from '../../../utils';
import { updateNewPassword } from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import { onSnackbar } from '../../../store/actions/layoutActions';
import { useNavigation } from '@react-navigation/core';

const ResetNewPin = (props) => {

    const [pin, setPin] = useState('')
    const navigation = useNavigation()

    // const { email } = props.route.params;
    const { oldpin } = props.route.params;
    console.log("OLD PIN", oldpin)
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pinError, setPinError] = useState({ error: false, message: '' });
    const [driverData, setDriverData] = useState()

    useEffect(() => {
        (async () => {
            const driver_data = await getStorageItem("UserData")
            // console.log("ALREADY VERFIIFED PROPS", driver_data)
            setDriverData(driver_data)
        })()
    }, [])

    // console.log("object1", driverData)


    const email = driverData?.email;

    const onSubmit = () => {

        console.log("ResetPASSWORDOTP_DATA", pin)
        try {
            if (
                pin.trim() &&
                !pinError.error) {
                setLoading(true);
                const RESET_NEW_PIN_DATA = {
                    pin,
                    oldpin,
                    email
                };

                console.log("RESET_NEW_PIN_DATA", RESET_NEW_PIN_DATA)

                props.updateNewPassword(
                    RESET_NEW_PIN_DATA,
                    (res) => {
                        console.log('res of FORGETPASSWORDOTP -->', res);
                        // setStorageItem('Authorization', res.token);
                        // setStorageItem("UserID", res.user._id)
                        // setStorageItem("BusID", res.user.busId)
                        props.showAlert('New Pin Changed Succesfully.');
                        setStorageItem("UserData", res.data.user)
                        // props.toggleAuth(res.user);
                        setLoading(false);
                        navigation.navigate('scanner')

                    },
                    (err) => {
                        if (err == "Network Error") {
                            props.showAlert(err);

                        }
                        else {
                            // props.showAlert("Invalid OTP ")
                            props.showAlert('Invalid Pin.');
                        }
                        console.log('err of SignupOTP -->', err);
                        setLoading(false);
                    },
                );

            } else {
                props.showAlert('Please fill all fields with valid data.');
            }
        } catch (e) {
            props.showAlert('Invalid Pin');
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

    return <ResetNewPinView {...viewProps} />;
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
        updateNewPassword: (RESET_NEW_PIN_DATA, Sucess, Error) => dispatch(updateNewPassword(RESET_NEW_PIN_DATA, Sucess, Error))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetNewPin);
