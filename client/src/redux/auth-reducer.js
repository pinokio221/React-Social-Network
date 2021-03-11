import { authAPI } from "../api/api"
import { Redirect } from "react-router"
import React from 'react'


const SET_USER_DATA = 'SET-USER-DATA';

export const setUserData = (id, login, email, isAuth) => ({ type: SET_USER_DATA, data: { id, login, email }, isAuth})

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}

export const authMe = () => {
    return(dispatch) => {
        authAPI.authMe().then(data => {
            let {id, login, email} = data.user;
            dispatch(setUserData(id, login, email, true))
        })
    }
}

export const userLogin = (data) => (dispatch) => {
    authAPI.userLogin(data).then(response => {
        if(response.status === 200) {
            dispatch(authMe())
        } else {
            console.log(null) // !!!!!!!
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
        default: return state;
    }
}



export default authReducer;