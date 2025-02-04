import React, { useState, useEffect, useRef } from 'react';
import styles from './Messages.module.css'
import Message from './Message/Message'
import CircularProgress from '@material-ui/core/CircularProgress';
import {Form, InputGroup, FormControl} from "react-bootstrap";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SentimentSatisfiedSharpIcon from '@material-ui/icons/SentimentSatisfiedSharp';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import InfiniteScroll from "react-infinite-scroll-component";

const ChatMessageForm = (props) => {
    return (
        <Form onSubmit={props.submitChatMessage}>
            <div className={styles.inputBlock}>
                <InputGroup>
                    <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder="Enter message"
                    value={props.chatMessage}
                    onChange={props.handleSearchChange}
                    maxLength='1000'
                    required
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
                    <AttachFileIcon className={styles.attachIcon} color='primary'/>
                </div>
                { props.emojiPicker ?
                    <div className={styles.emojiPicker}><Picker autoFocus tabIndex={0}  set='apple' onSelect={props.addEmoji} /></div>
                    : null
                    }
        </Form>
    )
}
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
                <div>
                    {props.messagesIsFetching ? <div class={styles.fetchProgress}><CircularProgress/></div>
                    : <div className={styles.messageItems}>
                        
                        <div id='scrollableComponent' style={{
                                height: 300,
                                display: 'flex',
                                overflow:'auto',
                                flexDirection: 'column-reverse',}}>
                            <InfiniteScroll
                                    dataLength={messagesElements.length}
                                    style={{ display: 'flex', flexDirection: 'column-reverse', overflow:'auto' }}
                                    scrollableTarget='scrollableComponent'
                                    next={props.fetchMoreMessages}
                                    hasMore={ messagesElements.length > 0 ? props.hasMore : false }
                                    inverse={true}
                                    endMessage={
                                        <p style={{ textAlign: 'center' }}>
                                            { messagesElements.length === 0 ? <label className={styles.msgHistoryText}>Messages history is empty...</label>
                                            :
                                            <b>START MESSAGING</b>
                                            }
                                        </p>
                                      }
                                    loader={<div className={styles.fetchMoreMessagesProgress}><CircularProgress /></div>}>
                                        
                                { messagesElements }
                            </InfiniteScroll>
                        </div>
                            
                            { props.displayDownButton ?
                            <KeyboardArrowDownIcon  className={styles.scrolldownBtn}/> : null }
                        </div> }
                    <ChatMessageForm {...props} />
                </div>
            </div>
        </div>
    );
}

export default Messages;

