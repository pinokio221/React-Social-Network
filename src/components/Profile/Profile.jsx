import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo'
import store from "../../redux/redux-store";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo friendsInfo={props.store.getState().profilePage.friendsInfo} userInfo={props.store.getState().profilePage.userInfo}/>
            <MyPosts userImage={props.store.getState().profilePage.userInfo.user_image} postsData={props.store.getState().profilePage.postsData} dispatch={props.store.dispatch.bind(store)}/>
    </div>
    );
}

export default Profile;