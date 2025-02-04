import { usersAPI } from "../api/users-api"
import { friendshipAPI } from "../api/friendship-api"

const SEND_INVITATION = "SEND-INVITATION"
const CANCEL_INVITATION = "CANCEL-INVENTATION"
const SEARCH_CLICK = "SEARCH-CLICK"
const SET_USERS = "SET-USERS"
const SET_PAGE = "SET-PAGE"
const SHOW_MORE = "SHOW-MORE"
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING"

export const sendInvitationAction = (userId, status) => ({ type: SEND_INVITATION, userId, status })
export const cancelInvitationAction = (userId) => ({ type: CANCEL_INVITATION, userId })
export const onSearchClickAction = (text, filteredUsers, usersFound) => ({ type: SEARCH_CLICK, text: text, filteredUsers, usersFound})
export const setUsersAction = (users) => ({ type: SET_USERS, users })
export const showMoreAction = (users, pagination) => ({ type: SHOW_MORE, users, pagination })
export const setCurrentPageAction = (page) => ({type: SET_PAGE, page})
export const toggleIsFetchingAction = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

export const getUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAction(true));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetchingAction(false));
            dispatch(setUsersAction(data.items));
        })
    }
}

export const getUsersBySearchQuery= (query, currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAction(true));
        if(query.trim()) {
            usersAPI.getUserByNamePartial(query.toLowerCase()).then(data => {
                dispatch(toggleIsFetchingAction(false));
                dispatch(onSearchClickAction(query, data.items, data.usersFound));
            })
        } else {
            dispatch(toggleIsFetchingAction(true));
            dispatch(onSearchClickAction(query, [], 0));
            usersAPI.getUsers(currentPage, pageSize).then(data => {
                        dispatch(toggleIsFetchingAction(false));
                        dispatch(setUsersAction(data.items));
                    })
            }
    }
}

export const getMoreUsers = (pagination, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAction(true));
        usersAPI.getUsers(pagination, pageSize).then(data => {
            dispatch(toggleIsFetchingAction(false));
            dispatch(showMoreAction(data.items, pagination));
        })
    }
}

export const sendInvitation = (userId) => {
    return(dispatch) => {
        friendshipAPI.sendInvitation(userId).then(data => {
            dispatch(sendInvitationAction(userId, data.friendshipStatus));
        })
    }
}

export const cancelInvitation = (userId) => {
    return(dispatch) => {
        friendshipAPI.cancelInvitation(userId).then(data => {
            dispatch(cancelInvitationAction(userId));
        })
    }
}

let initialState = {
    users: [],
    filteredUsers: [],
    filter: false,
    searchInput: "",
    pageSize: 6,
    totalUsersCount: 13,
    filteredUsersCount: 0,
    currentPage: 1,
    showMorePagination: 1,
    isFetching: true
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_INVITATION:
            return {
                ...state,
                filteredUsers: state.filteredUsers.map(u => {
                    if(u.id === action.userId) {
                        return {...u, friendshipStatus: action.status}
                    }
                    return u;
                }),
                users: state.users.map(u => {
                    if(u.id === action.userId) {
                        return {...u, friendshipStatus: action.status}
                    }
                    return u;
                }),
            }
        case CANCEL_INVITATION:
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userId) {
                        return {...u, friendshipStatus: 0}
                    }
                    return u;
                }),
                filteredUsers: state.filteredUsers.map(u => {
                    if(u.id === action.userId) {
                        return {...u, friendshipStatus: 0}
                    }
                    return u;
                })

            }
        case SEARCH_CLICK:
            if (action.text != "") {
                state.filter = true;
                state.showMorePagination = 1
                state.filteredUsersCount = action.usersFound
            }
            else {
                state.filteredUsersCount = action.usersFound
                state.filter = false;
            }
            return {
                ...state,
                searchInput: action.text,
                filteredUsers: action.filteredUsers,
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_PAGE:
            return {
                ...state,
                currentPage: action.page,

            }
        case SHOW_MORE:
            return {
                ...state,
                users: [...state.users, ...action.users],
                showMorePagination: action.pagination
            }
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default: return state;
    }
}

export default usersReducer;