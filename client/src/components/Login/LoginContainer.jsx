import React from 'react';
import Login from "./Login"
import { userLogin, resetError } from "../../redux/auth-reducer"
import connect from "react-redux/lib/connect/connect";
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/AuthRedirect';

class LoginContainer extends React.Component {
    userLogin = (data) => {
        this.props.userLogin(data)
    }
    resetError = () => {
        this.props.resetError();
    }
    render(){
        return (
            <Login 
                {...this.props} 
                resetError={this.resetError} 
                logFormInProcess={this.props.logFormInProcess} 
                isAuth={this.props.isAuth} 
                userLogin={this.userLogin}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        authError: state.auth.authError,
        logFormInProcess: state.auth.logFormInProcess
    }
}

export default connect(mapStateToProps, {userLogin, resetError})(LoginContainer)

