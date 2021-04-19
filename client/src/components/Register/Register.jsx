import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import styles from "./Register.module.css"
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { validate, asyncValidate } from '../../validators/RegisterFormValidator'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment'
import { Fade } from "react-awesome-reveal";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const RenderTextField = ({label, input, meta: { touched, invalid, error }, ...custom}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

const RenderPasswordField = ({label, input, meta: {touched, invalid, error}, ...custom }) => (
    <TextField
        id="standard-password-input"
        label={label}
        type="password"
        autoComplete="off"
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
      />
);
  

const RenderRadioButton = ({ input, ...rest },) => (
  <FormControl>
          <FormLabel component="legend">Gender</FormLabel>
    <RadioGroup {...input} {...rest}>
      <FormControlLabel value="1" control={<Radio required={true} color="primary" />} label="Male" />
      <FormControlLabel value="2" control={<Radio color="primary" />} label="Female" />
    </RadioGroup>
  </FormControl>
)

const RenderDatePicker = ({ input: { onChange, value }, meta: {touched, invalid, error} }) => {
  let date = new Date();
  let dateFormat = moment(date).format('YYYY-MM-DD');
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        onChange={onChange}
        error={touched && invalid}
        helperText={touched && error}
        disableFuture
        openTo="year"
        format="dd-MM-yyyy"
        value={!value ? dateFormat : new Date(value)}
        label='Date of birth'
        views={["year", "month", "date"]}/>
    </MuiPickersUtilsProvider>
  )
}

const useStyles = makeStyles((theme) => ({
  inline_field: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },

  },
}));

const RegisterForm = (props) => {
  const classes = useStyles();
  const { handleSubmit, pristine, reset, submitting} = props
  return (
      <div className={styles.page}>
        <Fade direction='right'>
      <form className={styles.wrapper} onSubmit = { handleSubmit }>
        <div className={styles.form}>
        <div className={styles.logo}>
          <img src="https://static.chilltime.com/v1/interface/media/chilltime/chilltime_logo_1200x750_default.png" alt=""/>
        </div>
          <h5>Sign Up</h5>
        <div className={classes.inline_field}>
          <Field name="firstname" component={RenderTextField} label="First Name"/>
          <Field name="lastname" component={RenderTextField} label="Last Name" />
        
          <Field name="email" component={RenderTextField} label="Email" />
          <Field name="login" component={RenderTextField} label="Login" />
        </div>
        <br/>
        <div className={styles.middle}>
          <Field name="gender" component={RenderRadioButton}>
            <Radio value="1" label="male" />
            <Radio value="2" label="female" />
          </Field>
        <br/><br/>
        <div>
          <Field name='birthday' component={RenderDatePicker} label='Birthday'/>
        </div>
        </div>
        <div/>
        <br/>
        <div className={classes.inline_field}>
          <Field name='password' component={RenderPasswordField} label='Password'/>
          <Field name='repeat_password' component={RenderPasswordField} label='Repeat password' />
        </div>
        <div className={styles.signup_btn}>
          {props.regFormInProcess ? <CircularProgress /> : 
          <Button disabled={pristine || submitting} type='submit' variant="contained" size="large" color="primary" >
          Sign UP
          </Button>
          }
          
        </div>
      </div>
    </form></Fade>
  </div>

  )
}

const ReduxRegisterForm = reduxForm({
    form: "signup",
    validate,
    asyncValidate
})(RegisterForm);

class Register extends React.Component {
  componentDidMount() {
    if(this.props.isAuth){
      return <Redirect to={"/profile"}/>
    }
  }
  state = {
      visible: true,
  }
  autoClose = () => {
      this.props.resetRegError()
  }
  generateForm = (formData) => {
    let format_birthday = moment(formData.birthday).format('YYYY-MM-DD');

    const getUserAge = (birthday) => {
      let userBirthdayDate = new Date(birthday);
      let ageDifMs = Date.now() - userBirthdayDate.getTime();
      let ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    let finalForm = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      fullname: formData.firstname + " " + formData.lastname,
      email: formData.email,
      login: formData.login.toLowerCase(),
      gender: formData.gender,
      birthday: format_birthday,
      age: getUserAge(format_birthday),
      password: formData.password
    }
      return finalForm;
  }
  signUp = (formData) => {
    this.props.userRegister(this.generateForm(formData));
  }
  render() {
    
    return (
      <div>
          { this.props.regError ? 
            <Snackbar
                open={this.state.visible}
                onClose={this.autoClose}
                autoHideDuration={6000}
                anchorOrigin={{ horizontal: 'top', vertical: 'center' } }>
                    <Alert severity="error">
                        {this.props.regError}
                    </Alert>
            </Snackbar> : null }
            <div><ReduxRegisterForm onSubmit={this.signUp} regFormInProcess={this.props.regFormInProcess}/></div>
      </div>
    );
  }
}

export default Register;