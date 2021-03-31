import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = (props) => {
    return (
        <header className = {styles.header}>
            <img src='https://www.freeiconspng.com/uploads/facebook-simple-text-22.png'></img>
        </header>
    );
}

export default Header;