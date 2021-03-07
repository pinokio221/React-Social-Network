import { usersAPI, postsAPI } from "../api/api"
 
const ADD_POST = "ADD-POST";
const UPDATE_POST_TEXT = "UPDATE-POST-TEXT"
const SET_PROFILE_PAGE = "SET-PROFILE-PAGE"
const SET_PROFILE_POSTS = "SET-PROFILE-POSTS"

export const addPostAction = () => ({ type: ADD_POST })
export const onPostChangeAction = (post_content) => ({ type: UPDATE_POST_TEXT, post_content: post_content})
export const setProfilePageAction = (userInfo) => ({ type: SET_PROFILE_PAGE, userInfo })
export const setProfilePostsAction = (posts) => ({ type: SET_PROFILE_POSTS, posts })

let initialState = {
    userInfo: { },
    userFriends: [
        {
            id: 11,
            first_name: "Alexey",
            last_name: "Clinton",
            user_image: "https://www.biography.com/.image/t_share/MTE5NDg0MDU1MjM5ODg2MzUx/dwayne-johnson-11818916-1-402.jpg"
        },
        {
            id: 12,
            first_name: "Dwayne",
            last_name: "Johnson",
            user_image: "https://www.biography.com/.image/t_share/MTE5NDg0MDU1MjM5ODg2MzUx/dwayne-johnson-11818916-1-402.jpg"
        },
        {
            id: 12,
            first_name: "Dwayne",
            last_name: "Johnson",
            user_image: "https://www.biography.com/.image/t_share/MTE5NDg0MDU1MjM5ODg2MzUx/dwayne-johnson-11818916-1-402.jpg"
        },
        {
            id: 12,
            first_name: "Dwayne",
            last_name: "Johnson",
            user_image: "https://www.biography.com/.image/t_share/MTE5NDg0MDU1MjM5ODg2MzUx/dwayne-johnson-11818916-1-402.jpg"
        },
        {
            id: 12,
            first_name: "Dwayne",
            last_name: "Johnson",
            user_image: "https://www.biography.com/.image/t_share/MTE5NDg0MDU1MjM5ODg2MzUx/dwayne-johnson-11818916-1-402.jpg"
        },
        {
            id: 12,
            first_name: "Dwayne",
            last_name: "Johnson",
            user_image: "https://www.biography.com/.image/t_share/MTE5NDg0MDU1MjM5ODg2MzUx/dwayne-johnson-11818916-1-402.jpg"
        },
        {
            id: 12,
            first_name: "Dwayne",
            last_name: "Johnson",
            user_image: "https://www.biography.com/.image/t_share/MTE5NDg0MDU1MjM5ODg2MzUx/dwayne-johnson-11818916-1-402.jpg"
        },
        {
            id: 12,
            first_name: "Dwayne",
            last_name: "Johnson",
            user_image: "https://www.biography.com/.image/t_share/MTE5NDg0MDU1MjM5ODg2MzUx/dwayne-johnson-11818916-1-402.jpg"
        },
        {
            id: 12,
            first_name: "Dwayne",
            last_name: "Johnson",
            user_image: "https://www.biography.com/.image/t_share/MTE5NDg0MDU1MjM5ODg2MzUx/dwayne-johnson-11818916-1-402.jpg"
        },
        {
            id: 12,
            first_name: "Dwayne",
            last_name: "Johnson",
            user_image: "https://www.biography.com/.image/t_share/MTE5NDg0MDU1MjM5ODg2MzUx/dwayne-johnson-11818916-1-402.jpg"
        },
        {
            id: 12,
            first_name: "Dwayne",
            last_name: "Johnson",
            user_image: "https://www.biography.com/.image/t_share/MTE5NDg0MDU1MjM5ODg2MzUx/dwayne-johnson-11818916-1-402.jpg"
        },
        
    ],
    postsData: [],
    newPostText: ''
}


export const getProfilePage = (userId) => {
    return (dispatch) => {
        usersAPI.getProfilePage(userId).then(data => {
            dispatch(setProfilePageAction(data));
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
            dispatch(addPostAction);
        })
    } 
}

export const updatePostContent = (post_content) => {
    return(dispatch) => {
        dispatch(onPostChangeAction(post_content));
    }
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_POST_TEXT:{
            return {
                ...state,
                newPostText: action.post_content
            }
        }
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0,
                commentsCount: 0
            };

            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            }
        }
        case SET_PROFILE_PAGE: {
            let profileInfo = {
                id: action.userInfo.id,
                fullname: action.userInfo.fullname,
                sex: action.userInfo.sex,
                status: action.userInfo.status,
                age: action.userInfo.age,
                email: action.userInfo.email,
                city: action.userInfo.city,
                profileImage: action.userInfo.profile_image,
                headerImage: action.userInfo.header_image
            }
            return {
                ...state,
                userInfo: profileInfo
            }
        }
        case SET_PROFILE_POSTS: {
            return {
                ...state,
                postsData: action.posts
            }
        }

        default: return state;
    }
}

export default profileReducer;