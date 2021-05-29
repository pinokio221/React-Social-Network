import React from 'react'
import Settings from './Settings'
import connect from "react-redux/lib/connect/connect";
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/AuthRedirect'
import withRouter from "react-router-dom/withRouter"
import { userLogout, updateSettings } from '../../redux/auth-reducer'

class SettingsContainer extends React.Component {
    signOut = () => {
        this.props.userLogout()
    }
    updateSettings = (settings) => {
        this.props.updateSettings(settings);
    }
    render() {
        return(
            <Settings {...this.props} userLogout={this.props.userLogout}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        authData: state.auth,
        settings: state.auth.settings
    }
}

export default compose(
    connect(mapStateToProps,{ userLogout, updateSettings }),
    withAuthRedirect,
    withRouter
)(SettingsContainer)