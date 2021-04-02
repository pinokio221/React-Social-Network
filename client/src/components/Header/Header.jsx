import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import logo_icon from '../../assets/images/logo.png'

const Header = (props) => {
    return (
        <header className = {styles.header}>
            <img src={logo_icon}></img>
        </header>
    );
}

export default Header;