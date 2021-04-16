import React from 'react'
import styles from './Friend.module.css'
import {Button} from "react-bootstrap";
import {faUndo, faUserFriends, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import { BiConversation } from 'react-icons/bi'
import { AiOutlineUserDelete } from 'react-icons/ai'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const Friend = (props) => {
    let isAuthUserPage = false;
    if(props.profilePageId === undefined || props.profilePageId == props.authData.id) {
        isAuthUserPage = true;
    }
    return(
        <div>
            { isAuthUserPage ?
                <div className={styles.profile_block}>
                    <div className={styles.profile_image}><img src={props.image} /></div>
                    <NavLink to={ "/profile/" + props.id }><span className={styles.profile_name}><b>{props.fullname}</b></span></NavLink>
                    <div className={styles.actions}>
                        <NavLink to={'/dialogs/' + props.id}>
                            <Button className={styles.convBtn} variant="info">Send private message
                                <span className={styles.convIcon}><BiConversation/></span></Button>
                        </NavLink>
                        <Button onClick={()=> { props.removeFriend(props.id) }} className={styles.removeBtn} variant="info">Remove from friends
                            <span className={styles.removeIcon}><AiOutlineUserDelete/></span></Button>
                    </div>
                </div>
            :
            <div className={styles.profile_block}>
                <div className={styles.profile_image}><img src={props.image} /></div>
                    <NavLink to={ "/profile/" + props.id }><span className={styles.profile_name}><b>{props.fullname}</b></span></NavLink>
                    <div className={styles.status}>
                    {props.friendshipStatus === 1 ? <div><span className={styles.inventation_status}>{"Friend invitation sent"}</span><Button onClick={()=> { props.cancelInvitation(props.id) }} className={styles.undo_btn} size="sm" variant="danger">cancel <FontAwesomeIcon className={styles.friend_icon} icon={faUndo}/></Button>{' '}</div> :
                        props.friendshipStatus === 2 ? <span className={styles.friend_status}><b>{"You are friends"}</b><FontAwesomeIcon className={styles.friend_icon} icon={faUserFriends}/></span>
                            : <Button onClick={()=> { props.sendInvitation(props.id) }} className={styles.add_btn} variant="outline-success">Add friend <span className={styles.vl}></span>
                                <FontAwesomeIcon icon={faUserPlus}/></Button> }
                    </div>
            </div>
            }
        </div>
    )
}

export default Friend;