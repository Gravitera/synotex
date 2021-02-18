import React, { useState, useEffect } from 'react';
import ScannerView2 from './view';
import RNFetchBlob from 'rn-fetch-blob';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {
  studentsOfSingleBus,
  markAttendance,
} from '../../../store/actions/attendanceActions';

import { connect } from 'react-redux';
import { onSnackbar } from '../../../store/actions/layoutActions';
import { getStorageItem, setStorageItem } from '../../../utils';
import moment, { utc } from 'moment';

const Scanner2 = (props) => {
  const [loading, setLoading] = useState(false);
  const [bus, setBusId] = useState('');
  const [onboardStudents, setOnboardStudents] = useState({});
  const [action, setAction] = useState(false);
  const [actionImage, setActionImage] = useState();
  const [onboardCount, setOnboardCount] = useState(0);
  const [busIdentity, setBusIdentity] = useState('');

  // useEffect(() => {
  //   (async () => {
  //     const data = await getStorageItem('Onboard');
  //     console.log('DATA=======>', data);
  //     setOnboardStudents(data);
  //   })();
  // }, [getStorageItem('Onboard')]);

  // console.log("BUSSSSSSSSS NO OUTTTTTTTt", busIdentity)

  useEffect(() => {
    console.log("CURRENTLY ONBOARD ===>", props.route.params)
  }, [])

  // Geocoder.init('AIzaSyDEZ9x7GI_cI7oU3pfFBtoQ2o8WXkdN2rc');
  Geocoder.init('AIzaSyCDtfogkPN0nM6icakED7RGR1lmUrYukqo');

  const startAction = (activity) => {
    setAction(true);
    setActionImage(activity);
    // setInterval(() => {
    //   setAction(false);
    //   setActionImage();
    // }, 2000);
  };

  const sendFaceData = (image) => {
    setLoading(true);

    fetch('http://52.79.235.238:3030/submit', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(
        {
          ...props.route.params,
          "FrontImage": image
        })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('SUCCESS =>', res);
        setLoading(false);
        props.navigation.navigate("response", res)
      })
      .catch((err) => {
        setLoading(false);
        props.showAlert(
          err.message
        );
        console.log('ERROR =>', err);
      });
  };

  const sendLocation = (image) => {
    console.log('connecting...');
    setLoading(true);
    try {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log('POS===', position);
          Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then((json) => {
              console.log('POS123===', json);
              const position = json.results[0].address_components[0].short_name;
              console.log('YOOOO', busIdentity, position);
              RNFetchBlob.fetch(
                'POST',
                'https://facial-attendance-system.tk/api/predict_face',
                {
                  'Content-Type': 'multipart/form-data',
                  Authorization:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidXNlciIsInBhc3MiOiJwYXNzd29yZCJ9.KrmQH1gT5pE-kd8wYhgXDkQMp1gah6sDu79ns9Ml9pg',
                },
                [
                  {
                    name: 'image',
                    filename: 'photo.jpg',
                    type: 'image/png',
                    data: RNFetchBlob.wrap(image),
                  },
                  { name: 'busid', data: busIdentity },
                  { name: 'position', data: position },
                ],
              )
                .then((res) => res.json())
                .then(async (res) => {
                  // setLoading(false);
                  res.dateTime = new Date();
                  res.date = moment().local().format('l');
                  console.log('SUCCESS =>', res);
                  if (res.status == 200) {
                    // props.showAlert('Attendance Marked');
                    setLoading(false);
                    // props.showAlert('Attendance Marked');
                    if (res.activity === 'Check In') {
                      startAction('enter');
                      startAction('leave');
                    }
                    let onboardCount =
                      (await getStorageItem('OnboardCount')) || 0;
                    const onboardStudents =
                      (await getStorageItem('Onboard')) || {};
                    // console.log('onboard students', onboardStudents);

                    if (res.activity === 'Check In') {
                      if (!onboardStudents[res.date]) {
                        onboardStudents[res.date] = {};
                      }
                      console.log('setting check in', res.dateTime);
                      onboardStudents[res.date][res.studentId] = {
                        checkIn: res.dateTime,
                      };
                      onboardCount++;
                      // console.log('Student Checked In', onboardStudents);
                    } else if (res.activity === 'Check Out') {
                      // console.log('setting check out', res.dateTime);

                      onboardStudents[res.date][res.studentId].checkOut =
                        res.dateTime;
                      onboardCount--;
                      // console.log('Student Checked Out', onboardStudents);
                    }
                    setStorageItem('Onboard', onboardStudents);
                    setStorageItem('OnboardCount', onboardCount);
                    setOnboardCount(onboardCount);
                    console.log('updating on board students', onboardStudents);
                    setOnboardStudents(onboardStudents);
                    // dispatch(markAttendanceSucess());
                  } else {
                    // throw new Error(res)
                    props.showAlert(res.msg);
                    startAction('close');
                    setLoading(false);
                  }
                })
                .catch((err) => {
                  console.log('BHAI PTCL HATWADO 1');
                  setLoading(false);
                  props.showAlert(
                    'Face not detected, Please align your face with the bounding box.',
                  );
                  console.log('close 2');
                  startAction('close');
                  // console.log("ERROR =>", JSON.stringify(err))
                  console.log('ERROR =>', err);
                });
              // return position
              // console.log("data =>", { studentId, position });
              // props.markAttendance(
              //   { studentId, position },
              //   // { studentId: "5f7de291a28b040023c104b4", position: "Plot abc" },
              //   (res) => {
              //     // console.log("response in scanner", res)
              //     setLoading(false);
              //     props.showAlert('Attendance Marked');
              //     if (res.data.activity === "Check In") {
              //       startAction("enter");
              //     }
              //     else if (res.data.activity === "Check Out") {
              //       startAction("leave");
              //     }
              //   },
              //   (err) => {
              //     props.showAlert('Attendance Failed');
              //     startAction("close");
              //     console.log('err of ResetPasswordEmail -->', err);
              //     setLoading(false);
              //   },
              // );
            })
            .catch((error) => {
              setLoading(false);
              console.log('eeee===', error, error.message);
            });
        },
        (error) => {
          console.log('BHAI PTCL HATWADO');

          // See error code charts below.
          console.log(error.code, error.message);
          setLoading(false);
          props.showAlert('No Internet Connection');
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    } catch (error) {
      setLoading(false);
      props.showAlert('No Internet Connection');
    }
    // setLoading(true);
  };

  const viewProps = {
    ...props,
    sendFaceData,
    sendLocation,
    loading,
    onboardStudents,
    action,
    actionImage,
    onboardCount,
  };

  return <ScannerView2 {...viewProps} />;
};
const mapStateToProps = (state) => {
  // console.log("SCANEER STATE", state.attendanceReducer?.onboardStudents)
  return {
    open: state.layoutReducer.snackbarState,
    message: state.layoutReducer.snackbarMessage,
    students: state.attendanceReducer?.students,
    // currentlyOnboard: state.attendanceReducer?.currentlyOnboard
    // onboardStudents: state.attendanceReducer?.onboardStudents,
    // loading: state.attendanceReducer?.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showAlert: (message) => dispatch(onSnackbar(message)),
    markAttendance: (data, Sucess, Error) =>
      dispatch(markAttendance(data, Sucess, Error)),
    studentsOfSingleBus: (studentData) =>
      dispatch(studentsOfSingleBus(studentData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Scanner2);
