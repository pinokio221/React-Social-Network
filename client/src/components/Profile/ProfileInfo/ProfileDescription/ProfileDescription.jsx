import React from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {faPencilAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from './ProfileDescription.module.css';
import ProfileStatus from './ProfileStatus/ProfileStatus';

const ProfileDescription = (props) => {
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
                                <Image className={styles.user_image} src={props.userInfo.profile_image} roundedCircle/>
                                <Button className={styles.change_photo_btn} variant="light">Change profile
                                    photo</Button>
                            </Col>
                            <Col>
                                <div className={styles.user_description}>
                                    <div><span
                                        className={styles.user_name}>{props.userInfo.fullname}</span>
                                    </div>
                                   <ProfileStatus updateProfileStatus={props.updateProfileStatus} status={props.userInfo.status}/>
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