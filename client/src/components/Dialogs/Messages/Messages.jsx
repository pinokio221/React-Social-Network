import React from 'react';
import styles from './Messages.module.css'
import Message from './Message/Message'
import CircularProgress from '@material-ui/core/CircularProgress';

const Messages = (props) => {
    let messagesElements = props.messagesData.map(m => <Message 
        key={m.id} 
        authorData={m.authorData} 
        content={m.content}
        dialogId={m.dialogId}
        createdAt={m.createdAt}/>)

    return(
        <div className={styles.wrapper}>
            <div className={styles.messageItems}>
                {props.messagesIsFetching ? <CircularProgress/> : messagesElements}
            </div>
        </div>
    );
}

export default Messages;

