import React from 'react'
import Settings from './Settings'
import connect from "react-redux/lib/connect/connect";
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/AuthRedirect'
import withRouter from "react-router-dom/withRouter"
import { userLogout } from '../../redux/auth-reducer'

class SettingsContainer extends React.Component {
    signOut = () => {
        this.props.userLogout()
    }
    render() {
        return(
            <Settings {...this.props} userLogout={this.props.userLogout}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        authData: state.auth
    }
}

export default compose(
    connect(mapStateToProps,{ userLogout }),
    withAuthRedirect,
    withRouter
)(SettingsContainer)