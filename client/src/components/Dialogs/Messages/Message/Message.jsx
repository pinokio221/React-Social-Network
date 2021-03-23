import React from 'react'
import styles from './Message.module.css'

const Message = (props) => {

    return(
        <div className={styles.wrapper}>
            <img className={styles.userPhoto} src={props.authorData.profile_image} alt=""/>
            <span>{props.authorData.first_name} says: </span>
            <span>{props.content}</span>
        </div>
    );
}

export default Message;