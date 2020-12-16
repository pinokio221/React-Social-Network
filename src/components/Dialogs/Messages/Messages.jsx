import React from 'react'
import Message from './Message/Message'
import styles from './Messages.module.css'


const Messages = (props) => {

    let messagesItems =
        props.messagesData.map(m => <Message message = {m.message} id = {m.id}/>)

    return (
    <div className={styles.messages}>
        {messagesItems}
    </div>
    )
}

export default Messages;