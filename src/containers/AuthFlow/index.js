import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import Signin from './Signin';
import Signup from './Signup';
import IntroSlider from './IntroSlider';
import AdvertisementIG from './AdvertisementIG';
import AdvertisementOanda from './AdvertisementOanda';
import SignupOTP from './SignupOTP';
import ForgetPasswordEmail from './ForgetPasswordEmail'
import ForgetPasswordOTP from './ForgetPasswordOTP'
import ForgetPasswordPIN from './ForgetPasswordPIN'
import SignupPin from './SignupPin';
import ResetPasswordEmail from '../MainFlow/ResetPasswordEmail'
import ResetOldPassword from '../MainFlow/ResetOldPassword'
import ResetNewPin from '../MainFlow/ResetNewPin'
import LogOut from '../MainFlow/LogOut'
import AlreadyVerified from './AlreadyVerified';

import { connect } from 'react-redux';
// import LogIn from './LogIn';
import LoginEmail from './LoginEmail';
// import LoginPinView from './LoginPin/view';
import LoginPin from './LoginPin';

const Stack = createStackNavigator();

const AuthFlow = (props) => {
  console.log('initial flow on -->', props.initial);
  const initialRoute = props.initial ? 'Signin' : 'IntroSlider';
  console.log('route -->', initialRoute);
  return (
    <Stack.Navigator headerMode="none" initialRouteName={"AlreadyVerified"}>
      <Stack.Screen name="AlreadyVerified" component={AlreadyVerified} />
      <Stack.Screen name="Signin" component={Signin} />
      {/* <Stack.Screen name="Login" component={LogIn} /> */}
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="SignupOTP" component={SignupOTP} />
      <Stack.Screen name="SignupPin" component={SignupPin} />
      <Stack.Screen name="ForgetPasswordEmail" component={ForgetPasswordEmail} />
      <Stack.Screen name="ForgetPasswordOTP" component={ForgetPasswordOTP} />
      <Stack.Screen name="ForgetPasswordPIN" component={ForgetPasswordPIN} />
      <Stack.Screen name="LoginEmail" component={LoginEmail} />
      <Stack.Screen name="LoginPin" component={LoginPin} />
    </Stack.Navigator>
  );
};

const mapStateToProps = ({ layoutReducer }) => {
  return {
    initial: layoutReducer.initial,
  };
};

export default connect(mapStateToProps, null)(AuthFlow);
