import React from 'react'
import styles from './Users.module.css'
import {Button, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import loader from "../../assets/images/loader.gif"

const Users = (props) => {

    let searchFieldValue = React.createRef();
    let pagesCount = Math.ceil(props.filteredUsersCount / props.pageSize);
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
                                    props.onSearchClick(searchFieldValue.current.value)}} className={styles.search_btn}>Search</Button>
                            </Col>
                        </Form.Row>
                    </Form>
            </div>
            {props.isFetching && props.filter ? <img className={styles.loader} src={loader} alt=""/> : null}                         
            <hr/>
            <div className={styles.profile_wrapper}>
                { props.usersElements.length == 0 && !props.isFetching ? <div className={styles.not_found}>Users not found</div>
                : props.searchInput == "" ? props.usersElements : props.filteredElements.length == 0 ? 
                <div className={styles.not_found}>Users not found</div> : props.filteredElements}
                
            </div>
            {props.filter ? 
                    <div>
                    { pages.map(p => {
                        return <span onClick = { () => {props.onPageChanged(p)} } className={props.currentPage === p && styles.selectedPage}>{p}</span>
                    }) }
                </div> : !props.isFetching ? <Button onClick = { () => {props.onShowMore(props.showMorePagination)} } variant="primary" size="lg" className={styles.showMoreBtn}>Show more</Button> : <img className={styles.loader} src={loader} alt=""/>
            }
            
        </div>
        </div>


    );
}

export default Users;