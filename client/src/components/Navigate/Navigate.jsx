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
import { CgProfile } from 'react-icons/cg'
import { BiNews } from 'react-icons/bi'
import { RiSettings5Line } from 'react-icons/ri'
import { FiHeadphones } from 'react-icons/fi'
import { GoSearch } from 'react-icons/go'
import MailOutlineIcon from '@material-ui/icons/MailOutline';


const Navigate = () => {
    return (
        <nav className = {styles.nav}>
            <NavLink to = '/profile' activeClassName={styles.activeLink}><div className = {styles.item}><span className={styles.icon}><CgProfile/></span><span className={styles.itemName}>PROFILE</span></div></NavLink>
            <NavLink to = '/dialogs' activeClassName={styles.activeLink}><div className = {styles.item}><span className={styles.icon}><MailOutlineIcon style={{fontSize: '27px'}}/></span><span className={styles.itemName}>MESSAGES</span></div></NavLink>
            <NavLink to = '/news' activeClassName={styles.activeLink}><div className = {styles.item}><span className={styles.icon}><BiNews/></span><span className={styles.itemName}>NEWS</span></div></NavLink>
            <NavLink to = '/music' activeClassName={styles.activeLink}><div className = {styles.item}><span className={styles.icon}><FiHeadphones/></span><span className={styles.itemName}>MUSIC</span></div></NavLink>
            <NavLink to = '/settings' activeClassName={styles.activeLink}><div className = {styles.item}><span className={styles.icon}><RiSettings5Line/></span><span className={styles.itemName}>SETTINGS</span></div></NavLink>
            <span><hr/></span>
            <NavLink to = '/users' activeClassName={styles.activeLink}><div className = {styles.item}><span className={styles.icon}><GoSearch/></span><span className={styles.itemName}>FIND FRIENDS</span></div></NavLink>
    </nav>
    );
}

export default Navigate;