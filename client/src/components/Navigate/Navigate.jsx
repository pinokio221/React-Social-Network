import React from 'react';
import styles from './Navigate.module.css';
import { NavLink } from 'react-router-dom';
import {
    faUser,
    faEnvelope,
    faNewspaper,
    faHeadphones,
    faCog, faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigate = () => {
    return (
        <nav className = {styles.nav}>
            <div className = {styles.item}><NavLink to = '/profile' activeClassName={styles.activeLink}><span className={styles.icon}><FontAwesomeIcon icon={faUser}/></span>Profile</NavLink></div>
            <div className = {styles.item}><NavLink to = '/dialogs' activeClassName={styles.activeLink}><span className={styles.icon}><FontAwesomeIcon icon={faEnvelope}/></span>Messages</NavLink></div>
            <div className = {styles.item}><NavLink to = '/news' activeClassName={styles.activeLink}><span className={styles.icon}><FontAwesomeIcon icon={faNewspaper}/></span>News</NavLink></div>
            <div className = {styles.item}><NavLink to = '/music' activeClassName={styles.activeLink}><span className={styles.icon}><FontAwesomeIcon icon={faHeadphones}/></span>Music</NavLink></div>
            <div className = {styles.item}><NavLink to = '/settings' activeClassName={styles.activeLink}><span className={styles.icon}><FontAwesomeIcon icon={faCog}/></span>Settings</NavLink></div>
            <hr/>
            <div className = {styles.item}><NavLink to = '/users' activeClassName={styles.activeLink}><span className={styles.icon}><FontAwesomeIcon icon={faSearch}/></span>Find friends</NavLink></div>
    </nav>
    );
}

export default Navigate;