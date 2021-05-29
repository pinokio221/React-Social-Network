import React, { useState } from 'react';
import styles from './Post.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faShare} from "@fortawesome/free-solid-svg-icons";
import {Alert} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {faCommentAlt} from "@fortawesome/free-regular-svg-icons";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Box from '@material-ui/core/Box';
import {Button, Form } from "react-bootstrap";
import { Field, reduxForm } from "redux-form"
import { required, maxLengthCreator } from "../../../../validators/validator"
import { ReduxTextArea } from '../../../FormControls/ReduxFormControls'
import { connect } from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { TiPencil, TiTrash } from 'react-icons/ti';

const fieldMaxLength = maxLengthCreator(5000);

const compareDates = (todayDate, publishDate) => {
    const today = new Date(todayDate);
    const yesterday = new Date(todayDate)
    const publish = new Date(publishDate);
    
    yesterday.setDate(today.getDate() - 1)
    today.setHours(0); today.setMinutes(0); today.setSeconds(0, 0);
    yesterday.setHours(0); yesterday.setMinutes(0); yesterday.setSeconds(0, 0);
    publish.setHours(0); publish.setMinutes(0); publish.setSeconds(0, 0);
    

    if(publish.getTime() == today.getTime()) return 'Today'
    if(publish.getTime() == yesterday.getTime()) return 'Yesterday'
}

const getPublishDate = (publishDate) => {
    let dateString;
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    const todayDate = new Date();
    let date = new Date(publishDate);

    dateString = compareDates(todayDate, date);

    if(!dateString) {
        let day = date.getDate();
        let month = monthNames[date.getMonth()];
        let year = date.getFullYear();
        dateString = month + ', ' + day + ', ' + year;
    }
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+ minutes : minutes;
    let timeString = 'at ' + hours + ':' + minutes + ' ' + ampm;
    let result = dateString + ' ' + timeString

    return result;
}

const SkipDialog = (props) => {

    const handleClose = () => {
        props.setSkipDialog(false);
    };

    const handleSubmit = () => {
        props.setSkipDialog(false);
        props.setEditMode(false);
    }
    return(
        <Dialog
            open={props.skipDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Discard all changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Discard
          </Button>
        </DialogActions>
        </Dialog>
    )
}

let PostForm = (props) => {
    const handleClose = () => {
        props.setEditMode(false);
    }
    const skipClose = (e) => {
        if(props.editMode == true) {
            props.setSkipDialog(true);
            setTimeout(function() {
                e.currentTarget.focus();
            }, 1)
        }
    }
    const handleSubmit = () => {
        props.setEditMode(false)
        props.handleSubmit()
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <Form >
                <Form.Group controlId="postForm">
                    <Field autoFocus onBlur={skipClose} component={ReduxTextArea} name='content' validate={[required, fieldMaxLength]}/>
                </Form.Group>
            </Form>
            <Button onMouseDown={handleClose} variant="secondary">Cancel</Button>
            <Button className={styles.updatePostBtn} type='submit' onMouseDown={handleSubmit} variant="info">Update Post</Button>
        
        </form>
    );
}

PostForm = reduxForm({
    form: 'editPost',
    enableReinitialize: true
})(PostForm);

PostForm = connect(
    state => ({
      initialValues: state.profilePage.editedPost
    })
  )(PostForm)


const Post = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [editMode, setEditMode] = useState(false);
    const [skipDialog, setSkipDialog] = useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSubmit = (formData) => {
        setSkipDialog(false);
        setEditMode(false);
        props.updatePost(formData.id, formData.content)
        props.setEditedPostAction(null);
    }

    const handleClose = (option, id, content) => {
        if(option === 'edit' && !editMode) {
            setEditMode(true)
            console.log(editMode)
            props.setEditedPostAction({ id, content });
        }
        if(option === 'remove') {
            props.deletePost(id, props.authId);
        }
    setAnchorEl(null);
    };
    return (
        <div className={styles.item}>
            <Box boxShadow={3}>
            <Alert key='info' variant='info'>
                <div>
                    { skipDialog && <SkipDialog skipDialog={skipDialog} setSkipDialog={setSkipDialog} setEditMode={setEditMode}/> }
                    { editMode ?
                        <div>
                            <PostForm 
                                setEditMode={setEditMode}
                                editMode={editMode}
                                setEditedPost={props.setEditedPostAction}
                                setSkipDialog={setSkipDialog}
                                onSubmit={handleSubmit}
                                />
                        </div>
                        :
                        <div>
                            <img src={props.userInfo.profile_image} alt=""/>
                            <span className={styles.user_name}>
                                <NavLink to = {'/profile/' + props.userInfo.id} activeClassName={styles.activeLink}><b>{props.userInfo.fullname}</b></NavLink>{" added a new post:"}
                            </span>
                            <div className={styles.post_option}>
                            { props.isAuthUserPage ?
                                <div>
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={handleClick}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id="long-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={open}
                                        onClose={handleClose}
                                        PaperProps={{
                                        style: {
                                            width: '15ch',},}}>
                                        
                                        <MenuItem key='edit' onClick={() => {handleClose('edit', props.id, props.content)}}>
                                            <span><TiPencil className={styles.postMenuIcon}/> Edit</span>
                                        </MenuItem>
                                        <MenuItem key='remove' onClick={() => {handleClose('remove', props.id, props.content)}}>
                                            <span><TiTrash className={styles.postMenuIcon}/> Remove</span>
                                        </MenuItem>
                                        
                                    </Menu>
                                </div> : null
                            }
                            </div>
                            <div className={styles.post_content}>{props.content}</div>
                                <hr className="my-2"/>
                                <div>
                                    <table>
                                        <tr>
                                            <td><span className={styles.like_icon}><FontAwesomeIcon icon={faHeart}/> <span>{props.likesCount}</span></span></td>
                                            <td><span className={styles.comment_icon}><FontAwesomeIcon icon={faCommentAlt}/> <span>{props.commentsCount}</span></span></td>
                                            <td><span className={styles.share_icon}><FontAwesomeIcon icon={faShare}/><span>{props.repostsCount}</span></span></td>
                                            <td><span className={styles.posted_info}>{getPublishDate(props.publishDate)}</span></td>
                                        </tr>

                                    </table>
                            </div>
                        </div>
                     } 
                    </div>
            </Alert>
            <div>
        </div>
        </Box></div>
    );

}


export default Post;