import React from 'react';
import ProfileDescription from "./ProfileDescription/ProfileDescription"
import ProfileHub from "./ProfileHub/ProfileHub"



const ProfileInfo = (props) => {
    return (
        <div>
            <ProfileDescription {...props}/>
            <ProfileHub {...props}/>
        </div>
    );
}

export default ProfileInfo;