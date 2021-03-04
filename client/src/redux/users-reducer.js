import { usersAPI, friendshipAPI } from '../api/api';

const SEND_INVITATION = "SEND-INVITATION"
const CANCEL_INVITATION = "CANCEL-INVENTATION"
const SEARCH_CLICK = "SEARCH-CLICK"
const SET_USERS = "SET-USERS"
const SET_PAGE = "SET-PAGE"
const SHOW_MORE = "SHOW-MORE"
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING"

export const sendInvitation = (userId, status) => ({ type: SEND_INVITATION, userId, status })
export const cancelInvitation = (userId) => ({ type: CANCEL_INVITATION, userId })
export const onSearchClick = (text, filteredUsers, usersFound) => ({ type: SEARCH_CLICK, text: text, filteredUsers, usersFound})
export const setUsers = (users) => ({ type: SET_USERS, users })
export const showMore = (users, pagination) => ({ type: SHOW_MORE, users, pagination })
export const setCurrentPage = (page) => ({type: SET_PAGE, page})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})


export const getUsersThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
        })
    }
}

export const getUsersBySearchQueryThunkCreator = (query, currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        if(query.trim()) {
            usersAPI.getUserByNamePartial(query.toLowerCase()).then(data => {
                dispatch(toggleIsFetching(false));
                dispatch(onSearchClick(query, data.items, data.usersFound));
            })
        } else {
            dispatch(toggleIsFetching(true));
            dispatch(onSearchClick(query, [], 0));
            usersAPI.getUsers(currentPage, pageSize).then(data => {
                        dispatch(toggleIsFetching(false));
                        dispatch(setUsers(data.items));
                    })
            }
    }
}

export const getMoreUsersThunkCreator = (pagination, pageSize) => {
    return(dispatch) => {
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(pagination, pageSize).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(showMore(data.items, pagination));
        })
    }
}

export const sendInvitationThunkCreator = (userId) => {
    return(dispatch) => {
        friendshipAPI.sendInvitation(userId).then(data => {
            dispatch(sendInvitation(userId, data.friendshipStatus));
        })
    }
}

export const cancelInvitationThunkCreator = (userId) => {
    return(dispatch) => {
        friendshipAPI.cancelInvitation(userId).then(data => {
            dispatch(cancelInvitation(userId));
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