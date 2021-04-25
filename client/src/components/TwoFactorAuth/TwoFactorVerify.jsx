import React from 'react'
import { verifyTwoFactorAuth } from '../../redux/auth-reducer'
import connect from "react-redux/lib/connect/connect";
import { Field, reduxForm } from "redux-form"
import { ReduxTextArea } from '../FormControls/ReduxFormControls'
import Button from '@material-ui/core/Button';
import { required, maxLengthCreator } from "../../validators/validator"
import styles from './TwoFactorVerify.module.css'
import { Fade } from "react-awesome-reveal";

const fieldMaxLength = maxLengthCreator(6);

const AuthCodeForm = (props) => {
    return (
        <div className={styles.page}>
        <Fade direction='left'>
            <form onSubmit={props.handleSubmit}>
                <ul className={styles.wrapper}>
                    <li><h4>Setup Two Factor Authentication</h4></li>
                    <li>
                        <span>For your own safety, we suggest you set up two-factor authentication
                              for your account. It is a very powerful way to defend against an intruder.
                              Using your phone please scan the QR code below using and enter the value.
                              You can always disable this option in the settings.
                        </span>
                    </li>
                    <li className={styles.form_row}>
                        <img src={props.qrCode} alt=""/>
                        </li>
                    <li className={styles.form_row}>
                        <span for="login">Enter code from your app:</span>
                        <div className={styles.codeRow}>
                            <Field validate={[required, fieldMaxLength]} component={'input'} name={'auth_code'} type="text"/>
                            <Button type='submit' className={styles.submitBtn} variant="contained" color="primary">Submit</Button>
                        </div>
                    </li>
                    
                </ul>
            </form>
        </Fade>
    </div>
    );
}

const AuthCodeReduxForm = reduxForm({
    form: 'auth_code'
})(AuthCodeForm);


class TwoFactorVerify extends React.Component {
    componentDidMount() {
    }
    verifyTwoFactorAuth = (formData) => {
        this.props.verifyTwoFactorAuth(this.props.authId, formData.auth_code)
    }
    render() {
        return <div>
            <div><AuthCodeReduxForm onSubmit={this.verifyTwoFactorAuth} qrCode={this.props.qrCode}/></div>
            </div>
    }
}

let mapStateToProps = (state) => {
    return {
        authId: state.auth.auth_id
    }
}

export default connect(mapStateToProps, { verifyTwoFactorAuth })(TwoFactorVerify)

