const SET_USER_DATA = 'SET-USER-DATA';

export const setUserData = (id, login, email, isAuth) => ({ type: SET_USER_DATA, data: { id, login, email }, isAuth})

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false
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