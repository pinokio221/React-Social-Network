import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo'
import PostsContainer from "./Posts/PostsContainer";


const Profile = (props) => {
    let isAuthUserPage = false;
    if(props.userInfo.id === props.auth.id) {
        isAuthUserPage = true;
    }
    return (
        <div>
            <ProfileInfo 
                isAuthUserPage={isAuthUserPage} 
                updateProfileStatus={props.updateProfileStatus}
                updateProfilePicture={props.updateProfilePicture}
                userFriends={props.userFriends} 
                userInfo={props.userInfo}
                sendInvitation={props.sendInvitation}
                friendshipStatus={props.friendshipStatus}/>
            <PostsContainer isAuthUserPage={isAuthUserPage} store={props.store}/>
    </div>
    
    );
}

export default Profile;