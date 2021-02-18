/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { color, font } from '../../../../theme';
import OTPLayout from '../../../components/OTPLayout';


const ResetNewPinView = (props) => {


    const layoutProps = {
        heading: 'RESET PIN',
        text: 'Type in your new Pin',
        buttonLabel: 'Verify',
        onPress: props.onSubmit,
        loading: props.loading,
        setPin: props.setPin,
        pin: props.pin,
        pinCount:4,
        isSecure:true
    };
    return (
        <>
            <OTPLayout {...layoutProps}>






                <View style={styles.actionWrapper}>
                    <View style={styles.checkboxWrapper}>

                        <Text style={styles.checkboxText}>
                            Resend{props.OTPcode}

                        </Text>
                    </View>

                </View>
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

export default ResetNewPinView;
