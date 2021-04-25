import React from 'react';
import Login from "./Login"
import { userLogin, resetAuthError } from "../../redux/auth-reducer"
import connect from "react-redux/lib/connect/connect";


class LoginContainer extends React.Component {
    userLogin = (data) => {
        this.props.userLogin(data)
    }
    resetAuthError = () => {
        this.props.resetAuthError();
    }
    render(){
        return (
            <Login 
                {...this.props}
                resetAuthError={this.resetAuthError} 
                logFormInProcess={this.props.logFormInProcess} 
                isAuth={this.props.isAuth} 
                userLogin={this.userLogin}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        authStage: state.auth.authStage,
        isAuth: state.auth.isAuth,
        authError: state.auth.authError,
        logFormInProcess: state.auth.logFormInProcess,
        qrCode: state.auth.qrCode
    }
}

export default connect(mapStateToProps, {userLogin, resetAuthError})(LoginContainer)

