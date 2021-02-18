const initialState = {
    students: [],
    loading: false,
    error: {},
}

const attendanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case "MARK_ATTENDANCE_REQUEST":
            return {
                ...state,
                loading: true
            };
        case "MARK_ATTENDANCE_SUCESS":
            return {
                ...state,
                loading: false,
                error: ''
            };
        case "MARK_ATTENDANCE_FAIL":
            return {
                ...state,
                loading: false,
                error: error.message
            };
        case "FETCH_STUDENTS_OF_BUS_REQUEST":
            return {
                ...state,
                loading: true
            };
        case "FETCH_STUDENTS_OF_BUS_SUCESS":
            return {
                ...state,
                loading: false,
                students: action.payload,
                error: ''
            };
        case "FETCH_STUDENTS_OF_BUS_FAIL":
            return {
                ...state,
                loading: false,
                students: '',
                error: error.message
            };
        default:
            return state;
    }
};


export default attendanceReducer




// const StudentsOfBusReducer = (state = initialState, action) => {
//     switch (action.type) {

//         default:
//             return state;
//     }
// // };


// export default StudentsOfBusReducer






