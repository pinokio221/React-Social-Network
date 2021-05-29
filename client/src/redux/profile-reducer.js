import { postsAPI } from "../api/posts-api"
import { profileAPI } from "../api/profile-api"
import { friendshipAPI } from "../api/friendship-api"

const ADD_POST = "ADD-POST";
const UPDATE_POST = "UPDATE-POST";
const DELETE_POST = "DELETE-POST";
const SET_EDITED_POST = "SET-EDITED-POST";
const SET_PROFILE_PAGE = "SET-PROFILE-PAGE"
const RESET_PROFILE_PAGE = 'RESET-PROFILE-PAGE'
const SET_PROFILE_POSTS = "SET-PROFILE-POSTS"
const SET_PROFILE_FRIENDS = "SET-PROFILE-FRIENDS"
const UPDATE_PROFILE_PICTURE = "UPDATE-PROFILE-PICTURE"
const UPDATE_PROFILE_STATUS = "UPDATE-PROFILE-STATUS"
const SEND_INVITATION = 'SEND-INVITATION'
const PICTURE_UPLOAD_PROGRESS = 'PICTURE-UPLOAD-PROGRESS'
const DISPLAY_SUC_MESSAGE = 'DISPLAY-SUC-MESSAGE'
const DISPLAY_ERROR_MESSAGE = 'DISPLAY-ERROR-MESSAGE'
const RESET_MODAL_MESSAGE = 'RESET-MODAL-MESSAGE'

export const addPostAction = (post) => ({ type: ADD_POST, post });
export const updatePostAction = (data) => ({ type: UPDATE_POST, data });
export const deletePostAction = (post_id) => ({ type: DELETE_POST, post_id });
export const setEditedPostAction = (post) => ({ type: SET_EDITED_POST, post });
export const setProfilePageAction = (userInfo) => ({ type: SET_PROFILE_PAGE, userInfo });
export const resetProfilePageAction = () => ({ type: RESET_PROFILE_PAGE });
export const setProfilePostsAction = (posts) => ({ type: SET_PROFILE_POSTS, posts });
export const setProfileFriendsAction = (friends, totalFriends) => ({ type: SET_PROFILE_FRIENDS, friends, totalFriends });
export const updateProfilePictureAction = (img) => ({type: UPDATE_PROFILE_PICTURE, img});
export const updateStatusAction = (status) => ({type: UPDATE_PROFILE_STATUS, status});
export const sendInvitationAction = (userId, status) => ({ type: SEND_INVITATION, userId, status });
export const togglePicUploadProgress = (inProcess) => ({ type: PICTURE_UPLOAD_PROGRESS, inProcess });
export const displaySuccessfullMessage = (msg) => ({ type: DISPLAY_SUC_MESSAGE, msg });
export const displayErrorMessage = (msg) => ({ type: DISPLAY_ERROR_MESSAGE, msg });
export const resetModalMessage = () => ({ type: RESET_MODAL_MESSAGE });



let initialState = {
    userInfo: {},
    userFriends: [],
    totalFriends: 0,
    postsData: [],
    editedPost: null,
    pageFetching: true,
    friendsFetching: true,
    pictureUploading: false,
    successfullMessage: null,
    errorMessage: null,
}

export const getProfileFriends = (userId, pagination) => {
    return (dispatch) => {
        friendshipAPI.getProfileFriends(userId, pagination).then(response => {
            console.log(response)
            dispatch(setProfileFriendsAction(response.data.items, response.data.totalFriends))
        })
    }
}

export const getProfilePage = (userId) => (dispatch) => {
    profileAPI.getProfilePage(userId).then(response => {
        if(response.status === 200) {
            dispatch(setProfilePageAction(response.data));
        }
    })
    dispatch(getProfileFriends(userId, 1));
    
}

export const getProfilePosts = (userId) => {
    return(dispatch) => {
        postsAPI.getProfilePosts(userId).then(data => {
            dispatch(setProfilePostsAction(data.posts))
        })
    }
}

