import React from 'react';
import styles from './ProfileInfo.module.css';
import ProfileDescription from "./ProfileDescription/ProfileDescription"
import ProfileHub from "./ProfileHub/ProfileHub"



const ProfileInfo = (props) => {
    return (
        <div className={styles.component_wrapper}>
            <ProfileDescription {...props}/>
            <ProfileHub {...props}/>
        </div>
    );
}

export default ProfileInfo;