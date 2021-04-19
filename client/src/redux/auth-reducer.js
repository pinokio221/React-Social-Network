import { authAPI } from "../api/auth-api"
import { Redirect } from "react-router"
import React from 'react'

const SET_USER_DATA = 'SET-USER-DATA';
const TOGGLE_REG_PROCESS = 'TOGGLE-REG-PROCESS'
const TOGGLE_LOG_PROCESS = 'TOGGLE-LOG-PROCESS'
const TOGGLE_SIGNOUT_PROCESS = 'TOGGLE-SIGNOUT-PROCESS'
const DISPLAY_AUTH_ERROR = 'DISPLAY-AUTH-ERROR'
const DISPLAY_REG_ERROR = 'DISPLAY-REG-ERROR'
const RESET_AUTH_ERROR = 'RESET-AUTH-ERROR'
const RESET_REG_ERROR = 'RESET-REG-ERROR'
const SET_INITIALIZED = 'SET-INITIALIZED'

export const setUserData = (id, login, email, isAuth) => ({ type: SET_USER_DATA, data: { id, login, email }, isAuth});
export const displayAuthError = (error_msg) => ({ type: DISPLAY_AUTH_ERROR, error_msg });
export const displayRegisterError = (error_msg) => ({ type: DISPLAY_REG_ERROR, error_msg });
export const resetRegError = () => ({ type: RESET_REG_ERROR });
export const resetAuthError = () => ({ type: RESET_AUTH_ERROR });
export const toggleRegFormInProcess = (inProcess) => ({ type: TOGGLE_REG_PROCESS, inProcess});
export const toggleLogFormInProcess = (inProcess) => ({ type: TOGGLE_LOG_PROCESS, inProcess});
export const toggleSignOutInProcess = (inProcess) => ({ type: TOGGLE_SIGNOUT_PROCESS, inProcess });
export const setInitializedAction = () => ({ type: SET_INITIALIZED });

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    regError: false,
    authError: false,
    initialized: false,
    regFormInProcess: false,
    logFormInProcess: false,
    signOutInProcess: false
}

export const authMe = () => (dispatch) => {
    return authAPI.authMe().then(response => {
        if(response.status === 200) {
            let {id, login, email} = response.data.user;
            dispatch(setUserData(id, login, email, true))
            dispatch(toggleLogFormInProcess(false));
        }
        if(response.status === 401) {
            return false;
        }
        
    })
}

export const userRegister = (data) => (dispatch) => {
    dispatch(toggleRegFormInProcess(true));
    authAPI.userRegister(data).then(response => {
        if(response.status === 201) {
            return <Redirect to={'/login'}/>
        }
        if(response.status === 400) {
            dispatch(displayRegisterError(response.data.message))
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

export const initialize = () => (dispatch) => {
    let initData = dispatch(authMe());
    initData.then(() => {
        dispatch(setInitializedAction());
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
        case SET_INITIALIZED: {
            return {
                ...state,
                initialized: true
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
        case DISPLAY_REG_ERROR: {
            return {
                ...state,
                regError: action.error_msg,
                regFormInProcess: false
            }
        }
        case RESET_AUTH_ERROR: {
            return {
                ...state,
                authError: false
            }
        }
        case RESET_REG_ERROR: {
            return {
                ...state,
                regError: false
            }
        }
        default: return state;
    }
}



export default authReducer;