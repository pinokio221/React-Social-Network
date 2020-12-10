import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';

const Profile = () => {
    return (
        <div>
            <div>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQaBYQcLnpgF9_09-hrtIDFo4HWmSviYytv-w&usqp=CAU'></img>
            </div>
      <div> ava + description </div>
    <MyPosts />
    </div>
    );
}

export default Profile;