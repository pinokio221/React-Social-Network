import React from 'react'
import Header from './Header'
import * as axios from "axios";
import { setUserData } from '../../redux/auth-reducer'
import connect from "react-redux/lib/connect/connect";

class HeaderContainer extends React.Component {
    componentDidMount() {
        
        // LOGIN REQUEST
        let authRequest = `http://localhost:9000/api/user/login`
        axios.post(authRequest,{ withCredentials: true })
            .then(response => {
                this.props.setUserData(response.data.user.id, response.data.user.name, response.data.user.email, true)
            })

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
    { setUserData: setUserData })(HeaderContainer);
