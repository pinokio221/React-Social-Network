import React from 'react';
import Login from "./Login"
import { userLogin } from "../../redux/auth-reducer"
import connect from "react-redux/lib/connect/connect";
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/AuthRedirect';

class LoginContainer extends React.Component {
    userLogin = (data) => {
        this.props.userLogin(data);
    }
    render(){
        return (
            <Login {...this.props} logFormInProcess={this.props.logFormInProcess} isAuth={this.props.isAuth} userLogin={this.userLogin}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        logFormInProcess: state.auth.logFormInProcess
    }
}

export default connect(mapStateToProps, {userLogin})(LoginContainer)

