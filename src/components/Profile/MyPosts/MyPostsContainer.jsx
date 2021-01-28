import React from 'react';
import {addPostActionCreator, onPostChangeActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext"

const MyPostsContainer = (props) => {
    //let state = props.store.getState();
    return (
        <StoreContext.Consumer>
            {
            (store) => {
                let addNewPost = () => {
                    store.dispatch(addPostActionCreator())
                }

                let onPostChange = (text) => {
                    store.dispatch(onPostChangeActionCreator(text));
                }
                return <MyPosts updateNewPostText={onPostChange}
                    addPost={addNewPost} userInfo={store.getState().profilePage.userInfo}
                    postsData={store.getState().profilePage.postsData}
                    dispatch={store.dispatch.bind(store)}
                    newPostText={store.getState().profilePage.newPostText}/>
            }
            }

        </StoreContext.Consumer>
    );
}

export default MyPostsContainer;