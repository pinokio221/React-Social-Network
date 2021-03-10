import React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import styles from './ProfileHub.module.css'


const ProfileHub = (props) => {
    let friendsList =
        props.userFriends.map(f =><div>
            <img className={styles.friend_user_image} src={f.user_image} alt=""/>
            <a href=''>{f.first_name}</a>
        </div>
           )
    return (
        <div>
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
    );
}

export default ProfileHub;