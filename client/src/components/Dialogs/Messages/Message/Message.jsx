import React from 'react'
import styles from './Message.module.css'

const Message = (props) => {
    return(
        <div className={styles.wrapper}>
            { props.author == props.authData.id ?
            <div>
                <img className={styles.userPhoto} src={props.authorData.profile_image} alt=""/>
                <div className={styles.my_message}>
                
                <span>{props.content}</span></div> 
            </div>
            
            :
            <div className={styles.msg_wrapper}>
                <div className={styles.other_message}>
                <span>{props.content}</span></div> 
                <img className={styles.userPhoto} src={props.authorData.profile_image} alt=""/>

            </div> 
        }
        </div>
    );
}

export default Message;