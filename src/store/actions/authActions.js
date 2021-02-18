import services, { baseUrl } from "../config/fetchConfig";
// import {
// 	SIGNUP_EMAIL_REQUEST, SIGNUP_EMAIL_SUCESS, SIGNUP_EMAIL_FAIL,
// 	LOGIN_REQUEST, LOGIN_SUCESS, LOGIN_FAIL,
// 	CONFIRM_EMAIL_REQUEST, CONFIRM_EMAIL_SUCESS, CONFIRM_EMAIL_FAIL,
// 	CONFIRM_OTP_REQUEST, CONFIRM_OTP_SUCESS, CONFIRM_OTP_FAIL,
// 	NEW_PASSWORD_REQUEST, NEW_PASSWORD_SUCESS, NEW_PASSWORD_FAIL,
// 	UPDATE_EMAIL_REQUEST, UPDATE_EMAIL_SUCESS, UPDATE_EMAIL_FAIL,
// 	UPDATE_EMAIL_OTP_REQUEST, UPDATE_EMAIL_OTP_SUCESS, UPDATE_EMAIL_OTP_FAIL,
// 	UPDATE_OLD_PASSWORD_REQUEST, UPDATE_OLD_PASSWORD_SUCESS, UPDATE_OLD_PASSWORD_FAIL,
// 	LOGOUT_SUCESS
// } from "../config/type";
// import { getStorageItem, setStorageItem } from "../../utils";
import axios from 'axios';

export const toggleAuthActionCreator = (data) => ({
	type: "toggleAuth",
	payload: data,
})



export const fetchloginReq = () => {
	return {
		type: "LOGIN_REQUEST"
	}
}
export const fetchloginSucess = (login) => {
	// //console.log("LOGIN SASAAS", login)
	return {
		type: "LOGIN_SUCESS",
		payload: login
	}
}
export const fetchloginlFail = (error) => {
	return {
		type: "LOGIN_FAIL",
		payload: error
	}
}

//LOGIN SCREEN ACTION
export const login = (logindata, onSuccess, onError) => {

	return async (dispatch) => {
		console.log("LOGINSCREEN REDUX", logindata.email)
		console.log("LOGINSCREEN REDUX", logindata.pin)


		// return (dispatch) => {

		// dispatch(fetchloginReq)
		dispatch(fetchloginReq())
		axios.post('https://xehen-lynx.herokuapp.com/driver/login', {
			"email": logindata.email,
			"password": logindata.pin
		})
			.then(response => {
				console.log("REDUX SIGNIN RESPONSE", response)
				if (response.status == 200) {
					onSuccess(response)
					const login = response.data
					//console.log(" wignupEmail USERS", login)
					dispatch(fetchloginSucess(login))

					// fetchloginSucess(login)
				}
				else {
					onError(response)
				}

			})
			.catch(error => {
				console.log("ERRor", error)
				onError(error.message)
				const errorMsg = error

				dispatch(fetchloginFail(error.message))
				// fetchloginlFail(logindata)
			})
	}

};


export const fetchloginEmailReq = () => {
	return {
		type: "LOGIN_EMAIL_REQUEST"
	}
}
export const fetchloginEmailSucess = (loginEmail) => {
	// //console.log("LOGIN SASAAS", login)
	return {
		type: "LOGIN_EMAIL_SUCESS",
		payload: loginEmail
	}
}
export const fetchloginEmailFail = (error) => {
	return {
		type: "LOGIN_EMAIL_FAIL",
		payload: error
	}
}

//LOGIN SCREEN ACTION
export const loginScreenEmail = (logindata, onSuccess, onError) => {

	const flag = logindata.flag
	console.log("LOGIN EMAIL SCREEN 1 REDUX", logindata.email)

	return async (dispatch) => {

		console.log("LOGIN EMAIL SCREEN 2 REDUX", logindata.email)



		dispatch(fetchloginEmailReq())
		axios.post('https://xehen-lynx.herokuapp.com/driver/verifyEmail', {
			"email": logindata.email, flag

		})
			.then(response => {
				console.log("REDUX SIGNIN RESPONSE", response)
				if (response.status == 200) {
					onSuccess(response)
					const login = response.data
					//console.log(" wignupEmail USERS", login)
					dispatch(fetchloginEmailSucess(login))

					// fetchloginSucess(login)
				}
				else {
					onError(response)
				}

			})
			.catch(error => {
				console.log("ERRor", error)
				onError(error.message)
				const errorMsg = error.message

				dispatch(fetchloginEmailFail(errorMsg))
				// fetchloginlFail(logindata)
			})
	}

};




