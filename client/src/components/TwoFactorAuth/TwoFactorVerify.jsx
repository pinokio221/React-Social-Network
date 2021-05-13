import React from 'react'
import { verifyTwoFactorAuth } from '../../redux/auth-reducer'
import connect from "react-redux/lib/connect/connect";
import { Field, reduxForm } from "redux-form"
import Button from '@material-ui/core/Button';
import styles from './TwoFactorVerify.module.css'
import { Fade } from "react-awesome-reveal";
import { MdPhonelinkSetup } from 'react-icons/md'
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const RenderTextField = ({
    label, input, meta: { touched, invalid, error }, ...custom
}) => (
    <TextField
          label={label}
          placeholder={label}
          error={touched && invalid}
          helperText={touched && error}
          id="outlined-full-width"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          {...input}
          {...custom}
    />
)

const AuthCodeForm = (props) => {
    return (
        <div className={styles.page}>
        <Fade direction='left'>
            <form onSubmit={props.handleSubmit}>
                <ul className={styles.wrapper}>
                    <center>
                        <li>
                            <h4><MdPhonelinkSetup className={styles.phone_icon}/>Setup Two Factor Authentication</h4>
                        </li>
                    </center>
                    <li className={styles.content}>
                        <span>For your own safety, we suggest you set up two-factor authentication
                              for your account. It is a very powerful way to defend against an intruder.
                              Using your phone please scan the QR code below using and enter the value.
                              You can always disable this option in the settings.
                        </span>
                    </li>
                    <li className={styles.form_row}>
                        <img src={props.qrCode} alt=""/>
                    </li>
                    <hr/>
                    <li className={styles.form_row}>
                        <div className={styles.codeRow}>
                            <Field placeholder='ENTER 6 DIGIT CODE'component={RenderTextField} name={'auth_verify_code'} type="text"/>
                            { props.logFormInProcess ?
                                <CircularProgress className={styles.login_progress}/>
                            :
                            <div className={styles.submitBtn}><Button size='large' type='submit' variant="contained" color="primary">Submit code</Button></div>
                            }
                        </div>
                    </li>
                    
                </ul>
            </form>
        </Fade>
    </div>
    );
}

const AuthCodeReduxForm = reduxForm({
    form: 'auth_verify_code'
})(AuthCodeForm);


class TwoFactorVerify extends React.Component {
    componentDidMount() {
    }
    verifyTwoFactorAuth = (formData) => {
        this.props.verifyTwoFactorAuth(this.props.authId, formData.auth_verify_code)
    }
    render() {
        return <div>
            <div><AuthCodeReduxForm 
                onSubmit={this.verifyTwoFactorAuth} 
                qrCode={this.props.qrCode}
                logFormInProcess={this.props.logFormInProcess}
                />
                </div>
            </div>
    }
}

let mapStateToProps = (state) => {
    return {
        authId: state.auth.auth_id,
        logFormInProcess: state.auth.logFormInProcess
    }
}

export default connect(mapStateToProps, { verifyTwoFactorAuth })(TwoFactorVerify)

