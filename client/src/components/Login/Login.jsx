import React, { useState } from 'react';
import { Field, reduxForm } from "redux-form"
import styles from './Login.module.css'
import signin_icon from '../../assets/images/signin.png'
import logo_icon from '../../assets/images/logo.png'
import { Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import {NavLink} from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { required } from '../../validators/validator'
import { LoginInputFormControl } from '../FormControls/FormControls'
import TwoFactorVerify from '../TwoFactorAuth/TwoFactorVerify'
import TwoFactorAuth from '../TwoFactorAuth/TwoFactorAuth';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const LoginForm = (props) => {
    return (
        <div className={styles.page}>
        <Fade direction='left'>
            <form onSubmit = { props.handleSubmit }>
                <ul className={styles.wrapper}>
                    <li className={styles.form_row}>
                        <img src={logo_icon} alt=""/>
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
    }

    const onSubmit = (formData) => {
        props.userLogin(formData);
    }
    const autoClose = () => {
        props.resetAuthError()
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
                anchorOrigin={{ horizontal: 'top', vertical: 'center' }}>
                    <Alert severity="error">
                        {props.authError}
                    </Alert>
            </Snackbar> : null }
            {
              props.authStage === 1 ? 
              <div><LoginReduxForm onSubmit={onSubmit} logFormInProcess={props.logFormInProcess}/></div>
               : null ||
              props.authStage === 2 ? 
                <TwoFactorAuth /> : null ||
              props.authStage === 3 ? 
                <TwoFactorVerify store={props.store} qrCode={props.qrCode}/> : null
            }
        </div>
    );
}


export default Login;