//SIGN UP EMAIL FOR FIRST TIME

export const fetchsignupEmailReq = () => {
	return {
		type: "SIGNUP_EMAIL_REQUEST"
	}
}
export const fetchsignupEmailSucess = (signupEmail) => {
	return {
		type: "SIGNUP_EMAIL_SUCESS",
		payload: signupEmail
	}
}
export const fetchsignupEmailFail = (error) => {
	return {
		type: "SIGNUP_EMAIL_FAIL",
		payload: error
	}
}


export const signUpEmail = (SIGNUP_DATA, onSuccess, onError) => {


	console.log("SIGNUP EMAIL REDUX ", SIGNUP_DATA.email)
	const signupEmail = SIGNUP_DATA.email
	const flag = SIGNUP_DATA.flag
	return async (dispatch) => {

		dispatch(fetchsignupEmailReq)
		// fetchsignupEmailReq
		axios.post('https://xehen-lynx.herokuapp.com/driver/verifyEmail', {
			"email": signupEmail, flag
		})
			.then(response => {

				if (response.status == 200) {
					const signupEmail = response.data
					console.log("REDUX SIGNUP RESPONSE", response)
					console.log(" wignupEmail USERS", signupEmail)
					dispatch(fetchsignupEmailSucess(signupEmail))
					// fetchsignupEmailSucess(signupEmail)
					onSuccess(response)
				}
				else {
					onError(response)
				}


			})
			.catch(error => {
				console.log("ERRor", error)
				onError(error.message)
				const errorMsg = error.message

				dispatch(fetchsignupEmailFail(errorMsg))
				// fetchsignupEmailFail(errorMsg)
			})
	}

};





export const fetchOTPReq = () => {
	return {
		type: "CONFIRM_OTP_REQUEST"
	}
}
export const fetchOTPSucess = (OTPRP) => {
	return {
		type: "CONFIRM_OTP_SUCESS",
		payload: OTPRP
	}
}
export const fetchOTPFail = (error) => {
	return {
		type: "CONFIRM_OTP_FAIL",
		payload: error
	}
}


export const confirmOTP = (CONFIRMOTPRESETPASSWORD_DATA, onSuccess, onError) => {

	console.log("CONFIRM OTP SCREEN REDUX", CONFIRMOTPRESETPASSWORD_DATA.email)
	console.log("CONFIRM OTP SCREEN REDUX", CONFIRMOTPRESETPASSWORD_DATA.pin)

	// //console.log("CONFIRM OTP RESET PASSWORD SCREEN REDUX",email)

	return async (dispatch) => {

		dispatch(fetchOTPReq)
		// fetchOTPReq()
		axios.post('https://xehen-lynx.herokuapp.com/driver/verifyOTP', {
			"email": CONFIRMOTPRESETPASSWORD_DATA.email,
			"OTPcode": CONFIRMOTPRESETPASSWORD_DATA.pin
		})
			.then(response => {
				console.log("REDUX CONFIRM OTP RESPONSE", response)
				if (response.status == 200) {

					onSuccess(response)
					const OTPRP = response.data
					//console.log(" OTPRP", OTPRP)
					dispatch(fetchOTPSucess(OTPRP))
					// fetchOTPSucess(OTPRP)
				}
				else {
					onError(response)
				}

			})
			.catch(error => {
				console.log("ERRor OTP ", error)
				onError(error.message)
				const errorMsg = error.message
				dispatch(fetchOTPFail(errorMsg))
				// fetchOTPFail(errorMsg)

			})
	}

};

//CONFIRM NEW PASSWORD RESET SCREEN


