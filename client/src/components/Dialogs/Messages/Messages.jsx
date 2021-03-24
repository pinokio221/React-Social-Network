import React, { useState, useEffect } from 'react';
import styles from './Messages.module.css'
import Message from './Message/Message'
import CircularProgress from '@material-ui/core/CircularProgress';
import {InputGroup, FormControl} from "react-bootstrap";
import SentimentSatisfiedSharpIcon from '@material-ui/icons/SentimentSatisfiedSharp';import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import ScrollToBottom from 'react-scroll-to-bottom';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'


const Messages = (props) => {

    let messagesElements = props.messagesData.map(m => <Message 
        key={m.id}
        author={m.author}
        authData={props.authData}
        authorData={m.authorData} 
        content={m.content}
        dialogId={m.dialogId}
        createdAt={m.createdAt}/>)

    return(
        <div className={styles.wrapper}>
            <div>
                {props.messagesIsFetching ? <CircularProgress/> : 
                <div>
                    <ScrollToBottom>
                    <div className={styles.messageItems}>
                        { messagesElements }
                    </div></ScrollToBottom>
                    <form onSubmit = {props.submitChatMessage}>
                    <div className={styles.inputBlock}>
                        <InputGroup>
                            <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder="Enter message"
                            value={props.chatMessage}
                            onChange={props.handleSearchChange}
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
                        <div className={styles.iconsTab}>
                            <SentimentSatisfiedSharpIcon onClick={props.toggleEmojiPicker} className={styles.emojiIcon} color="primary"/>
                        </div>
                        { props.emojiPicker ?
                            <div className={styles.emojiPicker}><Picker autoFocus tabIndex={0}  set='apple' onSelect={props.addEmoji} /></div>
                            : null
                            }
                    </form>
                </div>
                }
            </div>
        </div>
    );
}

export default Messages;

