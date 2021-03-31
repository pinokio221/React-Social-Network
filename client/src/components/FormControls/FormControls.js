import React from 'react'
import styles from './FormControls.module.css'
import ErrorIcon from '@material-ui/icons/Error';

export const LoginInputFormControl = ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.loginFormWrapper + " " + (hasError ? styles.error : "")}>
            <div>
                <input className={styles.loginInputField} {...input} {...props}></input>
            </div>
            { hasError && <span><span className={styles.loginErrorICon}><ErrorIcon/></span>{meta.error}</span> }
        </div>
    )
}