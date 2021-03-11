import React from 'react';
import { Field, reduxForm } from "redux-form"
import styles from './Login.module.css'
import signin_icon from '../../assets/images/signin.png'

const LoginForm = (props) => {
    return (
        <form onSubmit = { props.handleSubmit }>
            <ul className={styles.wrapper}>
                <li className={styles.form_row}
                    ><img src="https://static.chilltime.com/v1/interface/media/chilltime/chilltime_logo_1200x750_default.png" alt=""/>
                    </li>
                    <hr/>
                <li className={styles.form_row}>
                    <label for="login">Login or email:</label><Field component={'input'} name={'login'} type="text"/>
                </li>
                <li className={styles.form_row}>
                    <label for="password">Password:</label><Field component={'input'} name={'password'} type="password"/>
                </li>
                <li className={styles.form_row}>
                    <button>Sign In <img className={styles.signin} width='25px' src={signin_icon} alt=""/></button>
                </li>
                <li className={styles.footer_form_row}>
                    <a href="">Forgot password?</a><span>Need an account? <a href="">Sign up</a></span>
                </li>
            </ul>
        </form>
    );
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.userLogin(formData);
    }
    return (
        <div>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
}


export default Login;