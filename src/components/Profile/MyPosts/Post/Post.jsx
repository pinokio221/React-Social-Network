import React from 'react';
import s from './Post.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";


const Post = (props) => {
    return (
        <div className={s.item}>
        <img src="data:image/jpeg;base64,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" alt=""/>
        <span>{props.message}</span>
        <div>
            <FontAwesomeIcon icon={faHeart}/><span>{props.likesCount}</span>
        </div>
            </div>
    );

}


export default Post;