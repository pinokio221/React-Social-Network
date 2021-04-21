import React from 'react'
import { Redirect } from 'react-router-dom'
import connect from "react-redux/lib/connect/connect";
import TwoFactorAuth from '../components/TwoFactorAuth/TwoFactorAuth'

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
});

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if(this.props.isAuth === false){
                return <Redirect to={'/login'}/>
            }
            return <Component {...this.props}/>
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent;
}