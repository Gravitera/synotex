import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import AlreadyVerifiedView from './view';
import { forgetPassword, toggleAuthActionCreator } from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import { onSnackbar } from '../../../store/actions/layoutActions';
import { getStorageItem, validateEmail } from '../../../utils';


const AlreadyVerified = (props) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState({ error: false, message: '' });
  const [driverData, setDriverData] = useState()



  useEffect(() => {
    // (async () => {
    props.navigation.addListener('focus', async () => {
      const driver_data = await getStorageItem("Drivers")
      // console.log("ALREADY VERFIIFED PROPS", driver_data)
      setDriverData(driver_data)
      props.fetchStudents(driver_data)
    })
    // })() 
  }, [])

  // console.log("object1", driverData)
  // console.log("object2",driverData[0]?.name)

  const onChange = (data) => {
    const { text, name } = data;
    if (name.toLowerCase() === 'email') {
      setEmail(text);
    }
  };

  const onBlur = (name) => {
    // console.log('name in blur');
    if (name.toLowerCase() === 'email') {
      const res = validateEmail(email);
      if (!res) {
        setEmailError({ error: true, message: 'Please enter a valid email.' });
      } else {
        setEmailError({ error: false, message: '' });
      }
    }
  };

  const onSubmit = () => {
    try {
      if (email.trim() && !emailError.error) {
        setLoading(true);

        //   forgetPassword(
        //     email,
        //     (res) => {
        //       console.log('res of FORGET -->', res);
        //       setLoading(false);
        //     },
        //     (err) => {
        //       props.showAlert('Invaild Email, please try again.');
        //       console.log('err of Forget -->', err);
        //       setLoading(false);
        //     },
        //   );
        // } else {
        props.showAlert('Please fill all fields with valid data.');
      }
    } catch (e) {
      console.log('e in forget -->', e);
      setLoading(false);
    }
  };

  const navigateToSignup = () => {
    props.navigation.navigate('Signup');
  };

  const viewProps = {
    email,
    loading,
    emailError,
    onChange,
    onBlur,
    onSubmit,
    navigateToSignup,
    driverData
  };

  return <AlreadyVerifiedView {...viewProps} />;
};

const mapStateToProps = (state) => {
  console.log("ALRWADY VERFIFE STATE", state)
  return {
    open: state.layoutReducer.snackbarState,
    message: state.layoutReducer.snackbarMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAuth: (data) => dispatch(toggleAuthActionCreator(data)),
    showAlert: (message) => dispatch(onSnackbar(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlreadyVerified);
