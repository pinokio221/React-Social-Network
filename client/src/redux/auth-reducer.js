import { authAPI } from "../api/auth-api"
import { Redirect } from "react-router"
import React from 'react'
import { stopSubmit } from "redux-form";


const SET_USER_DATA = 'SET-USER-DATA';
const TOGGLE_REG_PROCESS = 'TOGGLE-REG-PROCESS'
const TOGGLE_LOG_PROCESS = 'TOGGLE-LOG-PROCESS'
const TOGGLE_SIGNOUT_PROCESS = 'TOGGLE-SIGNOUT-PROCESS'
const DISPLAY_AUTH_ERROR = 'DISPLAY-AUTH-ERROR'
const RESET_ERROR = 'RESET-ERROR'

export const setUserData = (id, login, email, isAuth) => ({ type: SET_USER_DATA, data: { id, login, email }, isAuth})
export const displayAuthError = (error_msg) => ({ type: DISPLAY_AUTH_ERROR, error_msg })
export const resetError = () => ({ type: RESET_ERROR })
export const toggleRegFormInProcess = (inProcess) => ({ type: TOGGLE_REG_PROCESS, inProcess})
export const toggleLogFormInProcess = (inProcess) => ({ type: TOGGLE_LOG_PROCESS, inProcess})
export const toggleSignOutInProcess = (inProcess) => ({ type: TOGGLE_SIGNOUT_PROCESS, inProcess })

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    authError: false,
    regFormInProcess: false,
    logFormInProcess: false,
    signOutInProcess: false
}

export const authMe = () => {
    return(dispatch) => {
        authAPI.authMe().then(data => {
            let {id, login, email} = data.user;
            dispatch(setUserData(id, login, email, true))
            dispatch(toggleLogFormInProcess(false));
        })
    }
}

export const userRegister = (data) => (dispatch) => {
    dispatch(toggleRegFormInProcess(true));
    authAPI.userRegister(data).then(response => {
        if(response.status === 201) {
            return <Redirect to={'/login'}/>
        }
        if(response.status === 400) {
            alert(response.data.message)
        }
        dispatch(toggleRegFormInProcess(false))
    })
}

export const userLogin = (data) => (dispatch) => {
    dispatch(toggleLogFormInProcess(true));
    authAPI.userLogin(data).then(response => {
        if(response.status === 200) {
            dispatch(authMe())
        }
        if(response.status === 401){
            dispatch(displayAuthError(response.data.message))
        }
    })
}

export const userLogout = () => (dispatch) => {
    dispatch(toggleSignOutInProcess(true))
    authAPI.userLogout().then(response =>{
        if(response.status === 200) {
            dispatch(setUserData(null, null, null, false))
            dispatch(toggleSignOutInProcess(false))
        }
    })
}


const authReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
                isAuth: action.isAuth
            }
        }
        case TOGGLE_REG_PROCESS: {
            return {
                ...state,
                regFormInProcess: action.inProcess
            }
        }
        case TOGGLE_LOG_PROCESS: {
            return {
                ...state,
                logFormInProcess: action.inProcess
            }
        }
        case TOGGLE_SIGNOUT_PROCESS: {
            return {
                ...state,
                signOutInProcess: action.inProcess
            }
        }
        case DISPLAY_AUTH_ERROR: {
            return {
                ...state,
                authError: action.error_msg,
                logFormInProcess: false
            }
        }
        case RESET_ERROR: {
            return {
                ...state,
                authError: false
            }
        }
        default: return state;
    }
}



export default authReducer;