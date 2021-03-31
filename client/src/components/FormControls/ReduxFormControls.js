import React from "react";
import styles from './ReduxFormControls.module.css'
import ErrorIcon from '@material-ui/icons/Error';
import { Form } from 'react-bootstrap'

const ReduxFormControl = ({input, meta, child, ...props}) => {
    let hasError = meta.touched && meta.error;
    return <div className={styles.postForm + " " + (hasError ? styles.error : "")}>
            <div> {props.children} </div>
            { hasError && <span><ErrorIcon/> { meta.error }</span> }
        </div>  
};

export const ReduxTextArea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <ReduxFormControl {...props}><Form.Control as={'textarea'} {...restProps} {...input} /></ReduxFormControl>
}