import React from 'react'
import { validateTwoFactorAuth } from '../../redux/auth-reducer'
import connect from "react-redux/lib/connect/connect";
import { Field, reduxForm } from "redux-form"
import Button from '@material-ui/core/Button';
import styles from './TwoFactorValidation.module.css'
import { Fade } from "react-awesome-reveal";
import tfa_image from '../../assets/images/tfa_auth.jpg'
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const validate = values => {
    const errors = {}
    const requiredFields = [
      'auth_validate_code'
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })
    if (values.auth_validate_code && values.auth_validate_code.length < 6) {
      errors.auth_validate_code = 'The length of the code cannot be less than 6'
    }
    return errors
  }

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
                    <li><img className={styles.tfa_image} src={tfa_image}/></li>
                    <center><li><h4>Two Factor Authentication</h4></li></center>
                    <li>
                        <p>This account is protected by two-factor authentication. 
                            Please open the Google Authentication app and enter the code in the field below.
                        </p>
                    </li>
                    <li className={styles.form_row}>
                        <div className={styles.codeRow}>
                            <Field placeholder='ENTER 6 DIGIT CODE' component={RenderTextField} name={'auth_validate_code'} type="text"/>
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
    form: 'auth_validate_code',
    validate
})(AuthCodeForm);


class TwoFactorValidation extends React.Component {
    componentDidMount() {
    }
    validateTwoFactorAuth = (formData) => {
        this.props.validateTwoFactorAuth(this.props.authId, formData.auth_validate_code)
    }
    render() {
        return <div>
            <div><AuthCodeReduxForm logFormInProcess={this.props.logFormInProcess} onSubmit={this.validateTwoFactorAuth}/></div>
            </div>
    }
}

let mapStateToProps = (state) => {
    return {
        authId: state.auth.auth_id,
        logFormInProcess: state.auth.logFormInProcess
    }
}

export default connect(mapStateToProps, { validateTwoFactorAuth })(TwoFactorValidation)

