import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo'
import store from "../../redux/store";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo />
            <MyPosts postsData={props.store.getState().profilePage.postsData} dispatch={props.store.dispatch.bind(store)}/>
    </div>
    );
}

export default Profile;