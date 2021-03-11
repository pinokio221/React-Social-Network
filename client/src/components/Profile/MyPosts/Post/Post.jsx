import React from 'react';
import styles from './Post.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faShare, faUser} from "@fortawesome/free-solid-svg-icons";
import {Alert} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {faComment, faCommentAlt, faComments} from "@fortawesome/free-regular-svg-icons";


const Post = (props) => {
    return (
        <div className={styles.item}>
            <Alert key='info' variant='info'>
                <div><img src={props.userInfo.profile_image} alt=""/><span className={styles.user_name}><NavLink to = {'/profile/' + props.userInfo.id} activeClassName={styles.activeLink}>{props.userInfo.fullname}</NavLink>{" added a new post:"}</span></div>
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
            </div>
    );

}


export default Post;