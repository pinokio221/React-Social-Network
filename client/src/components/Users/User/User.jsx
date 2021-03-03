import React from 'react'
import styles from './User.module.css'
import {Button} from "react-bootstrap";
import {faUndo, faUserFriends, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";

const User = (props) => {
    let sentInvitation = (userId) => {
        props.sentInvitation(userId);
    }
    let cancelInvitation = (userId) => {
        props.cancelInvitation(userId);
    }
    return (
            <div className={styles.profile_block}>
                <div className={styles.profile_image}><img src={props.image} /></div>
                <NavLink to={ "/profile/" + props.id }><span><b>{props.username}</b></span></NavLink>
                <span>{props.age} years, {props.city}</span>
                <div className={styles.status}>
                    {props.friendInventation ? <div><span className={styles.inventation_status}>{"Friend invitation sent"}</span><Button onClick={()=> { cancelInvitation(props.id) }} className={styles.undo_btn} size="sm" variant="danger">cancel <FontAwesomeIcon className={styles.friend_icon} icon={faUndo}/></Button>{' '}</div> :
                        props.isFriend ? <span className={styles.friend_status}><b>{"You are friends"}</b><FontAwesomeIcon className={styles.friend_icon} icon={faUserFriends}/></span>
                            : <Button onClick={()=> { sentInvitation(props.id) }} className={styles.add_btn} variant="outline-success">Add friend <span className={styles.vl}></span>
                                <FontAwesomeIcon icon={faUserPlus}/></Button> }
                </div>

            </div>


    );
}

export default User;