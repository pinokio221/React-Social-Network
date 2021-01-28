import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo'
import store from "../../redux/redux-store";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo friendsInfo={props.store.getState().profilePage.friendsInfo} userInfo={props.store.getState().profilePage.userInfo}/>
            <MyPostsContainer />
    </div>
    );
}

export default Profile;