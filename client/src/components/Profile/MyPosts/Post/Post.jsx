import React from 'react';
import styles from './Post.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faShare, faEllipsis} from "@fortawesome/free-solid-svg-icons";
import {Alert, Dropdown, DropdownButton} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {faComment, faCommentAlt, faComments} from "@fortawesome/free-regular-svg-icons";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Slide } from "react-awesome-reveal";
import Box from '@material-ui/core/Box';


const options = [
    'Edit',
    'Remove'
  ];



const Post = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);};

    const handleClose = (option, id) => {
        if(option === 'Remove') {
            props.deletePost(id, props.authId);
        }
    setAnchorEl(null);};
    return (
        <div className={styles.item}>
            <Box boxShadow={3}>
            <Alert key='info' variant='info'>
                <div>
                    <img src={props.userInfo.profile_image} alt=""/>
                    <span className={styles.user_name}>
                        <NavLink to = {'/profile/' + props.userInfo.id} activeClassName={styles.activeLink}>{props.userInfo.fullname}</NavLink>{" added a new post:"}</span>
                        <div className={styles.post_option}>
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
                                width: '20ch',},}}>
                            {options.map((option) => (
                            <MenuItem key={option} onClick={() => {handleClose(option, props.id)}}>
                                {option}
                            </MenuItem>
                            ))}
                        </Menu>
                        </div>
                        </div>
                <div className={styles.post_content}>{props.content}</div>
                <hr className="my-2"/>
                <div>
                    <table>
                        <tr>
                            <td><span className={styles.like_icon}><FontAwesomeIcon icon={faHeart}/> <span>{props.likesCount}</span></span></td>
                            <td><span className={styles.comment_icon}><FontAwesomeIcon icon={faCommentAlt}/> <span>{props.commentsCount}</span></span></td>
                            <td><span className={styles.share_icon}><FontAwesomeIcon icon={faShare}/><span>{props.repostsCount}</span></span></td>
                            <td><span className={styles.posted_info}>Posted 26, November at 03:24 AM</span></td>
                        </tr>

                    </table>
                </div>
            </Alert>
            <div>
        </div>
        </Box></div>
    );

}


export default Post;