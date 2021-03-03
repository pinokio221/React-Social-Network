import React from 'react'
import Header from './Header'
import * as axios from "axios";
import { setUserData } from '../../redux/auth-reducer'
import connect from "react-redux/lib/connect/connect";

class HeaderContainer extends React.Component {
    componentDidMount() {
        // LOGIN REQUEST
        let loginRequest = `http://localhost:9000/api/user/login`
        axios.post(loginRequest,{
            login: "pinokio98",
            password: "1234567"
        },{ withCredentials: true })
            .then(response => {
                console.log(response)
            })
        let authRequest = `http://localhost:9000/api/user/me`
        axios.get(authRequest,{ withCredentials: true })
            .then(response => {
                if(response.status === 200){
                    let {id, login, email} = response.data.user;
                    this.props.setUserData(id, login, email, true)
                }
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
