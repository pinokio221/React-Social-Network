import React from 'react'
import styles from './Users.module.css'
import User from "./User/User";
import {Button, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as axios from "axios";

const Users = (props) => {

    let requestURL = "http://localhost:9000/users";

    if(props.usersPage.usersList.length === 0) {
        axios.get(requestURL)
            .then(response => {
                props.setUsers(response.data.users)
            })
    }

    let newSearchElement = React.createRef();

    let usersElements = props.usersPage.usersList.map(u => <User
        onAddFriend={props.onAddFriend}
        cancelInvitation={props.cancelInvitation}
        key = {u.id}
        id = {u.id}
        username = {u.fullname}
        age={u.age} city={u.city}
        image={u.profileImage}
        isFriend={u.isFriend}
        friendInventation={u.friendInventation}/>)

    let onSearchClick = (text) => {
        props.onSearchClick(text);
    }
    let onSearchInputChange = () => {
        let value = newSearchElement.current.value;
        props.onSearchInputChange(value);

    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.search_block}>
                <div className="row justify-content-center">
                    <Form>
                        <Form.Row className="align-items-center">
                            <Col sm={7} className="my-1" className={styles.search_form}>
                                <Form.Control onChange={ onSearchInputChange } ref={ newSearchElement } value={props.searchInput} id="inlineFormInputName" placeholder="Search friends" />
                            </Col>
                            <Col xs="auto" className="my-1">
                                <div className={styles.filter_icon}><FontAwesomeIcon icon={faFilter} /></div>
                            </Col>
                            <Col xs="auto" className="my-1">
                                <Button onClick={() => {onSearchClick(props.searchInput)}} className={styles.search_btn}>Search</Button>
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