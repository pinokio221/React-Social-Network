import React from 'react';
import styles from './Login.module.css'
import signin_icon from '../../assets/images/signin.png'

const Login = (props) => {
    return (
        <div>
        <form>
            <ul className={styles.wrapper}>
                <li className={styles.form_row}
                    ><img src="https://static.chilltime.com/v1/interface/media/chilltime/chilltime_logo_1200x750_default.png" alt=""/>
                    </li>
                    <hr/>
                <li className={styles.form_row}>
                    <label for="login">Login or email:</label><input type="text"></input>
                </li>
                <li className={styles.form_row}>
                    <label for="password">Password:</label><input type="password"></input>
                </li>
                <li className={styles.form_row}>
                    <button>Sign In <img className={styles.signin} width='25px' src={signin_icon} alt=""/></button>
                </li>
                <li className={styles.footer_form_row}>
                    <a href="">Forgot password?</a><span>Need an account? <a href="">Sign up</a></span>
                </li>
            </ul>
        </form>
    </div>
       
    );
}

export default Login;