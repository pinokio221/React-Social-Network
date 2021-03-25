import React from 'react'
import styles from './Dialog.module.css'
import { NavLink } from 'react-router-dom'

const Dialog = (props) => {
    return (
        <div>
            <div className={styles.dialog + ' ' + styles.active}>
                <NavLink to={'/dialogs/' + props.receiveId }>
                    <div className={styles.profile_info}><img src={props.profile_image} alt=""/>
                    <span className={styles.profile_name}>{props.name}</span>
                    <span className={styles.profile_message}>3 new messages</span></div></NavLink>
            </div>
        </div>
    )
}

export default Dialog;