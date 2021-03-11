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
            <Login {...this.props} userLogin={this.userLogin}/>
        )
    }
}

export default connect(null, {userLogin})(LoginContainer)
/*export default compose(
    withAuthRedirect,
    connect(null, {userLogin}),

)(LoginContainer);*/
