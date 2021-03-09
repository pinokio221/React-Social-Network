import React from 'react'
import Header from './Header'
import { setUserData, authMe, userLogin, userLogout } from '../../redux/auth-reducer'
import connect from "react-redux/lib/connect/connect";


class HeaderContainer extends React.Component {
    componentDidMount() {
        //this.props.userLogin();
        this.props.userLogout();
        this.props.authMe();
    }
    render() {
        return <Header {...this.props} />
    }
}


let mapStateToProps = (state) => {
    return {
        userId: state.auth.id,
        login: state.auth.login,
        email: state.auth.email,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, 
    { setUserData: setUserData, authMe, userLogin, userLogout })(HeaderContainer);
