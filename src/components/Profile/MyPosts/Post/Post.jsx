import React from 'react';
import s from './Post.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";


const Post = (props) => {
    return (
        <div className={s.item}>
            <img src={props.userImage} alt=""/>
            <span>{props.message}</span>
        <div>
            <FontAwesomeIcon icon={faHeart}/><span>{props.likesCount}</span>
        </div>
            </div>
    );

}


export default Post;