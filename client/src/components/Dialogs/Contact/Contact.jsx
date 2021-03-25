import React from 'react'
import styles from './Contact.module.css'
import { NavLink } from 'react-router-dom'

const Contact = (props) => {
    return (
        <div>
            <div className={styles.dialog + ' ' + styles.active}>
                <NavLink to={'/dialogs/' + props.receiveId }>
                    <div className={styles.contact_wrapper}>
                        <img className={styles.profile_image} src={props.profile_image} alt=""/>
                        <div className={styles.profile_info}>
                        <span className={styles.profile_name}>{props.fullname}</span>
                    </div>
                    </div></NavLink>
            </div>
        </div>
    )
}

export default Contact;