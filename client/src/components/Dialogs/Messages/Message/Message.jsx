import React from 'react'
import styles from './Message.module.css'
import { NavLink } from 'react-router-dom'

const Message = (props) => {
    return(
        <div className={styles.wrapper}>
            { props.author == props.authData.id ?
            <div>
                <NavLink to={ '/profile/' + props.authData.id }><img className={styles.userPhoto} src={props.authorData.profile_image} alt=""/></NavLink>
                <div className={styles.my_message}>
                <span>{props.content}</span></div> 
            </div>
            
            :
            <div className={styles.msg_wrapper}>
                <div className={styles.other_message}>
                <span>{props.content}</span></div> 
                <NavLink to={ '/profile/' + props.author }><img className={styles.userPhoto} src={props.authorData.profile_image} alt=""/></NavLink>
            </div> 
        }
        </div>
    );
}

export default Message;