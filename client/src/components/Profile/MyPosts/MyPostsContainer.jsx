import React from 'react';
import {addPost, onPostChange} from "../../../redux/profile-reducer";
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
            let action = onPostChange(text)
            dispatch(action);
        },
        addPost: () => {
            let action = addPost();
            dispatch(action);
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, 
    { updateNewPostText: onPostChange, addPost: addPost })(MyPosts)

export default MyPostsContainer;