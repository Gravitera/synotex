import axios from 'axios';
import {getStorageItem, setStorageItem} from '../../utils';
import {onSnackbar} from '../actions/layoutActions';

// Mark Attendance

export const markAttendanceReq = () => {
  return {
    type: 'MARK_ATTENDANCE_REQUEST',
  };
};
export const markAttendanceSucess = () => {
  return {
    type: 'MARK_ATTENDANCE_SUCESS',
  };
};
export const markAttendanceFail = (error) => {
  return {
    type: 'MARK_ATTENDANCE_FAIL',
    payload: error,
  };
};

export const markAttendance = (data, onSuccess, onError) => {
  console.log('attendance data ', data);
  return async (dispatch, getState) => {
    let token = await getStorageItem('Token');
    console.log('USER DATA ACTION', token);

    dispatch(markAttendanceReq);
    axios
      .post('https://xehen-lynx.herokuapp.com/students/markAttendance', data, {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then(async (response) => {
        console.log('REDUX ATTENDANCE RESPONSE', response.data);

        if (response.status == 200) {
          let onboardCount = (await getStorageItem('OnboardCount')) || 0;
          const onboardStudents = (await getStorageItem('Onboard')) || {};
          console.log('onboard students', onboardStudents);

          if (response.data?.activity === 'Check In') {
            if (!onboardStudents[response.data?.date]) {
              onboardStudents[response.data?.date] = {};
            }
            onboardStudents[response.data?.date][response.data?.studentId] = {
              checkIn: response.data?.dateTime,
            };
            onboardCount++;
            console.log('Student Checked In', onboardStudents);
          } else if (response.data?.activity === 'Check Out') {
            onboardStudents[response.data?.date][
              response.data?.studentId
            ].checkOut = response.data?.dateTime;
            onboardCount--;
            console.log('Student Checked Out', onboardStudents);
          }
          setStorageItem('Onboard', onboardStudents);
          setStorageItem('OnboardCount', onboardCount);
          dispatch(markAttendanceSucess());
          onSuccess(response);
        } else {
          onError(response);
        }
      })
      .catch((error) => {
        console.log('ERRor', error.message);
        if (error.message === 'Network Error') {
          onSnackbar('No Internet Connection');
          dispatch(markAttendanceFail(errorMsg));
        } else {
          onError(error);
          // onSnackbar('No Internet Connection');
          const errorMsg = error.message;
          dispatch(markAttendanceFail(errorMsg));
        }
      });
  };
};

export const fetchStudentsofaBusReq = () => {
  return {
    type: 'FETCH_STUDENTS_OF_BUS_REQUEST',
  };
};
export const fetchStudentsofaBusSucess = (studentData) => {
  return {
    type: 'FETCH_STUDENTS_OF_BUS_SUCESS',
    payload: studentData,
  };
};
export const fetchStudentsofaBusFail = (error) => {
  return {
    type: 'FETCH_STUDENTS_OF_BUS_FAIL',
    payload: error,
  };
};

export const studentsOfSingleBus = (data) => {
  console.log('students of signle bus data ', data);

  return async (dispatch) => {
    dispatch(fetchStudentsofaBusReq);
    axios
      .post('https://xehen-lynx.herokuapp.com/students/students', {
        id: data,
      })
      .then((response) => {
        console.log('REPSONSE', response);
        if (response.status == 201) {
          // const signupEmail = response.data
          console.log('REDUX STUDENTS OF SINGLE RESPONSE', response.data);
          const students = response.data;
          dispatch(fetchStudentsofaBusSucess(students));
          // onSuccess(response)
        } else {
          // onError(response)
        }
      })
      .catch((error) => {
        console.log('ERRor', error);
        // onError(error)
        const errorMsg = error.message;
        dispatch(fetchStudentsofaBusFail(errorMsg));
      });
  };
};

// Mark Attendance
