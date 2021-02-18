import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthLayout from '../../../components/AuthLayout';
import Input from '../../../components/TextInput';
import { color, font } from '../../../../theme';

const LoginEmailView = (props) => {
  const layoutProps = {
    heading: 'Please sign in to your account',
    buttonLabel: 'Submit',
    clickText: "Don't have an account?",
    onAuthToggle: props.navigateToSignup,
    onPress: props.onSubmit,
    page: 'Login',
    loading: props.loading
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
        {/* <Input
          label="Password"
          error={props.pinError.error}
          errorText={props.pinError.message}
          isSecure={true}
          onBlur={props.onBlur}
          value={props.pin}
          onChange={props.onChange}
        /> */}
        <View style={styles.actionWrapper}>

          <View style={{ justifyContent: "flex-start" }}>
            <Text style={styles.forgetText} onPress={props.onForgetPress}>
              Forgot Pin?
            </Text>
          </View>

        </View>

      </AuthLayout>
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

export default LoginEmailView;