import React from 'react'
import styles from './Friend.module.css'
import {Button} from "react-bootstrap";
import {faUndo, faUserFriends, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import { BiConversation } from 'react-icons/bi'
import { AiOutlineUserDelete } from 'react-icons/ai'


const Friend = (props) => {
    return(
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
    )
}

export default Friend;