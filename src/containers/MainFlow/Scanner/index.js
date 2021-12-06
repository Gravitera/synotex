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

    console.log(" ============= sendFaceData activated =========== ", typeof image);
    console.log(" ============= sendFaceData activated =============", image.slice(0,20));
    
    //fetch('http://3.34.136.40:3030/submit', {
    fetch("http://synotex-load-balancer-237167545.ap-northeast-2.elb.amazonaws.com/submit", {
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
        console.log('SCANNER RESPONSE SUCCESS =>', res);
        setLoading(false);

        setResp({"frontImage":res.FrontImage})


      /*
        var temp = {
          FrontImage: image,
          FaceWidth: 0,
          FaceHeight: 0,
          FaceWidthPercent: 0,
          FaceHeightPercent: 0,
          MaskSize: "SS",
          Pentagram: {
            FaceHeight: 0,
            HeadHeight: 0,
            HeadWidth: 0,
            ChinWidth: 0,
            HeadRound: 0,
          },
          PentagramAverage: {
            FaceHeight: 0,
            HeadHeight: 0,
            HeadWidth: 0,
            ChinWidth: 0,
            HeadRound: 0,
          },
          PentagramPredicted: {
            FaceHeight: 0,
            HeadHeight: 0,
            HeadWidth: 0,
            ChinWidth: 0,
            HeadRound: 0,
          },
          ID: 100
        }

        dispatch(addRes(temp));
      */

        dispatch(addRes(res))
        console.log("finish res")
      })
      .catch((err) => {
        setLoading(false);
        
        /*
        props.showAlert(
          err.message
        );
        */
        
        console.log(" ====== error message ", typeof err.message);
        console.log(err.message);
        
        console.log('SCANNER RESPONSE ERROR =>', err);
        var temp = {
          FrontImage: image,
          FaceWidth: 0,
          FaceHeight: 0,
          FaceWidthPercent: 0,
          FaceHeightPercent: 0,
          MaskSize: "N",
          Pentagram: {
            FaceHeight: 0,
            HeadHeight: 0,
            HeadWidth: 0,
            ChinWidth: 0,
            HeadRound: 0,
          },
          PentagramAverage: {
            FaceHeight: 0,
            HeadHeight: 0,
            HeadWidth: 0,
            ChinWidth: 0,
            HeadRound: 0,
          },
          PentagramPredicted: {
            FaceHeight: 0,
            HeadHeight: 0,
            HeadWidth: 0,
            ChinWidth: 0,
            HeadRound: 0,
          },
          ID: 100
        }
        if (err.message == "Network request failed"){
          temp.ID = "NNetwork";
        }
        if (err.message == "JSON Parse error: Unrecognized token '<'"){
          temp.ID = "Unrecognized";
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
