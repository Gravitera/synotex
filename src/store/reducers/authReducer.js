import {
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    SIGNUP_ERROR,
    SIGNUP_SUCCESS,
    SIGNOUT_SUCCESS,
} from "../config/type";

// const initState = {
// 	user: null
// };

// const auth = (state = initState, action) => {
// 	switch (action.type) {
// 		case "toggleAuth":
// 			return {
// 				...state,
// 				user: action.payload,
// 			};

// 		default:
// 			return state;
// 	}
// };



import {
    SIGNUP_EMAIL_REQUEST, SIGNUP_EMAIL_SUCESS, SIGNUP_EMAIL_FAIL,
    LOGIN_REQUEST, LOGIN_SUCESS, LOGIN_FAIL,
    CONFIRM_EMAIL_REQUEST, CONFIRM_EMAIL_SUCESS, CONFIRM_EMAIL_FAIL,
    CONFIRM_OTP_REQUEST, CONFIRM_OTP_SUCESS, CONFIRM_OTP_FAIL,
    NEW_PASSWORD_REQUEST, NEW_PASSWORD_SUCESS, NEW_PASSWORD_FAIL,
    UPDATE_EMAIL_REQUEST, UPDATE_EMAIL_SUCESS, UPDATE_EMAIL_FAIL,
    UPDATE_EMAIL_OTP_REQUEST, UPDATE_EMAIL_OTP_SUCESS, UPDATE_EMAIL_OTP_FAIL,
    UPDATE_OLD_PASSWORD_REQUEST, UPDATE_OLD_PASSWORD_SUCESS, UPDATE_OLD_PASSWORD_FAIL,
    LOGOUT_SUCESS
} from "../config/type";

const initialState = {
    signupEmail: '',
    loginData: [],
    confirmResetEmail: '',
    confirmOTP: '',
    newPassword: '',
    updatedEmail: '',
    updatedEmailOTP: '',
    oldpassword: '',
    loading: true,
    error: "",
    isOpen: false,
    loginemailData:''
}

const auth = (state = initialState, action) => {
    // console.log("LOGIN SUCESSS",action)
    switch (action.type) {
        case "toggleAuth":
            return {
                ...state,
                user: action.payload,
            };
        case "SIGNUP_EMAIL_REQUEST":
            return {
                ...state,
                loading: true
            };
        case "SIGNUP_EMAIL_SUCESS":
            return {
                ...state,
                loading: false,
                signupEmail: action.payload,
                error: ''

            };
        case "SIGNUP_EMAIL_FAIL":
            return {
                ...state,
                loading: true,
                signupEmail: '',
                error: error.message
            };
        case "LOGIN_REQUEST":
            return {
                ...state,
                loading: true
            };
        case "LOGIN_SUCESS":
            return {
                ...state,
                loading: false,
                loginData: action.payload,
                error: ''

            };
        case "LOGIN_FAIL":
            console.log("LOGIN FAIL REDUCER")
            return {
                ...state,
                loading: true,
                loginData: '',
                error: action.payload
            };
        case "CONFIRM_EMAIL_REQUEST":
            return {
                ...state,
                loading: true
            };
        case "CONFIRM_EMAIL_SUCESS":
            // console.log("CONFIRM EMAIL SUCCESSSSSSSSSSSS",action.payload)   
            return {

                ...state,
                loading: false,
                confirmResetEmail: action.payload,
                error: ''

            };
        case "CONFIRM_EMAIL_FAIL":

            return {
                ...state,
                loading: true,
                confirmResetEmail: '',
                error: error.message
            };
        case "CONFIRM_OTP_REQUEST":
            return {
                ...state,
                loading: true
            };
        case "CONFIRM_OTP_SUCESS":
            // console.log("CONFIRM OTP",action.payload)
            return {
                ...state,
                loading: false,
                confirmOTP: action.payload,
                error: ''

            };
        case "CONFIRM_OTP_FAIL":
            return {
                ...state,
                loading: true,
                confirmOTP: '',
                error: error.message
            };
        case "NEW_PASSWORD_REQUEST":
            return {
                ...state,
                loading: true
            };
        case "NEW_PASSWORD_SUCESS":
            return {
                ...state,
                loading: false,
                newPassword: action.payload,
                error: ''

            };
        case "NEW_PASSWORD_FAIL":
            return {
                ...state,
                loading: true,
                newPassword: '',
                error: error.message
            };

        case "UPDATE_EMAIL_REQUEST":
            return {
                ...state,
                loading: true
            };
        case "UPDATE_EMAIL_SUCESS":
            return {
                ...state,
                loading: false,
                updatedEmail: action.payload,
                error: ''

            };
        case "UPDATE_EMAIL_FAIL":
            return {
                ...state,
                loading: true,
                updatedEmail: '',
                error: error.message
            };
        case "UPDATE_EMAIL_OTP_REQUEST":
            return {
                ...state,
                loading: true
            };
        case "UPDATE_EMAIL_OTP_SUCESS":
            return {
                ...state,
                loading: false,
                updatedEmailOTP: action.payload,
                error: ''

            };
        case "UPDATE_EMAIL_OTP_FAIL":
            return {
                ...state,
                loading: true,
                updatedEmailOTP: '',
                error: error.message
            };
        case "LOGOUT_REQUEST":
            return {
                ...state,
                loading: true
            };
        case "LOGOUT_SUCESS":
            return {
                state: {},
                loading: false,
                oldpassword: action.payload,
                error: ''

            };
        case "LOGOUT_FAIL":
            return {
                ...state,
                loading: true,
                oldpassword: '',
                error: error.message
            };
        case "OPEN_MODAL_SUCESS":
            console.log("OPEN MODAL SUCESS")
            return {
                ...state,
                isOpen: true

            };
        case "OPEN_MODAL_FAIL":
            console.log("CLOSE MODAL SUCESS")
            return {
                ...state,
                isOpen: false

            }; case "LOGIN_EMAIL_REQUEST":
            return {
                ...state,
                loading: true
            };
        case "LOGIN_EMAIL_SUCESS":
            return {
                ...state,
                loading: false,
                loginemailData: action.payload,
                error: ''

            };
        case "LOGIN_EMAIL_FAIL":
            return {
                ...state,
                loading: true,
                loginemailData: '',
                error: error.message
            };
        case LOGOUT_SUCESS:
            console.log("LOGOUT_SUCESSS")
            return {

                state: {}


            };





        default:
            return state;
    }
};


export default auth


