import { friendshipAPI } from "../api/friendship-api"
import { profileAPI } from "../api/profile-api"

const SET_PROFILE_INFO = 'SET-PROFILE-INFO'
const SET_FRIENDS = 'SET-FRIENDS';
const SET_INVITATIONS = 'SET-INVITATIONS';
const SET_PAGE = 'SET-PAGE'
const RESET_PAGE = 'RESET-PAGE'
const SEND_INVITATION = 'SEND-INVITATION'
const CANCEL_INVITATION = 'CANCEL-INVITATION'
const ACCEPT_INVITATION = 'ACCEPT-INVITATION'
const REJECT_INVITATION = 'REJECT-INVITATION'
const REMOVE_FRIEND = 'REMOVE-FRIEND'
const FETCH_FRIENDS = 'FETCH-FRIENDS'
const FETCH_INVITATIONS = 'FETCH-INVITATIONS'

export const setProfileInfoAction = (userInfo) => ({ type: SET_PROFILE_INFO, userInfo })
export const setProfileFriendsAction = (friends, totalFriends) => ({ type: SET_FRIENDS, friends, totalFriends })
export const setProfileInvitationsAction = (invitations, totalInvitations) => ({ type: SET_INVITATIONS, invitations, totalInvitations })
export const setFriendsPageAction = () => ({ type: SET_PAGE });
export const resetFriendsPageAction = () => ({ type: RESET_PAGE });
export const sendInvitationAction = (userId) => ({ type: SEND_INVITATION, userId });
export const cancelInvitationAction = (userId) => ({ type: CANCEL_INVITATION, userId });
export const acceptInvitationAction = (userId) => ({ type: ACCEPT_INVITATION, userId });
export const rejectInvitationAction = (userId) => ({ type: REJECT_INVITATION, userId });
export const removeFriendAction = (userId) => ({ type: REMOVE_FRIEND, userId });
export const fetchMoreFriendsAction = (friends, page) => ({ type: FETCH_FRIENDS, friends, page })
export const fetchMoreInvitationsAction = (invitations, page) => ({ type: FETCH_INVITATIONS, invitations, page })

let initialState = {
    pageFetching: true,
    friends: [],
    userInfo: null,
    invitations: [],
    totalFriends: null,
    totalInvitations: null,
    friendsPagination: 1,
    invitationsPagination: 1
}

export const getFriendsPage = (userId, friendsPagination, invitationsPagination) => (dispatch) => {
    let friendsPromise = dispatch(getProfileFriends(userId, friendsPagination));
    let invitationsPromise = dispatch(getProfileInvitations(invitationsPagination));
    let profilePromise = dispatch(getProfileInfo(userId));

    Promise.all([profilePromise, friendsPromise, invitationsPromise]).then(() => {
            dispatch(setFriendsPageAction());
        })
    
}

export const getProfileInfo = (userId) => (dispatch) => {
    return profileAPI.getProfilePage(userId).then(response => {
        if(response.status === 200) {
            dispatch(setProfileInfoAction(response.data));
        }
    })
}
export const getProfileFriends = (userId, pagination) => (dispatch) => {
    return friendshipAPI.getProfileFriends(userId, pagination).then(response => {
            if(response.status === 200) {
                dispatch(setProfileFriendsAction(response.data.items, response.data.totalFriends))
            }
        })
}

export const getProfileInvitations = (pagination) => (dispatch) => {
    return friendshipAPI.getProfileInvitations(pagination).then(response => {
            if(response.status === 200) {
                dispatch(setProfileInvitationsAction(response.data.items, response.data.receivedInvitations))
            }
        })
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
export const acceptInvitation = (userId) => {
    return(dispatch) => {
        friendshipAPI.acceptInvitation(userId).then(response => {
            if(response.status === 200) {
                dispatch(acceptInvitationAction(userId));
            }
        })
    }
}

export const rejectInvitation = (userId) => {
    return(dispatch) => {
        friendshipAPI.rejectInvitation(userId).then(response => {
            if(response.status === 200) {
                dispatch(rejectInvitationAction(userId));
            }
        })
    }
}

export const removeFriend = (userId) => {
    return(dispatch) => {
        friendshipAPI.removeFriend(userId).then(response => {
            if(response.status === 200) {
                dispatch(removeFriendAction(userId));
            }
        })
    }
}

export const fetchMoreFriends = (userId, pagination) => {
    return(dispatch) => {
        friendshipAPI.getProfileFriends(userId, pagination).then(response => {
            if(response.status === 200) {
                dispatch(fetchMoreFriendsAction(response.data.items, response.data.page))
                
            }
        })
    }
}
export const fetchMoreInvitations = (pagination) => {
    return(dispatch) => {
        friendshipAPI.getProfileInvitations(pagination).then(response => {
            if(response.status === 200) {
                dispatch(fetchMoreInvitationsAction(response.data.items, response.data.page))
            }
        })
    }
}


const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE_INFO: {
            return {
                ...state,
                userInfo: action.userInfo,
            }
        }
        case SET_PAGE: {
            return {
                ...state,
                pageFetching: false
            }
        }
        case RESET_PAGE: {
            return {
                ...state,
                friends: [],
                userInfo: null,
                invitations: [],
                totalFriends: null,
                totalInvitations: null,
                pageFetching: true,
                friendsPagination: 1,
                invitationsPagination: 1
            }
        }
        case SET_FRIENDS: {
            return {
                ...state,
                friends: action.friends,
                totalFriends: action.totalFriends
            }
        }
        case SET_INVITATIONS: {
            return {
                ...state,
                invitations: action.invitations,
                totalInvitations: action.totalInvitations
            }
        }
        case SEND_INVITATION:
            return {
                ...state,
                friends: state.friends.map(u => {
                    if(u.id === action.userId) {
                        return {...u, friendshipStatus: 1}
                    }
                    return u;
                }),
            }
        case CANCEL_INVITATION:
            return {
                ...state,
                friends: state.friends.map(u => {
                    if(u.id === action.userId) {
                        return {...u, friendshipStatus: 0}
                    }
                    return u;
                }),
            }
        case ACCEPT_INVITATION: {
            return {
                ...state,
                invitations: state.invitations.map(u => {
                    if(u.id === action.userId) {
                        return {...u, friendshipStatus: 2}
                    }
                    return u;
                })
            }
        }
        case REJECT_INVITATION: {
            return {
                ...state,
                invitations: state.invitations.map(u => {
                    if(u.id === action.userId) {
                        return {...u, friendshipStatus: 3}
                    }
                    return u;
                })
            }
        }
        case REMOVE_FRIEND: {
            state.friends.map(u => {
                if(u.id === action.userId) {
                    let index = state.friends.indexOf(u);
                    state.friends.splice(index, 1);
                }
            })
            return {
                ...state,
                friends: [...state.friends],
                totalFriends: state.totalFriends - 1
                
            }
        }
        case FETCH_FRIENDS:
            return {
                ...state,
                friends: [...state.friends, ...action.friends],
                friendsPagination: action.page
            }
        case FETCH_INVITATIONS:
            return {
                ...state,
                invitations: [...state.invitations, ...action.invitations],
                invitationsPagination: action.page
            }
        default: return state;
    }
}

export default friendsReducer;