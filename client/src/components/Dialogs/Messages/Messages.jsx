import React from 'react'
import { Redirect } from 'react-router-dom'
import Message from './Message/Message'
import styles from './Messages.module.css'

const Messages = (props) => {

    let messagesItems =
        props.messagesData.map(m => <Message key = {m.id} message = {m.message} id = {m.id}/>)

    let onSendMessageClick = () => {
        props.onSendMessageClick();
    }

    let onChangeMessageBody = (e) => {
        let body = e.target.value;
        props.onChangeMessageBody(body);
    }

    if(props.isAuth === false){
        return <Redirect to={'/login'}/>
    }

    return (
    <div className={styles.messages}>
        <div>{ messagesItems }</div>
        <div>
            <div><textarea placeholder={"Enter your message"} onChange={ onChangeMessageBody } value={props.newMessageBody}></textarea></div>
            <div><button onClick={ onSendMessageClick }>Send message</button></div>
        </div>
    </div>
    )
}

export default Messages;