export const fetchNewPasswordReq = () => {
	return {
		type: "NEW_PASSWORD_REQUEST"
	}
}
export const fetchNewPasswordSucess = (OTPRP) => {
	return {
		type: "NEW_PASSWORD_SUCESS",
		payload: OTPRP
	}
}
export const fetchNewPasswordFail = (error) => {
	return {
		type: "NEW_PASSWORD_FAIL",
		payload: error
	}
}


export const fetchNewPassword = (NEWPASSWORD_DATA, onSuccess, onError) => {


	console.log("NEW PASSWORD SCREEN REDUX", NEWPASSWORD_DATA.pin)
	console.log("NEW PASSWORD SCREEN REDUX", NEWPASSWORD_DATA.email)

	return async (dispatch) => {

		dispatch(fetchNewPasswordReq)
		// fetchNewPasswordReq
		axios.post('https://xehen-lynx.herokuapp.com/driver/setPassword', {
			"email": NEWPASSWORD_DATA.email,
			"password": NEWPASSWORD_DATA.pin
		})
			.then(response => {
				console.log("REDUX NEW PASSWORD RESPONSE", response)
				if (response.status == 200) {
					const newPassword = response.data
					console.log("NEW PASSWORD SCREEN", newPassword)
					// fetchNewPasswordSucess(newPassword)
					dispatch(fetchNewPasswordSucess(newPassword))
					onSuccess(response)
				}
				else {
					onError(response)
				}

			})
			.catch(error => {
				console.log("ERRor", error)
				onError(error.message)
				//console.log("NEW PASSWORD SCREEN REDUX", NEWPASSWORD_DATA.password)
				//console.log("NEW PASSWORD SCREEN REDUX", NEWPASSWORD_DATA.email)
				const errorMsg = error.message

				dispatch(fetchNewPasswordFail(errorMsg)
					// fetchNewPasswordFail(errorMsg)
				)
			})
	}

};




export const oldpasswordReq = () => {
	return {
		type: "UPDATE_OLD_PASSWORD_REQUEST"
	}
}
export const oldpasswordSucess = (oldpassword) => {
	return {
		type: "UPDATE_OLD_PASSWORD_SUCESS",
		payload: oldpassword
	}
}
export const oldpasswordFail = (error) => {
	return {
		type: " UPDATE_OLD_PASSWORD_FAIL",
		payload: error
	}
}


export const updateNewPassword = (pindata, onSuccess, onError) => {

	return async (dispatch) => {
		console.log("UPDATED NEW PIN SCREEN REDUX", pindata.email)
		console.log("UPDATED NEW PIN SCREEN REDUX", pindata.oldpin)
		console.log("UPDATED NEW PIN SCREEN REDUX", pindata.pin)
		dispatch(oldpasswordReq)
		axios.post('https://xehen-lynx.herokuapp.com/driver/changePassword', {

			"newPassword": pindata.pin,
			"password": pindata.oldpin,
			"email": pindata.email
		})

			.then(response => {
				console.log("REDUX CHANGEDDDDDDD PASSWORD RESPONSE", response)
				if (response.status == 200) {
					const oldpassword = response.data
					console.log(" OLD PASSWORD CHANGE", oldpassword)
					dispatch(oldpasswordSucess(oldpassword))
					onSuccess(response)
				}
				else {
					onError(response)
				}


			})
			.catch(error => {
				console.log("ERRor", error)
				onError(error.message)
				const errorMsg = error.message

				dispatch(oldpasswordFail(errorMsg))
			})
	}

};


// NEW PASSWORD


export const LogoutReq = () => {
	return {
		type: "LOGOUT_REQUEST"
	}
}
export const LogoutSucess = (Logout) => {
	return {
		type: "LOGOUT_SUCESS",
		payload: Logout
	}
}
export const LogoutFail = (error) => {
	return {
		type: " LOGOUT_FAIL",
		payload: error
	}
}


