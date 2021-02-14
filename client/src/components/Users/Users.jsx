import React from 'react'
import styles from './Users.module.css'
import User from "./User/User";
import {Button, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as axios from "axios";

const Users = (props) => {

    let requestURL = `http://localhost:9000/users?page=${props.currentPage}&limit=${props.pageSize}`;

        if(props.users.length === 0) {
            axios.get(requestURL)
                .then(response => {
                    props.setUsers(response.data.items)
                })
        }

    let searchFieldValue = React.createRef();

    let usersElements = props.users
        .map(u => <User
            onAddFriend={props.onAddFriend}
            cancelInvitation={props.cancelInvitation}
            key = {u.id}
            id = {u.id}
            username = {u.fullname}
            age={u.age} city={u.city}
            image={u.profileImage}
            isFriend={u.isFriend}
            friendInventation={u.friendInventation}/>)

    let filteredElements = props.filteredUsers
        .map(u => <User
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
        let filteredUsers = props.users.filter(f => f.fullname.toLowerCase().includes(searchFieldValue.current.value.toLowerCase().trim()))
        props.onSearchClick(text, filteredUsers, props.filter);
    }

    let onPageChanged = (p) => {
        props.setCurrentPage(p);
        let requestURL = `http://localhost:9000/users?page=${p}&limit=${props.pageSize}`;
            axios.get(requestURL)
                .then(response => {
                    props.setUsers(response.data.items)
                })
    }

    // Pages counter
    let pagesCount = Math.ceil(props.filteredUsers.length / props.pageSize);
    let pages = [];

    for(let i=1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.search_block}>
                <div className="row justify-content-center">
                    <Form>
                        <Form.Row className="align-items-center">
                            <Col sm={7} className="my-1" className={styles.search_form}>
                                <Form.Control ref = { searchFieldValue } id="inlineFormInputName" placeholder="Search friends" />
                            </Col>
                            <Col xs="auto" className="my-1">
                                <div className={styles.filter_icon}><FontAwesomeIcon icon={faFilter} /></div>
                            </Col>
                            <Col xs="auto" className="my-1">
                                <Button onClick={() => {
                                    onSearchClick(searchFieldValue.current.value)}} className={styles.search_btn}>Search</Button>
                            </Col>
                        </Form.Row>
                    </Form>
            </div>

            <hr/>
            <div className={styles.profile_wrapper}>
                { usersElements.length == 0 ? <div className={styles.not_found}>Users not found</div>
                : props.searchInput != "" ? filteredElements : usersElements}
                
            </div>
            {props.filter ? 
                    <div>
                    { pages.map(p => {
                        return <span onClick = { () => {onPageChanged(p)} } className={props.currentPage === p && styles.selectedPage}>{p}</span>
                    }) }
                </div> : <span>Show more</span>
            }
            
        </div>
        </div>


    );
}

export default Users;