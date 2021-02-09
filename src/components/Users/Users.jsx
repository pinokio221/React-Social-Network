import React from 'react'
import styles from './Users.module.css'
import User from "./User/User";
import {Button, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as axios from "axios";

const Users = (props) => {

    let getUsers = () => {
        if(props.usersPage.usersList.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users")
                .then(response => {
                    props.setUsers([
                        {
                            id: 1,
                            fullname: "Alex Menco",
                            age: 29,
                            city: "Los Angeles",
                            isFriend: false,
                            friendInventation: false,
                            profileImage: "https://d3b4yo2b5lbfy.cloudfront.net/wp-content/uploads/2019/06/d6a1f2019-CP-Forum-Avatars-TealfulEyes-Kodan.png"
                        },
                        {
                            id: 2,
                            fullname: "Boris Gulyav",
                            age: 31,
                            city: "Moscow",
                            isFriend: false,
                            friendInventation: true,
                            profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQecV_20snjsbgZSClHCml7tnMWvSYCD7ojqQ&usqp=CAU"

                        },
                        {
                            id: 3,
                            fullname: "Genadiy Bukin",
                            age: 42,
                            city: "Ekaterinburg",
                            isFriend: false,
                            friendInventation: false,
                            profileImage: "https://i2.wp.com/avatarfiles.alphacoders.com/161/161678.jpg"

                        },
                        {
                            id: 4,
                            fullname: "Yuriy Proskyrok",
                            age: 54,
                            city: "Ekaterinburg",
                            isFriend: true,
                            friendInventation: false,
                            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg"

                        }]
                    )
                })

        }

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