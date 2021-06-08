import React from 'react';
import styles from './Settings.module.css'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';

const Settings = (props) => {
    let statusIcon = <ExitToAppIcon/>;
    if(props.authData.signOutInProcess){
        statusIcon = <div className={styles.progress}><CircularProgress size={20}/></div>
    }
    return (
        <div>
            <div className={styles.otherWrapper}>
                <div className={styles.signOutButton} onClick={props.userLogout}>
                    <span>SIGN OUT</span>
                    <span className={styles.signOutIcon}>{statusIcon}</span>
                </div>
               
            </div>
        </div>
    )
}

export default Settings;