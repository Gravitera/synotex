import React, {useState, useContext} from 'react';
import ResetPasswordEmailView from './view';
import {validateFullName, validateEmail} from '../../../utils';
import {signUpEmail} from '../../../store/actions/authActions';
import {connect} from 'react-redux';
import {onSnackbar} from '../../../store/actions/layoutActions';
import { useNavigation } from '@react-navigation/core';

const ResetPasswordEmail = (props) => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState({error: false, message: ''});


  const onChange = (data) => {
    const {text, name} = data;
    if (name.toLowerCase() === 'email') {
      setEmail(text);
  };
  }
  const onBlur = (name) => {
    if (name.toLowerCase() === 'email') {
      const res = validateEmail(email);
      if (!res) {
        setEmailError({error: true, message: 'Please enter a valid email.'});
      } else {
        setEmailError({error: false, message: ''});
      }
    } 
  };
  
  const navigateToSignin = () => {
    props.navigation.navigate('Signin');
  };
  
  const onSubmit = () => {
    
    try {
      if (
        
        email.trim() &&
        !emailError.error ) {
          
          // if (!checked) {
            //   props.showAlert('Please agree to Terms & Conditions to continue.');
            //   return;
            // }
            setLoading(true);
            const RESET_PASSWORD_EMAIL = {
              email,
              flag:"forgotPassword"
            };
            console.log("SIGN UP EMAIL",RESET_PASSWORD_EMAIL)
            
            props.signUpEmail(
              RESET_PASSWORD_EMAIL,
              (res) => {
                console.log('res of SIGNUP -->', res);
                setLoading(false);
            props.showAlert('Email Verified Successfully');
            navigation.navigate('ResetOldPassword',{
              email:email
            })
          },
          (err) => {
            props.showAlert('Invalid Email');
            console.log('err of SIGNUP -->', err);
            setLoading(false);
          },
        );
      }
      else {
        props.showAlert('Please fill all fields with valid data.');
      }
    } catch (e) {
      console.log('e in signup -->', e);
      setLoading(false);
    }
  };

  const viewProps = {
    email,
    emailError,
   
    // checked,
    loading,
    onChange,
  
    navigateToSignin,
    
    onBlur,
    onSubmit,
  };

  return <ResetPasswordEmailView {...viewProps} />;
};

const mapStateToProps = (state) => {
  return {
    open: state.layoutReducer.snackbarState,
    message: state.layoutReducer.snackbarMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAuth: (data) => dispatch(toggleAuthActionCreator(data)),
    showAlert:(message) => dispatch(onSnackbar(message)),
    signUpEmail:(RESET_PASSWORD_EMAIL,Sucess,Error)=>dispatch(signUpEmail(RESET_PASSWORD_EMAIL,Sucess,Error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordEmail);
