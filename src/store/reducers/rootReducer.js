import { combineReducers } from "redux";
import auth from './authReducer';
import layoutReducer from "./layoutReducer"
import attendanceReducer from "./attendanceReducer"
// import StudentsOfBusReducer from './StudentsOfBusReducer'

const rootReducer = combineReducers({
    auth,
    layoutReducer,
    attendanceReducer,
    // StudentsOfBusReducer
})

export default rootReducer;