const ADD_POST = "ADD-POST";
const UPDATE_POST_TEXT = "UPDATE-POST-TEXT"

export const addPostActionCreator = () => ({ type: ADD_POST })
export const onPostChangeActionCreator = (text) => ({ type: UPDATE_POST_TEXT, newText: text })

let initialState = {
    userInfo:
        {
            user_id: 10,
            first_name: "Keany",
            last_name: "Reeves",
            email: "test@gmail.com",
            password: "test123",
            phone_number: "0976541884",
            birth_date: "06-10-1995",
            user_image: "https://i.pinimg.com/originals/56/2c/23/562c23a9a63bdd9eaf90ace27ba4b63b.jpg",
            user_header: "https://blog.theclymb.com/wp-content/uploads/2013/06/adventure_travel_header.jpg",
            user_status: "No one is perfect",
            user_city: "New York",
            about: "Hi, i'm Keany",
            user_age: "50",
        },
    friendsInfo: [
        {
            id: 11,
            first_name: "1",
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
        }
    ],
    postsData: [
        {id: 1, message: "Hello, how are you???Hello, how are you???", likesCount: 365, commentsCount: 94},
        {id: 2, message: "Please recall me!!!", likesCount: 3, commentsCount: 11}
    ],
    newPostText: ''
}

const profileReducer = (state = initialState, action) => {

    let stateCopy = {
        ...state,
        postsData: [...state.postsData]
    };

    switch (action.type) {
        case UPDATE_POST_TEXT:{
            stateCopy.newPostText = action.newText;
            return stateCopy;
        }
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0,
                commentsCount: 2
            };
            stateCopy.postsData.push(newPost);
            stateCopy.newPostText = '';
            return stateCopy;
        }

        default: return state;
    }
}

export default profileReducer;