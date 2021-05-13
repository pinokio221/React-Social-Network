import React from 'react';
import Register from "./Register"
import { userRegister, resetRegError } from '../../redux/auth-reducer'
import connect from "react-redux/lib/connect/connect";
import { compose } from 'redux';
import withRouter from "react-router-dom/withRouter"
import { Redirect } from 'react-router-dom'


class RegisterContainer extends React.Component{
    userRegister = (data) => {
        this.props.userRegister(data);
    }
    resetRegError = () => {
        this.props.resetRegError();
    }
    render() {
        if(this.props.isAuth === true) {
            return <Redirect to={'/profile'}/>
        }
        return (
            <Register 
                {...this.props} 
                regFormInProcess={this.props.regFormInProcess} 
                userRegister={this.userRegister}
                resetRegError={this.resetRegError}
                />
        );
    }
}
let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        qrCode: state.auth.qrCode,
        authStage: state.auth.authStage,
        regError: state.auth.regError,
        regFormInProcess: state.auth.regFormInProcess,
    }
}


export default compose(
    connect(mapStateToProps, { userRegister, resetRegError }),
    withRouter
)(RegisterContainer)
