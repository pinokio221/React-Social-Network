import React from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import styles from './ProfileDescription.module.css';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import MaterialButton from '@material-ui/core/Button'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { BiConversation } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'
import { RiMailSendLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import ProfilePhotoModal from './ProfilePhotoModal'

const ProfileDescription = (props) => {

    const sendInvitation = (userId) => {
        props.sendInvitation(userId);
    }
    return (
        <div className={styles.component_wrapper}>
            <div className={styles.headerPhoto}>
                <img src={props.userInfo.header_image}></img>
            </div>
            <div className={styles.descriptionBlock}>
                <div>
                    <Container>
                        <Row>
                            <Col xs={6} md={4} className={styles.user_image_block}>
                                <Image className={styles.user_image} src={props.userInfo.profile_image + '?' + new Date()} roundedCircle/>
                                { props.isAuthUserPage ? 
                                    <ProfilePhotoModal updateProfilePicture={props.updateProfilePicture}/>
                                :
                                    <div>
                                        <NavLink to={'/dialogs/' + props.userInfo.id}><MaterialButton variant="contained" size="default" ><BiConversation className={styles.userActionsIcon}/>Start dialog with {props.userInfo.first_name}</MaterialButton></NavLink>
                                        <div>
                                            {
                                                props.friendshipStatus === 0 ?
                                                    <MaterialButton onClick={() => { sendInvitation(props.userInfo.id) }} variant="contained" size="default" color="primary"><AiOutlineUsergroupAdd className={styles.userActionsIcon}/>Send friend invitation</MaterialButton>
                                                : null ||
                                                props.friendshipStatus === 1 ? 
                                                    <MaterialButton disabled size="default" color="primary">
                                                        <RiMailSendLine className={styles.userActionsIcon}/>Friend invitation sent</MaterialButton>
                                                : null ||
                                                props.friendshipStatus === 2 ?
                                                    <MaterialButton style={{ cursor: 'default', backgroundColor: 'transparent' }} disableRipple size="default" color="primary">
                                                        <FiUsers className={styles.userActionsIcon}/>{props.userInfo.first_name} is your friend</MaterialButton> : null
                                            }
                                        </div>
                                    </div>
                                }
                            </Col>
                            <Col>
                                <div className={styles.user_description}>
                                    <div><span
                                        className={styles.user_name}>{props.userInfo.fullname}</span>
                                    </div>
                                    <ProfileStatus isAuthUserPage={props.isAuthUserPage} updateProfileStatus={props.updateProfileStatus} status={props.userInfo.status}/>
                                    <br/><br/>
                                    <span><b>User Information</b></span>
                                    <hr className="my-1"/>
                                    <div>
                                        <span>City: {props.userInfo.city}</span><br/>
                                        <span>Age: {props.userInfo.age}</span><br/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        </Container>
                </div>
            </div>
        </div>
    );
}

export default ProfileDescription;