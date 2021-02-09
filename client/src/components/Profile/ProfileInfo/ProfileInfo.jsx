import React from 'react';
import styles from './ProfileInfo.module.css';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {faPencilAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const ProfileInfo = (props) => {
    let friendsList =
        props.friendsInfo.map(f =><div>
            <img className={styles.friend_user_image} src={f.user_image} alt=""/>
            <span>{f.first_name}</span>
        </div>
           )

    return (
        <div className={styles.component_wrapper}>
            <div className={styles.headerPhoto}>
                <img src={props.userInfo.user_header}></img>
            </div>
            <div className={styles.descriptionBlock}>
                <div>
                    <Container>
                        <Row>
                            <Col xs={6} md={4} className={styles.user_image_block}>
                                <Image className={styles.user_image} src={props.userInfo.user_image} roundedCircle/>
                                <Button className={styles.change_photo_btn} variant="light">Change profile
                                    photo</Button>
                            </Col>
                            <Col>
                                <div className={styles.user_description}>
                                    <div><span
                                        className={styles.user_name}>{props.userInfo.first_name + ' ' + props.userInfo.last_name}</span>
                                    </div>
                                    <div className={styles.user_status}>
                                        <span>{props.userInfo.user_status}</span><FontAwesomeIcon
                                        className={styles.pencil_icon} icon={faPencilAlt}/></div>
                                    <br/><br/>
                                    <span><b>User Information</b></span>
                                    <hr className="my-1"/>
                                    <div>
                                        <span>City: {props.userInfo.user_city}</span><br/>
                                        <span>Age: {props.userInfo.user_age}</span><br/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        </Container>
                    <Container>
                        <hr className="my-4"/>
                        <Row>
                            <Col xs={6} md={4}>
                                <Card border="light" style={{width: '15rem'}}>
                                    <Card.Header>My Friends List</Card.Header>
                                    <Card.Body>
                                            <div className={styles.user_friends}>{ friendsList }</div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={6} md={4}>
                                <Card border="light" style={{width: '15rem'}}>
                                    <Card.Header>My Friends List</Card.Header>
                                    <Card.Body className={styles.user_friends}>
                                        { friendsList }
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={6} md={4}>
                                <Card border="light" style={{width: '15rem'}}>
                                    <Card.Header>My Friends List</Card.Header>
                                    <Card.Body className={styles.user_friends}>
                                        { friendsList }
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    <br/>
                    <hr className="my-1"/>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;