import React from 'react';
import styles from './ProfileInfo.module.css';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {faPencilAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import loader from "../../../assets/images/loader.gif"



const ProfileInfo = (props) => {
    let friendsList =
        props.userFriends.map(f =><div>
            <img className={styles.friend_user_image} src={f.user_image} alt=""/>
            <a href=''>{f.first_name}</a>
        </div>
           )
    return (
        <div className={styles.component_wrapper}>
            <div className={styles.headerPhoto}>
                <img src={props.userInfo.headerImage}></img>
            </div>
            <div className={styles.descriptionBlock}>
                <div>
                    <Container>
                        <Row>
                            <Col xs={6} md={4} className={styles.user_image_block}>
                                <Image className={styles.user_image} src={props.userInfo.profileImage} roundedCircle/>
                                <Button className={styles.change_photo_btn} variant="light">Change profile
                                    photo</Button>
                            </Col>
                            <Col>
                                <div className={styles.user_description}>
                                    <div><span
                                        className={styles.user_name}>{props.userInfo.fullname}</span>
                                    </div>
                                    {props.userInfo.status ?
                                     <div className={styles.user_status}>
                                     <span>{props.userInfo.status}</span><FontAwesomeIcon
                                     className={styles.pencil_icon} icon={faPencilAlt}/></div> :
                                     <span className={styles.no_status}>change status</span>}
                                   
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
                    <Container>
                        <hr className="my-4"/>
                        <Row>
                        <Col xs={6} md={4}>
                                <Card border="light" style={{width: '20rem'}}>
                                    <Card.Header>
                                        <span>My social media</span>
                                        <a className={styles.showAll} href=''>Show all</a>
                                    </Card.Header>
                                    <Card.Body className={styles.user_friends}>
                                        { friendsList }
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={6} md={4}>
                                <Card border="light" style={{width: '20rem'}}>
                                <Card.Header>
                                        <span>My friends</span>
                                        <a className={styles.showAll} href=''>Show all</a>
                                    </Card.Header>
                                    <Card.Body className={styles.user_friends}>
                                        { friendsList }
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={6} md={4}>
                                <Card border="light" style={{width: '20rem'}}>
                                <Card.Header>
                                        <span>My communitites</span>
                                        <a className={styles.showAll} href=''>Show all</a>
                                    </Card.Header>
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