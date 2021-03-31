import React, { useState } from 'react';
import { Field, reduxForm } from "redux-form"
import styles from './Login.module.css'
import signin_icon from '../../assets/images/signin.png'
import { Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import {NavLink} from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { required } from '../../validators/validator'
import { LoginInputFormControl } from '../FormControls/FormControls'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const LoginForm = (props) => {
    return (
        <div className={styles.page}>
        <Fade direction='left'>
            <form onSubmit = { props.handleSubmit }>
                <ul className={styles.wrapper}>
                    <li className={styles.form_row}
                        ><img src="https://static.chilltime.com/v1/interface/media/chilltime/chilltime_logo_1200x750_default.png" alt=""/>
                        </li>
                        <hr/>
                    <li className={styles.form_row}>
                        <label for="login">Login or email:</label><Field validate={[required]} component={LoginInputFormControl} name={'login'} type="text"/>
                    </li>
                    <li className={styles.form_row}>
                        <label for="password">Password:</label><Field validate={[required]} component={LoginInputFormControl} name={'password'} type="password"/>
                    </li>
                    <li className={styles.form_row}>
                        {props.logFormInProcess ? <CircularProgress className={styles.process}/> : 
                            <button>Sign In <img className={styles.signin} width='25px' src={signin_icon} alt=""/></button>
                        }
                    </li>
                    <li className={styles.footer_form_row}>
                        <a href="">Forgot password?</a><span>Need an account? <NavLink to="/signup">Sign up</NavLink></span>
                    </li>
                </ul>
            </form>
        </Fade>
    </div>
    );
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

const Login = (props) => {

    let state = {
        visible: true,
        vertical: 'top',
        horizontal: 'center'
    }

    const { vertical, horizontal} = state;
    const onSubmit = (formData) => {
        props.userLogin(formData);
    }
    const autoClose = () => {
        props.resetError()
    }
    if(props.isAuth){
        return <Redirect to={"/profile"}/>
    }
    
    return (
        <div>
            { props.authError ? 
            <Snackbar
                open={state.visible}
                onClose={autoClose}
                autoHideDuration={6000}
                anchorOrigin={{ vertical, horizontal }}
                key={vertical + horizontal}>
                    <Alert severity="error">
                        {props.authError}
                    </Alert>
            </Snackbar> : null }
            <div><LoginReduxForm onSubmit={onSubmit} logFormInProcess={props.logFormInProcess}/></div>
        </div>
    );
}


export default Login;