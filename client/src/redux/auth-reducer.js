import { authAPI } from "../api/auth-api"

const SET_USER_DATA = 'SET-USER-DATA';
const TOGGLE_REG_PROCESS = 'TOGGLE-REG-PROCESS'
const TOGGLE_LOG_PROCESS = 'TOGGLE-LOG-PROCESS'
const TOGGLE_SIGNOUT_PROCESS = 'TOGGLE-SIGNOUT-PROCESS'
const DISPLAY_AUTH_ERROR = 'DISPLAY-AUTH-ERROR'
const DISPLAY_REG_ERROR = 'DISPLAY-REG-ERROR'
const RESET_AUTH_ERROR = 'RESET-AUTH-ERROR'
const RESET_REG_ERROR = 'RESET-REG-ERROR'
const SET_INITIALIZED = 'SET-INITIALIZED'
const SET_QR_CODE = 'SET-QR-CODE';
const SET_AUTH_STAGE = 'SET-AUTH-STAGE'
const SET_AUTH_ID = 'SET-AUTH-ID'

export const setUserData = (id, login, email, isAuth) => ({ type: SET_USER_DATA, data: { id, login, email }, isAuth});
export const displayAuthError = (error_msg) => ({ type: DISPLAY_AUTH_ERROR, error_msg });
export const displayRegisterError = (error_msg) => ({ type: DISPLAY_REG_ERROR, error_msg });
export const resetRegError = () => ({ type: RESET_REG_ERROR });
export const resetAuthError = () => ({ type: RESET_AUTH_ERROR });
export const toggleRegFormInProcess = (inProcess) => ({ type: TOGGLE_REG_PROCESS, inProcess});
export const toggleLogFormInProcess = (inProcess) => ({ type: TOGGLE_LOG_PROCESS, inProcess});
export const toggleSignOutInProcess = (inProcess) => ({ type: TOGGLE_SIGNOUT_PROCESS, inProcess });
export const setInitializedAction = () => ({ type: SET_INITIALIZED });
export const setUserQRCodeAction = (qrcode) => ({ type: SET_QR_CODE, qrcode });
export const setAuthStageAction = (stage) => ({ type: SET_AUTH_STAGE, stage });
export const setUserAuthIdAction = (authId) => ({ type: SET_AUTH_ID, authId });

let initialState = {
    id: null,
    auth_id: null,
    login: null,
    email: null,
    isAuth: false,
    regError: false,
    authError: false,
    initialized: false,
    authStage: 1,
    regFormInProcess: false,
    logFormInProcess: false,
    signOutInProcess: false,
    qrCode: null,
}

export const authMe = () => async (dispatch) => {
    const response = await authAPI.authMe()
    if(response) {
        if(response.status === 200) {
            dispatch(setAuthStageAction(1))
            let {id, login, email} = response.data.user;
            dispatch(setUserData(id, login, email, true))
            dispatch(toggleLogFormInProcess(false));
        }
        if(response.status === 401) {
            return false;
        }
    }
}

export const getUserQRCode = (authId) => (dispatch) => {
    return authAPI.getQRCode(authId).then((response) => {
        if(response.status === 200) {
            dispatch(setUserQRCodeAction(response.data.QRCode))
        }
        if(response.status === 401) {
            return false;
        }
    })
    
}

export const twoFactorAuthSetStage = (stage, authId) => (dispatch) => {
    const setAuthIdPromise = dispatch(setUserAuthIdAction(authId));
    const setAuthStagePromise = dispatch(setAuthStageAction(stage));
    Promise.all([setAuthIdPromise, setAuthStagePromise]);
}

export const verifyTwoFactorAuth = (authId, authCode) => (dispatch) => {
    dispatch(toggleLogFormInProcess(true));
    authAPI.twoFactorVerify(authId, authCode).then(response => {
        if(response.status === 200) {
            setTimeout(function() {
                dispatch(authMe())
                dispatch(toggleLogFormInProcess(false));
                }, 3000)
        }
        if(response.status === 404 || response.status === 400) {
            dispatch(displayAuthError(response.data.message))
        }
    })
}

export const validateTwoFactorAuth = (authId, authCode) => (dispatch) => {
    dispatch(toggleLogFormInProcess(true));
    authAPI.twoFactorValidate(authId, authCode).then(response => {
        if(response.status === 200) {
            setTimeout(function() {
                dispatch(authMe())
            }, 3000)
        }
        if(response.status === 404 || response.status === 400) {
            dispatch(displayAuthError(response.data.message))
        }
        else {
            return false
        }
        dispatch(toggleLogFormInProcess(false));
    })
}

export const userRegister = (data) => async (dispatch) => {
    dispatch(toggleRegFormInProcess(true));
    authAPI.userRegister(data).then((response) => {
        if(response.status === 201) {
            setTimeout(function() { dispatch(userLogin(data)) }, 10000)
        }
        if(response.status === 400) {
            dispatch(displayRegisterError(response.data.message))
        }
    })
}

export const userLogin = (data) => (dispatch) => {
    dispatch(toggleLogFormInProcess(true));
    authAPI.userLogin(data).then(async (response) => {
        if(response.status === 200) {
            if(response.data.verified == false) {
                let twoFactorAuthStagePromise = await dispatch(twoFactorAuthSetStage(3, response.data.authId))
                let qrCodePromise = await dispatch(getUserQRCode(response.data.authId))
                Promise.all([qrCodePromise,twoFactorAuthStagePromise])
            }
            if(response.data.twoFactorAuthSetting == false) {
                dispatch(authMe())
            } else {
                dispatch(twoFactorAuthSetStage(2, response.data.authId))
            }
        }
        if(response.status === 404 || response.status === 400 || response.status === 401 || response.status === 500){
            dispatch(displayAuthError(response.data.message))
        }
        dispatch(toggleLogFormInProcess(false));
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
        case SET_AUTH_ID: {
            return {
                ...state,
                auth_id: action.authId
            }
        }
        case SET_AUTH_STAGE: {
            return {
                ...state,
                authStage: action.stage
            }
        }
        case SET_QR_CODE: {
            return {
                ...state,
                qrCode: action.qrcode
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