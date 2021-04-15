import { friendshipAPI } from "../api/friendship-api"

const SET_FRIENDS = 'SET-FRIENDS';
const SET_INVITATIONS = 'SET-INVITATIONS';
const SET_PAGE = 'SET-PAGE'
const RESET_PAGE = 'RESET-PAGE'
const ACCEPT_INVITATION = 'ACCEPT-INVITATION'
const REJECT_INVITATION = 'REJECT-INVITATION'
const REMOVE_FRIEND = 'REMOVE-FRIEND'

export const setProfileFriendsAction = (friends, totalFriends) => ({ type: SET_FRIENDS, friends, totalFriends })
export const setProfileInvitationsAction = (invitations, totalInvitations) => ({ type: SET_INVITATIONS, invitations, totalInvitations })
export const setFriendsPageAction = () => ({ type: SET_PAGE });
export const resetFriendsPageAction = () => ({ type: RESET_PAGE });
export const acceptInvitationAction = (userId) => ({ type: ACCEPT_INVITATION, userId });
export const rejectInvitationAction = (userId) => ({ type: REJECT_INVITATION, userId });
export const removeFriendAction = (userId) => ({ type: REMOVE_FRIEND, userId });

let initialState = {
    pageFetching: true,
    friends: [],
    invitations: [],
    totalFriends: null,
    totalInvitations: null
}

export const getFriendsPage = (userId) => (dispatch) => {
    let friendsPromise = dispatch(getProfileFriends(userId));
    let invitationsPromise = dispatch(getProfileInvitations());

    Promise.all([friendsPromise, invitationsPromise]).then(() => {
            dispatch(setFriendsPageAction());
        })
    
}
export const getProfileFriends = (userId) => (dispatch) => {
    return friendshipAPI.getProfileFriends(userId).then(response => {
            if(response.status === 200) {
                dispatch(setProfileFriendsAction(response.data.items, response.data.totalFriends))
            }
        })
}

export const getProfileInvitations = () => (dispatch) => {
    return friendshipAPI.getProfileInvitations().then(response => {
            if(response.status === 200) {
                dispatch(setProfileInvitationsAction(response.data.items, response.data.receivedInvitations))
            }
        })
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


const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
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
                invitations: [],
                totalFriends: null,
                totalInvitations: null,
                pageFetching: true
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
        default: return state;
    }
}

export default friendsReducer;