export const logout = (logoutdata, onSuccess, onError) => {

	console.log(" LOGOUT REDUX", logoutdata.loggedinEmail)
	console.log(" LOGOUT REDUX", logoutdata.pin)

	return async (dispatch) => {
		dispatch(LogoutReq)
		axios.post('https://xehen-lynx.herokuapp.com/driver/verifyPassword', {
			"email": logoutdata.loggedinEmail,
			"password": logoutdata.pin,
		})
			.then(response => {
				console.log("REDUX LOGOUT RESPONSE", response)
				if (response.status == 200) {
					const logout = response.data
					console.log(" OLD PASSWORD CHANGE", logout)
					dispatch(LogoutSucess(logout))
					onSuccess({})
				}
				else {
					onError(response)
				}


			})
			.catch(error => {
				console.log("ERRor", error)
				onError(error.message)

				const errorMsg = error.message

				dispatch(LogoutFail(errorMsg))
			})
	}

};


export const oldPasswordReq = () => {
	return {
		type: "LOGOUT_REQUEST"
	}
}
export const oldPasswordSucess = (Logout) => {
	return {
		type: "LOGOUT_SUCESS",
		payload: Logout
	}
}
export const oldPasswordFail = (error) => {
	return {
		type: " LOGOUT_FAIL",
		payload: error
	}
}


export const oldPasswordConfirm = (logoutdata, onSuccess, onError) => {

	console.log(" OLD PASSWPORD REDUX", logoutdata.email)
	console.log(" OLD PASSWPORD", logoutdata.pin)

	return async (dispatch) => {
		dispatch(oldPasswordReq)
		axios.post('https://xehen-lynx.herokuapp.com/driver/verifyPassword', {
			"email": logoutdata.email,
			"password": logoutdata.pin,
		})
			.then(response => {
				console.log("REDUX LOGOUT RESPONSE", response)
				if (response.status == 200) {
					const logout = response.data
					console.log(" OLD PASSWORD CHANGE", logout)
					dispatch(oldPasswordSucess(logout))
					onSuccess({})
				}
				else {
					onError(response)
				}


			})
			.catch(error => {
				console.log("ERRor", error)
				onError(error.message)
				const errorMsg = error.message

				dispatch(oldPasswordFail(errorMsg))
			})
	}

};





// export const logout = (onSuccess) => {
// 	onSuccess({})
// 	return async (dispatch) => {
// 		const login = {}
// 		//console.log(" wignupEmail USERS", login)
// 		dispatch(fetchlogoutSucess(login))
// 	}
// }












// export const fetchlogoutSucess = () => {
// 	return {
// 		type: LOGOUT_SUCESS,

// 	}
// }
// export const logout = (onSuccess) => {

	// 	fetchlogoutSucess()
// 	onSuccess({})

// 	return async (dispatch) => {
	// 		console.log("LOGOUT  SUCESSS")


// 	};
// }


// export const forgetPassword = async (email, onSuccess, onError) => {
	// 	// ////console.log("LOGIN REDUX 3", email)
// 	try {
	// 		const res = await services.Post(`users/forgotPw?email=${email}`)
// 		// //console.log('result ==>', res)
// 		if (res.status == 'success') {
	// 			onSuccess(res)
// 		}
// 		else {
	// 			onError(res)
	// 		}
	// 	}
	// 	catch (e) {
		// 		onError(e)
// 		// //console.log('error -->', e)
// 	}
// }



// export const fetchlogoutReq = () => {
	// 	return {
		// 		type: "LOGOUT_REQUEST"
		// 	}
		// }
		// export const fetchlogoutSucess = (logout) => {
			// 	// //console.log("LOGOUT SASAAS", LOGOUT)
			// 	return {
				// 		type: "LOGOUT_SUCESS",
				// 		payload: logout
// 	}
// }
// export const fetchlogoutlFail = (error) => {
// 	return {
// 		type: "LOGOUT_FAIL",
// 		payload: error
// 	}
// }

//LOGIN SCREEN ACTION
// export const logout = (logindata, onSuccess, onError) => {

// 	return async (dispatch) => {

// 		//console.log("LOGINSCREEN REDUX", logindata.email)
// 		//console.log("LOGINSCREEN REDUX", logindata.password)

// 		// return (dispatch) => {

// 		// dispatch(fetchloginReq)
// 		dispatch(fetchlogoutReq())

// 					onSuccess({})
// 					const logoutdata = {}
// 					//console.log(" wignupEmail USERS", login)
// 					dispatch(fetchlogoutSucess(logoutdata))

// 	}

// };



