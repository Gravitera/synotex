import React, { useState, useEffect } from 'react';
import ScannerView from './view';
import RNFetchBlob from 'rn-fetch-blob';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {
  studentsOfSingleBus,
  markAttendance,
  addRes,
} from '../../../store/actions/attendanceActions';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { onSnackbar } from '../../../store/actions/layoutActions';
import { getStorageItem, setStorageItem } from '../../../utils';
import moment, { utc } from 'moment';
import _ from 'react-native-google-places';

const Scanner = (props) => {
  const dispatch = useDispatch();
  const storeProfile = useSelector((store) => store);

  const [loading, setLoading] = useState(false);
  const [bus, setBusId] = useState('');
  const [onboardStudents, setOnboardStudents] = useState({});
  const [action, setAction] = useState(false);
  const [actionImage, setActionImage] = useState();
  const [onboardCount, setOnboardCount] = useState(0);
  const [busIdentity, setBusIdentity] = useState('');

  const [resp, setResp] = useState({});

  var [FaceWidth, setFaceWidth] = useState(100);
  var [FaceHeight, setFaceHeight] = useState(100);
  var [FaceWidthPercent, setFaceWidthPercent] = useState(100);
  var [FaceHeightPercent, setFaceHeightPercent] = useState(100);
  var [FrontImage, setFrontImage] = useState('');
  var [MaskSize, setMaskSize] = useState('');

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

  const onNext = () => {
    console.log(" =================================================================== ");
    console.log(" =================================================================== ");
    console.log(" =================================================================== ");
    console.log(" =================================================================== ", resp);
    props.navigation.navigate("response", resp)

  }

  const sendFaceData = (image) => {
    setLoading(false);

    /*
    const resp_val = await fetch('http://52.79.235.238:3030/submit',{
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
    });

    setLoading(false);
    setResponse(res);
    */

    console.log(" ============= sendFaceData activated =========== ");
    
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
        console.log(" res.FaceWidth   ", res.FaceWidth);
        setLoading(false);

        setResp({"frontImage":res.FrontImage})
        /*
        setFaceWidth(res.FaceWidth);
        setFaceHeight(res.FaceHeight);
        setFaceWidthPercent(res.FaceWidthPercent);
        setFaceHeightPercent(res.FaceHeightPercent);
        setFrontImage(res.FrontImage);
        setMaskSize(res.MaskSize);
        */

       

       console.log(" ========== res type  ======= ", typeof res);
       console.log(" ========== res type  ======= ", res);
        console.log(" ========== setResponse ======  ", FaceWidth);
        console.log(" ========== setResponse ======  ", FaceHeight);
        console.log(" ========== setResponse ======  ", FaceWidthPercent);
//        props.navigation.navigate("scanner2", res)

dispatch(addRes(res))
        console.log("finish res")
      })
      .catch((err) => {
        setLoading(false);
        props.showAlert(
          err.message
        );
        console.log('ERROR =>', err);
        const temp = {
          FrontImage: '',
          FaceWidth: 110,
          FaceHeight: 120,
          FaceWidthPercent: 115,
          FaceHeightPercent: 125,
          MaskSize: "L",
          Pentagram: {
            FaceHeight: 101,
            HeadHeight: 105,
            HeadWidth: 98,
            ChinWidth: 99,
            HeadRound: 110,
          },
          PentagramAverage: {
            FaceHeight: 102,
            HeadHeight: 115,
            HeadWidth: 99,
            ChinWidth: 100,
            HeadRound: 111,
          },
          PentagramPredicted: {
            FaceHeight: 101,
            HeadHeight: 105,
            HeadWidth: 98,
            ChinWidth: 99,
            HeadRound: 110,
          }
        }

        console.log(" ============= dispatch temp   ", temp);
        dispatch(addRes(temp));
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
    onNext,
    loading,
    onboardStudents,
    action,
    actionImage,
    onboardCount,
    FaceWidth,
    FaceHeight,
    FaceWidthPercent,
    FaceHeightPercent,
    FrontImage,
    MaskSize
  };

  return <ScannerView {...viewProps} />;
};
const mapStateToProps = (state) => {
  console.log("SCANEER STATE", state.attendanceReducer?.onboardStudents)
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

export default connect(mapStateToProps, mapDispatchToProps)(Scanner);
