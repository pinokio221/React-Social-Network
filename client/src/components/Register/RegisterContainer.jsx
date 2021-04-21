import React from 'react';
import Register from "./Register"
import { userRegister, resetRegError } from '../../redux/auth-reducer'
import connect from "react-redux/lib/connect/connect";
import Cookies from 'js-cookie';

class RegisterContainer extends React.Component{
    componentDidMount(){
        let testcook = Cookies.get('auth_id')
        console.log(testcook);
    }
    userRegister = (data) => {
        this.props.userRegister(data);
    }
    resetRegError = () => {
        this.props.resetRegError();
    }
    render() {
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
        regError: state.auth.regError,
        regFormInProcess: state.auth.regFormInProcess,
        registerStage: state.auth.registerStage,
        qrCode: state.auth.qrCode
    }
}


export default connect(mapStateToProps, { userRegister, resetRegError })(RegisterContainer)