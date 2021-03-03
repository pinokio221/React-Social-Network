const ADD_POST = "ADD-POST";
const UPDATE_POST_TEXT = "UPDATE-POST-TEXT"
const SET_PROFILE_PAGE = "SET-PROFILE-PAGE"
const SET_PROFILE_POSTS = "SET-PROFILE-POSTS"

export const addPost = () => ({ type: ADD_POST })
export const onPostChange = (text) => ({ type: UPDATE_POST_TEXT, newText: text })
export const setProfilePage = (userInfo) => ({ type: SET_PROFILE_PAGE, userInfo })
export const setProfilePosts = (posts) => ({ type: SET_PROFILE_POSTS, posts })

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

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_POST_TEXT:{
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0,
                commentsCount: 2
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