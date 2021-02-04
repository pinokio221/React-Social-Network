import React from 'react'
import styles from './Users.module.css'
import User from "./User/User";
import {Button, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Users = (props) => {
    let usersElements = props.usersPage.usersList.map(u => <User onAddFriend={props.onAddFriend} key = {u.id} id = {u.id} username = {u.fullname} age={u.age} city={u.city} image={u.profileImage} isFriend={u.isFriend}/>)

    return (
        <div className={styles.wrapper}>
            <div className={styles.search_block}>
                <div className="row justify-content-center">
                    <Form>
                        <Form.Row className="align-items-center">
                            <Col sm={7} className="my-1" className={styles.search_form}>
                                <Form.Control  id="inlineFormInputName" placeholder="Search friends" />
                            </Col>
                            <Col xs="auto" className="my-1">
                                <div className={styles.filter_icon}><FontAwesomeIcon icon={faFilter} /></div>
                            </Col>
                            <Col xs="auto" className="my-1">
                                <Button type="submit" className={styles.search_btn}>Search</Button>
                            </Col>
                        </Form.Row>
                    </Form>
            </div>

            <hr/>
            <div className={styles.profile_wrapper}>
                { usersElements }
            </div>
        </div>
        </div>


    );
}

export default Users;