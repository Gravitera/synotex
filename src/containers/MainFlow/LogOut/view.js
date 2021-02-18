/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { color, font } from '../../../../theme';
import OTPLayout from '../../../components/OTPLayout';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const { height, width } = Dimensions.get("window");
import { Drawer, Avatar, List, Modal, Portal, Button, Provider } from 'react-native-paper';
const LogOutView = (props) => {

    const layoutProps = {
        heading: 'LOGOUT',
        text: 'Enter your pin to Logout',
        buttonLabel: 'Verify',
        clickText: '',
        onPress: props.onSubmit,
        loading: props.loading,
        setPin: props.setPin,
        pin: props.pin,
        // onAuthToggle:'',
        pinCount: 4,
        isSecure:true
    };
    return (
        <>
            <OTPLayout {...layoutProps}>

            {/* <Provider style={{ backgroundColor: "green" }}>
                <Portal style={{ backgroundColor: "blue" }}>
                    <Modal visible={visible} onDismiss={hideModal}
                        contentContainerStyle={{
                            height: 500, width: 500, backgroundColor: "red",
                            position: "absolute", top: (height - 250) / 2, left: (width - 250) / 2,
                        }}>

                        <View style={styles.body}>

                            <View>
                                <Text style={styles.heading} >
                                    {layoutProps.heading}
                                </Text>
                                <Text style={styles.text} >
                                    {layoutProps.text}
                                </Text>
                            </View>
                            <View style={styles.inputWrapper} >

                                <View style={{ justifyContent: 'center', height: 200, width: 200 }}>



                                    <OTPInputView

                                        pinCount={layoutProps.pinCount}
                                        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                        // onCodeChanged = {code => { this.setState({code})}}
                                        autoFocusOnLoad
                                        codeInputFieldStyle={styles.underlineStyleBase}
                                        codeInputHighlightStyle={styles.underlineStyleHighLighted}

                                        onCodeFilled={(code => {
                                            // console.log(`Code is ${code}, you are good to go!`)
                                            layoutProps.setPin(code)
                                        })}
                                    />
                                </View>
                            </View>
                            <View style={styles.buttonWrapper} >
                                <Button loading={layoutProps.loading} disabled={layoutProps.pin.length != layoutProps.pinCount} onPress={layoutProps.onPress} label={layoutProps.buttonLabel} />
                                {
                                    layoutProps.canCancel
                                        ? <Button onPress={props.onCancel} label={'Cancel'} mode="text" />
                                        : null
                                }
                            </View>

                        </View>
                        <View style={styles.actionWrapper}>
                            <View style={styles.checkboxWrapper}>

                                <Text style={styles.checkboxText}>
                                    Resend{props.OTPcode}

                                </Text>
                            </View>
                        </View>
                    </Modal>
                </Portal>
            </Provider> */}








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
    body: {
        backgroundColor: Colors.white,
        alignItems: "center",
        paddingHorizontal: 20,
        width: 460,
        borderRadius: 7
    },
    imageWrapper: {
        marginTop: 30
    },
    inputWrapper: {
        flexDirection: "column"
    },
    heading: {
        fontSize: 20,
        marginTop: 39,
        color: "black",
        textAlign: "center",
        width: 280,
        fontFamily: font.thin
    },
    buttonWrapper: {
        marginTop: 25
    },
    text: {
        fontSize: 18,
        // marginBottom: 90,
        marginTop: 20,
        color: color.dark,
        textAlign: "center",
        width: 280,
        fontFamily: font.thin
    },
    clickWrapper: {
        flexDirection: "row",
        width: 280,
        marginTop: 20,
        paddingBottom: 20
    },
    clickText: {
        fontFamily: font.thin,
        fontSize: 13,
        color: color.primary
    },
    clickTextBold: {
        fontSize: 13,
        color: color.primary,
        fontFamily: font.thin
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
        color: "black"
    },

    underlineStyleHighLighted: {
        borderColor: "black",

    },

});

export default LogOutView;
