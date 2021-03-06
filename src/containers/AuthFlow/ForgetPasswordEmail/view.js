/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Input from '../../../components/TextInput';
import Checkbox from '../../../components/Checkbox';
import AuthLayout from '../../../components/AuthLayout';
import { color, font } from '../../../../theme';
import { useNavigation } from '@react-navigation/core';

const ForgetPasswordEmailView = (props) => {
  const navigation = useNavigation()
  const layoutProps = {
    heading: 'RESET PIN',
    buttonLabel: 'Submit',
    text: 'Confirm your email address',
    // onAuthToggle: props.navigateToSignin,
    onPress: props.onSubmit,
    page: 'Signup',
    loading: props.loading,
  };
  return (
    <>
      <AuthLayout {...layoutProps}>
       
        <Input
          label="Email"
          errorText={props.emailError.message}
          error={props.emailError.error}
          onBlur={props.onBlur}
          value={props.email}
          onChange={props.onChange}
        />
       
      
      </AuthLayout>
    </>
  );
};

const styles = StyleSheet.create({
  actionWrapper: {
    flexDirection: 'row',
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
});

export default ForgetPasswordEmailView;
