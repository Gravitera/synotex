import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthLayout from '../../../components/AuthLayout';
import Input from '../../../components/TextInput';
import { color, font } from '../../../../theme';
import OTPLayout from '../../../components/OTPLayout';

const LoginPinView = (props) => {
  const layoutProps = {
    heading: 'Please enter your Pin',
    buttonLabel: 'Login',
    clickText: "Don't have an account?",
    onPress: props.onSubmit,
    loading: props.loading,
    setPin:props.setPin,
    pin:props.pin,
    pinCount:4,
    // canCancel:true,
    isSecure:true

  };
  return (
    <>
      <OTPLayout {...layoutProps}>


      </OTPLayout>
      {/* <AuthLayout {...layoutProps}>
        <Input
          label="Email"
          errorText={props.emailError.message}
          error={props.emailError.error}
          onBlur={props.onBlur}
          value={props.email}
          onChange={props.onChange}
        />
        <Input
          label="Password"
          error={props.pinError.error}
          errorText={props.pinError.message}
          isSecure={true}
          onBlur={props.onBlur}
          value={props.pin}
          onChange={props.onChange}
        />
        <View style={styles.actionWrapper}>

          <View style={{justifyContent:"flex-start"}}>
            <Text style={styles.forgetText} onPress={props.onForgetPress}>
              Forget Password?
            </Text>
          </View>

        </View>

      </AuthLayout> */}
    </>
  );
};

const styles = StyleSheet.create({
  actionWrapper: {
    flexDirection: 'row',
    marginTop: 22,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    width: '100%'
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
  forgetText: {
    fontSize: 13,
    color: color.primary,
    fontFamily: font.regular,
    marginTop: 8,
    width: 160,
    textAlign: 'left',
  },
});

export default LoginPinView;