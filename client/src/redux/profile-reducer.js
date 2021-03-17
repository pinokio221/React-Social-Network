import { usersAPI, postsAPI, profileAPI } from "../api/api"
 
const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE-POST";
const SET_PROFILE_PAGE = "SET-PROFILE-PAGE"
const SET_PROFILE_POSTS = "SET-PROFILE-POSTS"
const SET_PROFILE_FRIENDS = "SET-PROFILE-FRIENDS"
const UPDATE_PROFILE_STATUS = "UPDATE-PROFILE-STATUS"

export const addPostAction = (post) => ({ type: ADD_POST, post })
export const deletePostAction = (post_id) => ({ type: DELETE_POST, post_id })
export const setProfilePageAction = (userInfo) => ({ type: SET_PROFILE_PAGE, userInfo })
export const setProfilePostsAction = (posts) => ({ type: SET_PROFILE_POSTS, posts })
export const setProfileFriendsAction = (friends, totalFriends) => ({ type: SET_PROFILE_FRIENDS, friends, totalFriends })
export const updateStatusAction = (status) => ({type: UPDATE_PROFILE_STATUS, status})

let initialState = {
    userInfo: {},
    userFriends: [],
    totalFriends: 0,
    postsData: [],
    friendsFetching: true,
}


export const getProfilePage = (userId) => {
    return (dispatch) => {
        profileAPI.getProfilePage(userId).then(data => {
            dispatch(setProfilePageAction(data));
        })
        profileAPI.getProfileFriends(userId).then(data => {
            debugger;
            dispatch(setProfileFriendsAction(data.data.items, data.data.totalFriends))
        })
    }
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
        postsAPI.addNewPost(post_content).then(data => {
            dispatch(addPostAction(data));
        })
    } 
}

export const deletePost = (post_id, user_id) => (dispatch) => {
    postsAPI.deletePost(post_id).then((response) => {
        if(response.status === 201) {
            dispatch(getProfilePosts(user_id))
        }
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

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                postsData: [action.post,...state.postsData.slice(0,4)],
                newPostText: ''
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
        case SET_PROFILE_PAGE: {
            return {
                ...state,
                userInfo: action.userInfo
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

        default: return state;
    }
}

export default profileReducer;