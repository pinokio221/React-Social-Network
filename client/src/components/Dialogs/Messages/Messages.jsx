import React, { useState, useEffect } from 'react';
import styles from './Messages.module.css'
import Message from './Message/Message'
import CircularProgress from '@material-ui/core/CircularProgress';
import {InputGroup, FormControl} from "react-bootstrap";
import queryString from 'query-string';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';


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
                {props.messagesIsFetching ? <CircularProgress/> : 
                <div>
                    { messagesElements }
                    <form onSubmit = {props.submitChatMessage}>
                    <div className={styles.inputBlock}>
                        <InputGroup>
                            <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder="Enter message"
                            value={props.chatMessage}
                            onChange={props.handleSearchChange}
                            onSubmit = {props.submitChatMessage}
                            />
                        </InputGroup>
                        <Button
                            className={styles.sendBtn}
                            variant="contained"
                            color="primary"
                            type='submit'
                            endIcon={<SendIcon/>}>
                            Send
                        </Button>
                        </div>
                    </form>
                </div>
                }
            </div>
        </div>
    );
}

export default Messages;

