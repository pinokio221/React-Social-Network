export const validate = values => {
    const errors = {}
    const requiredFields = [
      'firstname',
      'lastname',
      'email',
      'login',
      'gender',
      'birthday',
      'password',
      'repeat_password'
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })
    if(values.firstname && (values.firstname.length < 2 || values.firstname.length > 12)) {
      errors.firstname = 'The first name cannot be less than 3 or more than 12 characters'
    }

    if(values.firstname && !/^[a-z]+$/i.test(values.firstname)){
      errors.firstname = 'The first name cannot contain numbers and forbidden characters'
    }
    if(values.lastname && !/^[a-z]+$/i.test(values.lastname)){
      errors.lastname = 'The last name cannot contain numbers and forbidden characters'
    }
    if(values.lastname && (values.lastname.length < 2 || values.lastname.length > 12)) {
      errors.lastname = 'The last name cannot be less than 3 or more than 12 characters'
    }
    if(values.login && (values.login.length < 2 || values.login.length > 20)) {
      errors.login = 'The login name cannot be less than 3 or more than 20 characters'
    }
    if(values.login && !/^[a-zA-z]{1}[a-zA-Z1-9]{3,20}$/.test(values.login)){
      errors.login = 'Prohibited characters used in the login'
    }
    if(values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    if(values.password && values.password.length < 8){
      errors.password = "Password length cannot be less than 8 characters"
    }
    if(values.repeat_password && values.repeat_password !== values.password) {
      errors.repeat_password = "Password mismatch"
    }
    return errors
  }

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(() => {
    // simulate server latency
    if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
      // eslint-disable-next-line no-throw-literal
      throw { email: 'Email already Exists' }
    }
  })
}
