const ADD_FRIEND = "ADD-FRIEND"
const CANCEL_INVITATION = "CANCEL-INVENTATION"
const SEARCH_UPDATE = "SEARCH-UPDATE"
const SEARCH_CLICK = "SEARCH-CLICK"
const SET_USERS = "SET-USERS"

export const addFriendActionCreator = (userId) => ({ type: ADD_FRIEND, userId })
export const cancelInvitationActionCreator = (userId) => ({ type: CANCEL_INVITATION, userId })
export const onSearchInputChangeActionCreator = (text) => ({ type: SEARCH_UPDATE, text: text })
export const onSearchClickActionCreator = (text) => ({ type: SEARCH_CLICK, text: text })
export const setUsersActionCreator = (users) => ({ type: SET_USERS, users })


let initialState = {
    searchInput: "",
    usersList: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_UPDATE:
            return {
                ...state,
                searchInput: action.text
            }
        case ADD_FRIEND:
            return {
                ...state,
                usersList: state.usersList.map(u => {
                    if(u.id === action.userId) {
                        return {...u, friendInventation: true}
                    }
                    return u;
                })
            }
        case CANCEL_INVITATION:
            return {
                ...state,
                usersList: state.usersList.map(u => {
                    if(u.id === action.userId) {
                        return {...u, friendInventation: false}
                    }
                    return u;
                })
            }
        case SEARCH_CLICK:
            let stateCopy = {...state};
            stateCopy.filteredList = state.usersList.filter(f => f.fullname.includes(action.text))
            stateCopy.filter = true;
            return stateCopy;

        case SET_USERS:
            return {
                ...state,
                usersList: [...state.usersList, ...action.users]
            }


        default: return state;
    }
}

export default usersReducer;