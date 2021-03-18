import React from 'react';
import Register from "./Register"
import { userRegister } from '../../redux/auth-reducer'
import connect from "react-redux/lib/connect/connect";

class RegisterContainer extends React.Component{
    userRegister = (data) => {
        this.props.userRegister(data);
    }
    render() {
        return (
            <Register {...this.props} regFormInProcess={this.props.regFormInProcess} userRegister={this.userRegister}/>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        regFormInProcess: state.auth.regFormInProcess
    }
}


export default connect(mapStateToProps, {userRegister})(RegisterContainer)