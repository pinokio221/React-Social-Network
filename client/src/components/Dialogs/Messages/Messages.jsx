import React, { useState, useEffect, useRef } from 'react';
import styles from './Messages.module.css'
import Message from './Message/Message'
import CircularProgress from '@material-ui/core/CircularProgress';
import {InputGroup, FormControl} from "react-bootstrap";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SentimentSatisfiedSharpIcon from '@material-ui/icons/SentimentSatisfiedSharp';
import Button from '@material-ui/core/Button';
import { Scrollbars } from 'react-custom-scrollbars';
import SendIcon from '@material-ui/icons/Send';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ScrollToBottom from 'react-scroll-to-bottom';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { Form } from 'react-bootstrap'
import InfiniteScroll from "react-infinite-scroll-component";
import { Scrollbar } from "react-scrollbars-custom";


import { Link, animateScroll as scroll } from "react-scroll";

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
                                    hasMore={props.hasMore}
                                    inverse={true}
                                    endMessage={
                                        <p style={{ textAlign: 'center' }}>
                                          <b>Yay! You have seen it all</b>
                                        </p>
                                      }
                                    loader={<div className={styles.fetchMoreMessagesProgress}><CircularProgress /></div>}>
                                        
                                { messagesElements }
                                
                            </InfiniteScroll>
                        </div>
                            
                            { props.displayDownButton ?
                            <KeyboardArrowDownIcon  className={styles.scrolldownBtn}/> : null }
                        </div>}
                    
                    <Form onSubmit={props.submitChatMessage}>
                    <div className={styles.inputBlock}>
                        <InputGroup hasValidation>
                            <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder="Enter message"
                            value={props.chatMessage}
                            onChange={props.handleSearchChange}
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
                </div>
            </div>
        </div>
    );
}

export default Messages;