export const addPost = (post_content) => {
    return(dispatch) => {
        postsAPI.addNewPost(post_content).then(response => {
            if(response.status === 201) {
                dispatch(addPostAction(response.data.post));
                dispatch(displaySuccessfullMessage(response.data.message));
            } else {
                dispatch(displayErrorMessage(response.data.message))
            }
        })
    } 
}


export const updatePost = (id, post_content) => {
    return(dispatch) => {
        postsAPI.updatePost(id, post_content).then(response => {
            if(response.status === 200) {
                dispatch(updatePostAction(response.data.post));
                dispatch(displaySuccessfullMessage(response.data.message));
            } else {
                dispatch(displayErrorMessage(response.data.message))
            }
            
        })
    } 
}

export const deletePost = (post_id, user_id) => (dispatch) => {
    postsAPI.deletePost(post_id).then((response) => {
        if(response.status === 201) {
            dispatch(getProfilePosts(user_id))
            dispatch(displaySuccessfullMessage(response.data.message));
        } else {
            dispatch(displayErrorMessage(response.data.message))
        }
    })
}

export const updateProfilePicture = (img) => (dispatch) => {
    dispatch(togglePicUploadProgress(true));
    profileAPI.updateProfilePicture(img).then(response => {
        if(response.status === 200) {
            dispatch(updateProfilePictureAction(response.data.img));
            dispatch(displaySuccessfullMessage(response.data.message));
        }
        else {
            dispatch(displayErrorMessage(response.data.message))
        }
        dispatch(togglePicUploadProgress(false));
    })
    
}

export const updateProfileStatus = (user_status) => {
    return(dispatch) => {
        profileAPI.updateProfileStatus(user_status).then(response => {
            if(response.status === 200) {
                dispatch(updateStatusAction(response.data.status))
            } 
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

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                postsData: [action.post,...state.postsData.slice(0,4)],
                newPostText: ''
            }
        }
        case UPDATE_POST: {
            console.log(action)
            return {
                ...state,
                postsData: state.postsData.map(p => {
                    if(p.id === action.data.id) {
                        p.id = action.data.id
                        p.content = action.data.content
                    }
                    return p;
                }),
            }
        }
        case DELETE_POST: {
            state.postsData.map(p => {
                if(p.id === action.post_id) {
                    let index = state.postsData.indexOf(p);
                    state.postsData.splice(index, 1);
                }
            })
            return {
                ...state,
                postsData: [...state.postsData.slice(0,4)]
                
            }
        }
        case SET_EDITED_POST: {
            return {
                ...state,
                editedPost: action.post
            }
        }
        case SET_PROFILE_PAGE: {
            return {
                ...state,
                userInfo: action.userInfo,
                pageFetching: false
            }
        }
        case RESET_PROFILE_PAGE: {
            return {
                ...state,
                userInfo: {},
                pageFetching: true
            }
        }
        case SET_PROFILE_POSTS: {
            return {
                ...state,
                postsData: action.posts
            }
        }
        case SET_PROFILE_FRIENDS: {
            return {
                ...state,
                userFriends: action.friends,
                totalFriends: action.totalFriends
            }
        }
        case UPDATE_PROFILE_STATUS: {
            return {
                ...state,
                status: action.status // doesnt work
            }

        }
        case UPDATE_PROFILE_PICTURE: {
            let returnedInfo = {...state.userInfo};
            returnedInfo.profile_image = action.img;
            return {
                ...state,
                userInfo: returnedInfo
            }

        }
        case PICTURE_UPLOAD_PROGRESS: {
            return {
                ...state,
                pictureUploading: action.inProcess
            }
        }
        case SEND_INVITATION: {
            let returnedInfo = {...state.userInfo};
            returnedInfo.friendshipStatus = action.status;
            return {
                ...state,
                userInfo: returnedInfo
            }
        }
        case DISPLAY_SUC_MESSAGE: {
            return {
                ...state,
                successfullMessage: action.msg
            }
        }
        case DISPLAY_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.msg
            }
        }
        case RESET_MODAL_MESSAGE: {
            return {
                ...state,
                successfullMessage: null,
                errorMessage: null
            }
        }

        default: return state;
    }
}

export default profileReducer;