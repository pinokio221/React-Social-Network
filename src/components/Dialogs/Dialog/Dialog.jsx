import React from 'react'
import styles from './Dialog.module.css'
import { NavLink } from 'react-router-dom'

const Dialog = (props) => {
    return (
        <div>
            <div className={styles.dialog + ' ' + styles.active}>
                <NavLink to={'/dialogs/' + props.dialogid }>{props.name}</NavLink>
            </div>
        </div>
    )
}

export default Dialog;