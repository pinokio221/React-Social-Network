import React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import styles from './ProfileHub.module.css'
import {NavLink} from "react-router-dom";
import PeopleIcon from '@material-ui/icons/People';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import { IoIosPeople } from 'react-icons/io'
import { AiOutlineSetting } from 'react-icons/ai'
import { RiEmotionSadLine } from 'react-icons/ri'

const ProfileHub = (props) => {
    let friendsList =
        props.userFriends.map(f =><div>
            <NavLink to={ "/profile/" + f.id}><img className={styles.friend_user_image} src={f.profile_image} alt=""/>
            <span className={styles.friendName}>{f.first_name}</span></NavLink>
        </div>
           )
    return (
        <div>
            <Container>
                <hr className="my-4"/>
                <Row>
                {/* <Col xs={6} md={4}>
                        <Card className={styles.cardElement} border="light" style={{width: '20rem'}}>
                            <Card.Header>
                            <div className={styles.hubTitle}><span className={styles.hubIcon}><PermMediaIcon style={{fontSize: '30px'}}/></span>
                                {props.isAuthUserPage ? <span>My social media</span> : <span>{props.userInfo.first_name}'s social media</span>}
                            </div>
                                <a className={styles.showAll} href=''>Show all</a>
                            </Card.Header>
                            <Card.Body className={styles.comingBlock}>
                                <label><AiOutlineSetting className={styles.settingIcon}/></label>
                                <label>Social media coming soon</label>
                            </Card.Body>
                        </Card>
                    </Col>*/}
                    <Col xs={6} md={4}>
                        <Card className={styles.cardElement} border="light" style={{width: '20rem'}}>
                        <Card.Header>
                            <div className={styles.hubTitle}><span className={styles.hubIcon}><PeopleIcon style={{fontSize: '30px'}}/></span>
                                {props.isAuthUserPage ? <span>My friends</span> : <span>{props.userInfo.first_name}'s friends</span>}
                            </div>
                                <NavLink className={styles.showAll} to={ "/friends/" + props.userInfo.id }><span  href=''>Show all</span></NavLink>
                            </Card.Header>
                            { friendsList.length != 0 ?
                                <Card.Body className={styles.user_friends}>
                                    { friendsList }
                                </Card.Body>
                                :
                                <Card.Body className={styles.emptyBlock}>
                                    <label><RiEmotionSadLine className={styles.sadIcon}/></label>
                                    <div>
                                        { props.isAuthUserPage ?
                                            <label>Your friends list is empty</label>
                                            :
                                            <label>{props.userInfo.first_name}'s friends list is empty</label>
                                        }
                                    </div>
                                </Card.Body>
                            }
                        </Card>
                    </Col>
                    {/*
                    <Col xs={6} md={4}>
                        <Card className={styles.cardElement} border="light" style={{width: '20rem'}}>
                        <Card.Header>
                            <div className={styles.hubTitle}><span className={styles.hubIcon}><IoIosPeople style={{fontSize: '30px'}}/></span>
                                {props.isAuthUserPage ? <span>My communities</span> : <span>{props.userInfo.first_name}'s communities</span>}
                            </div>
                                <a className={styles.showAll} href=''>Show all</a>
                            </Card.Header>
                            <Card.Body className={styles.comingBlock}>
                                <label><AiOutlineSetting className={styles.settingIcon}/></label>
                                <label>Communities coming soon</label>
                            </Card.Body>
                        </Card>
                    </Col>
                    */}
                </Row>
            </Container>
            <br/>
            <hr className="my-1"/>
        </div>
    );
}

export default ProfileHub;