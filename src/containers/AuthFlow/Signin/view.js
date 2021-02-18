import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthLayout from '../../../components/AuthLayout';
// import Input from '../../../components/TextInput';
// import Checkbox from '../../../components/Checkbox';
import { color, font } from '../../../../theme';
import OTPLayout from '../../../components/OTPLayout';
const SigninView = (props) => {
  const layoutProps = {
    heading: 'Enter your pin ',
    // text: 'A 4 digit pin is sent to your account.Write it down and verify ',
    buttonLabel: 'Login',
    onPress: props.onSubmit,
    loading: props.loading,
    setPin: props.setPin,
    clickText: 'Forgot your pin? ',
    pin: props.pin,
    pinCount: 4,
    onAuthToggle:'',
    onAuthToggle: props.navigateToForgetPassword,
    isSecure:true
  };

  return (
    <>
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
          error={props.passwordError.error}
          errorText={props.passwordError.message}
          isSecure={true}
          onBlur={props.onBlur}
          value={props.password}
          onChange={props.onChange}
        />
        <View style={styles.actionWrapper}>
          
          <View>

            <Text style={styles.forgetText} onPress={props.onForgetPress}>
              Forget Password?
            </Text>
          </View>
          
        </View>
      </AuthLayout> */}
      <OTPLayout {...layoutProps}>






     
      </OTPLayout>

    </>
  );
};

const styles = StyleSheet.create({
  actionWrapper: {
    flexDirection: 'row',
    marginTop: 22,
    justifyContent: 'flex-start',
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
    textAlign: 'right',
  },
});

export default SigninView;
