import React from 'react'
import styles from './User.module.css'
import {Button} from "react-bootstrap";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";



const User = (props) => {
    let onAddFriend = () => {
        props.onAddFriend();
    }
    return (
            <div className={styles.profile_block}>
                <div className={styles.profile_image}><img src={props.image} /></div>
                <NavLink to={ "/" + props.id }><span><b>{props.username}</b></span></NavLink>
                <span>{props.age} years, {props.city}</span>
                {props.isFriend ?
                    <Button onClick={onAddFriend} className={styles.add_btn} variant="outline-success">Add friend <span className={styles.vl}></span>
                        <FontAwesomeIcon className={styles.add_friend_icon} icon={faUserPlus}/></Button> : <span>{"You are friends"}</span> }
            </div>


    );
}

export default User;