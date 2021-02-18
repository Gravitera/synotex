import React, { useState, useEffect } from 'react';
import LogOutView from './view';
import { validateEmail, setStorageItem } from '../../../utils';
import { logout } from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import { onSnackbar } from '../../../store/actions/layoutActions';
import { StackActions, useNavigation } from '@react-navigation/core';
import { getStorageItem } from '../../../utils';
import AsyncStorage from '@react-native-community/async-storage';

const LogOut = (props) => {

    const [pin, setPin] = useState('')
    const navigation = useNavigation()
    // const { email } = props.route.params;
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pinError, setPinError] = useState({ error: false, message: '' });
    const [driverData, setDriverData] = useState()

    useEffect(() => {
        (async () => {
            const driver_data = await getStorageItem("UserData")

            setDriverData(driver_data)

            //   props.fetchStudents(driver_data)


        })()
    }, [])


    // console.log("LOGOUT PROPS", props)
    console.log("LOGOUT RES", driverData?.email)


    const navigateToResetPassword = () => {
        props.navigation.navigate('ResetOldPassword');
    };



    const removeItemValue = async (UserData) => {

        try {
            AsyncStorage.removeItem(UserData);
            console.log("TRUE", UserData)
            console.log("TRY USER DATA", await getStorageItem("UserData"))
            return true;
        }
        catch (exception) {
            console.log("FALSE", UserData)
            return false;
        }
    }
    const removeItemValue2 = async (value) => {
        console.log("ASYNC REMOVAL", value)
        try {
            AsyncStorage.removeItem(value);
            console.log("TRUE", value)
            console.log("TRY ON BOARD DATA", await getStorageItem(value))
            return true;
        }
        catch (exception) {
            console.log("FALSE ON BOARD", value)
            return false;
        }
    }


    const loggedinEmail = driverData?.email

    const onSubmit = () => {

        console.log("ResetPASSWORDOTP_DATA", pin)
        try {
            if (
                pin.trim() &&
                !pinError.error) {
                setLoading(true);
                const LOGOUT_DATA = {
                    pin,
                    loggedinEmail
                };

                console.log("LOGOUT_DATA", LOGOUT_DATA)


                props.logout(
                    LOGOUT_DATA,
                    async (res) => {
                        console.log('res of FORGETPASSWORDOTP -->', res);
                        // setStorageItem('Authorization', res.token);
                        // setStorageItem("UserID", res.user._id)
                        // setStorageItem("BusID", res.user.busId)
                        props.showAlert('Logged Out Successfully.');
                        const lasync = await getStorageItem("UserData")
                        console.log("LOGO UT INDEX ASYNC DATA", lasync)
                        await removeItemValue("UserData")
                        const onBoardCount = await getStorageItem("OnboardCount")
                        const onBoard = await getStorageItem("Onboard")

                        console.log("LOGO UT ONBOARD COUNT ASYNC DATA", onBoardCount)
                        console.log("LOGO UT ONBOARD ASYNC DATA", onBoard)
                        if (onBoardCount) {
                            await removeItemValue2("OnboardCount")
                        }
                        if (onBoard) {
                            await removeItemValue2("Onboard")
                        }


                        setLoading(false);
                        // navigation.navigate('AuthFlow', { screen: 'AlreadyVerified' });
                        navigation.dispatch(
                            StackActions.replace('AuthFlow', { screen: 'AlreadyVerified' })
                        )
                        // props.toggleAuth(res.user);
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
                props.showAlert('필수 입력값을 확인해 주세요');
            }
        } catch (e) {
            props.showAlert('Invalid old Pin.');
            console.log('e in SignupOTP -->', e);
            setLoading(false);
        }
    };

    const viewProps = {
        checked,
        loading,
        onSubmit,
        pin,
        setPin,
        ...props,
        navigateToResetPassword

    };

    return <LogOutView {...viewProps} />;
};

const mapStateToProps = (state) => {
    console.log("LOGOUT STATE", state)
    return {
        open: state.layoutReducer.snackbarState,
        message: state.layoutReducer.snackbarMessage,
        // email:state.auth.loginData.user.email
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // toggleAuth: (data) => dispatch(toggleAuthActionCreator(data)),
        showAlert: (message) => dispatch(onSnackbar(message)),
        logout: (LOGOUT_DATA, Sucess, Error) => dispatch(logout(LOGOUT_DATA, Sucess, Error))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);
