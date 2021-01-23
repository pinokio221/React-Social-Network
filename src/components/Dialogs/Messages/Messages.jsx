import React from 'react'
import Message from './Message/Message'
import styles from './Messages.module.css'
import {sendMessageActionCreator, updateMessageBodyActionCreator} from "../../../redux/dialogs-reducer";


const Messages = (props) => {

    let messagesItems =
        props.messagesData.map(m => <Message message = {m.message} id = {m.id}/>)

    let onSendMessageClick = () => {
        props.dispatch(sendMessageActionCreator())
    }

    let onChangeMessageBody = (e) => {
        let body = e.target.value;
        props.dispatch(updateMessageBodyActionCreator(body))
    }

    return (
    <div className={styles.messages}>
        <div>{ messagesItems }</div>
        <div>
            <div><textarea placeholder={"Enter your message"} onChange={ onChangeMessageBody }></textarea></div>
            <div><button onClick={ onSendMessageClick }>Send message</button></div>
        </div>
    </div>
    )
}

export default Messages;