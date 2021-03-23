import { authAPI } from "../api/auth-api"
import { Redirect } from "react-router"
import React from 'react'


const SET_USER_DATA = 'SET-USER-DATA';
const TOGGLE_REG_PROCESS = 'TOGGLE-REG-PROCESS'
const TOGGLE_LOG_PROCESS = 'TOGGLE-LOG-PROCESS'

export const setUserData = (id, login, email, isAuth) => ({ type: SET_USER_DATA, data: { id, login, email }, isAuth})
export const toggleRegFormInProcess = (inProcess) => ({ type: TOGGLE_REG_PROCESS, inProcess})
export const toggleLogFormInProcess = (inProcess) => ({ type: TOGGLE_LOG_PROCESS, inProcess})

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    regFormInProcess: false,
    logFormInProcess: false
}

export const authMe = () => {
    return(dispatch) => {
        authAPI.authMe().then(data => {
            let {id, login, email} = data.user;
            dispatch(setUserData(id, login, email, true))
        })
    }
}

export const userRegister = (data) => (dispatch) => {
    dispatch(toggleRegFormInProcess(true));
    authAPI.userRegister(data).then(response => {
        console.log(response)
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
        if(response.status === 405){
            
        }
    })
}

export const userLogout = () => {
    return(dispatch) => {
        authAPI.userLogout().then(() =>{
            dispatch(setUserData(null, null, null, false))
        })
    }
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
        default: return state;
    }
}



export default authReducer;