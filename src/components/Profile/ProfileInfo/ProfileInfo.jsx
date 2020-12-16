import React from 'react';
import styles from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
        <div>
            <div className={styles.headerPhoto}>
                <img src='https://i.pinimg.com/564x/39/44/ae/3944ae4bf357dfd4c514134d0886ac07.jpg'></img>
            </div>
      <div className={styles.descriptionBlock}> ava + description </div>
    </div>
    );
}

export default ProfileInfo;