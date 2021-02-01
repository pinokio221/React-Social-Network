import React from 'react';
import {addPostActionCreator, onPostChangeActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import connect from "react-redux/lib/connect/connect";


let mapStateToProps = (state) => {
    return {
        userInfo: state.profilePage.userInfo,
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {
            let action = onPostChangeActionCreator(text)
            dispatch(action);
        },
        addPost: () => {
            let action = addPostActionCreator();
            dispatch(action);
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;