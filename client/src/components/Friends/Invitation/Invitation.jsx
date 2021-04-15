import React from 'react'
import styles from './Invitation.module.css'
import {Button} from "react-bootstrap";
import {faUndo, faUserFriends, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import { AiOutlineUserAdd } from 'react-icons/ai'
import { ImCross } from 'react-icons/im'

const Invitation = (props) => {
    return(
        <div className={styles.profile_block}>
                <div className={styles.profile_image}><img src={props.image} /></div>
                <NavLink to={ "/profile/" + props.id }><span className={styles.profile_name}><b>{props.fullname}</b></span></NavLink>
                <span>{props.age} years, {props.city}</span>
                <div className={styles.actions}>
                    { props.friendshipStatus === 1 ? 
                    <div>
                        <Button onClick={()=> { props.acceptRequest(props.id) }} className={styles.acceptBtn} variant="info">Accept friend request
                            <span className={styles.acceptIcon}><AiOutlineUserAdd/></span></Button>
                        <Button onClick={()=> { props.rejectRequest(props.id) }} className={styles.rejectBtn} variant="info">Reject request
                            <span className={styles.rejectIcon}><ImCross/></span></Button>
                    </div>
                    :
                    <div>
                        { props.friendshipStatus === 2 ? <span className={styles.acceptMsg}>Request accepted</span> : null ||
                          props.friendshipStatus === 3 ? <span className={styles.rejectMsg}>Request rejected</span> : null
                         }
                    </div>
                    }
                </div>

            </div>
    )
}

export default Invitation;