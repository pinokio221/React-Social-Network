const ADD_FRIEND = "ADD-FRIEND"
const CANCEL_INVITATION = "CANCEL-INVENTATION"
const SEARCH_CLICK = "SEARCH-CLICK"
const SET_USERS = "SET-USERS"
const SET_PAGE = "SET-PAGE"
const SHOW_MORE = "SHOW-MORE"

export const addFriendActionCreator = (userId) => ({ type: ADD_FRIEND, userId })
export const cancelInvitationActionCreator = (userId) => ({ type: CANCEL_INVITATION, userId })
export const onSearchClickActionCreator = (text, filteredUsers) => ({ type: SEARCH_CLICK, text: text, filteredUsers })
export const setUsersActionCreator = (users) => ({ type: SET_USERS, users })
export const showMoreActionCreator = (page) => ({type: SHOW_MORE, users})
export const setCurrentPageActionCreator = (page) => ({type: SET_PAGE, page})


let initialState = {
    users: [],
    filteredUsers: [],
    filter: false,
    searchInput: "",
    pageSize: 6,
    totalUsersCount: 13,
    currentPage: 1
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FRIEND:
            return {
                ...state,
                filteredUsers: state.filteredUsers.map(u => {
                    if(u.id === action.userId) {
                        return {...u, friendInventation: true}
                    }
                    return u;
                }),
                users: state.users.map(u => {
                    if(u.id === action.userId) {
                        return {...u, friendInventation: true}
                    }
                    return u;
                }),
            }
        case CANCEL_INVITATION:
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userId) {
                        return {...u, friendInventation: false}
                    }
                    return u;
                }),
                filteredUsers: state.filteredUsers.map(u => {
                    if(u.id === action.userId) {
                        return {...u, friendInventation: false}
                    }
                    return u;
                })

            }
        case SEARCH_CLICK:
            if (action.text != "") {
                state.filter = true;
            }
            else {
                state.filter = false;
            }
            return {
                ...state,
                searchInput: action.text,
                filteredUsers: action.filteredUsers
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case SHOW_MORE:
            return {
                ...state,
                usersList: [...state.usersList, ...action.users]
            }


        default: return state;
    }
}

export default usersReducer;