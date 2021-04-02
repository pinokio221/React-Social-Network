import React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import styles from './ProfileHub.module.css'
import {NavLink} from "react-router-dom";
import PeopleIcon from '@material-ui/icons/People';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import { IoIosPeople } from 'react-icons/io'


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
                <Col xs={6} md={4}>
                        <Card className={styles.cardElement} border="light" style={{width: '20rem'}}>
                            <Card.Header>
                            <div className={styles.hubTitle}><span className={styles.hubIcon}><PermMediaIcon style={{fontSize: '30px'}}/></span><span>My social media</span></div>
                                <a className={styles.showAll} href=''>Show all</a>
                            </Card.Header>
                            <Card.Body className={styles.user_friends}>
                                <span></span>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={4}>
                        <Card className={styles.cardElement} border="light" style={{width: '20rem'}}>
                        <Card.Header>
                                <div className={styles.hubTitle}><span className={styles.hubIcon}><PeopleIcon style={{fontSize: '30px'}}/></span><span>My friends</span></div>
                                <a className={styles.showAll} href=''>Show all</a>
                            </Card.Header>
                            <Card.Body className={styles.user_friends}>
                                { friendsList }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={4}>
                        <Card className={styles.cardElement} border="light" style={{width: '20rem'}}>
                        <Card.Header>
                                <div className={styles.hubTitle}><span className={styles.hubIcon}><IoIosPeople style={{fontSize: '30px'}}/></span><span>My communities</span></div>
                                <a className={styles.showAll} href=''>Show all</a>
                            </Card.Header>
                            <Card.Body className={styles.user_friends}>
                                <span></span>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <br/>
            <hr className="my-1"/>
        </div>
    );
}

export default ProfileHub;