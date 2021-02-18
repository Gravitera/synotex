
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OTPLayout from '../../../components/OTPLayout';
import { color, font } from '../../../../theme';


const ForgetPasswordPINView = (props) => {

    const layoutProps = {
        heading: 'SET YOUR NEW PIN ',
        buttonLabel: 'Reset',
        onPress: props.onSubmit,
        loading: props.loading,
        setPin:props.setPin,
        pin:props.pin,
        pinCount:4,
        isSecure:true

    };
    return (
        <>
            <OTPLayout {...layoutProps}>


            </OTPLayout>

        </>
    );
};

const styles = StyleSheet.create({
    actionWrapper: {
        flexDirection: 'row',
        justifyContent: "center"
    },
    checkboxWrapper: {
        flexDirection: 'row',
    },
    checkboxText: {
        fontSize: 13,
        color: color.primary,
        fontFamily: font.regular,
        textAlignVertical: 'center',
    },
    checkboxTextBold: {
        fontFamily: font.bold,
    },
    forgetText: {
        fontSize: 13,
        color: color.primary,
        fontFamily: font.regular,
        marginTop: 8,
        width: 160,
        textAlign: 'right',
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "black",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
});

export default ForgetPasswordPINView;
