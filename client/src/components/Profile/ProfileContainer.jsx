import React from 'react';
import Profile from "./Profile"
import connect from "react-redux/lib/connect/connect";
import withRouter from "react-router-dom/withRouter"
import { getProfilePage, updateProfileStatus } from "../../redux/profile-reducer"
import { toggleLogFormInProcess } from "../../redux/auth-reducer"
import { compose } from 'redux';


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) { userId = 9; }
        this.props.getProfilePage(userId);
    }
    
    render() {
        return (
            <div>
                <Profile {...this.props}/>
        </div>
        );
    }
    
}
let mapStateToProps = (state) => {
    return {
        userInfo: state.profilePage.userInfo,
        userFriends: state.profilePage.userFriends,
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText,
        logFormInProcess: state.auth.logFormInProcess
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        toggleLogFormInProcess
    }
}
    

export default compose(
    //withAuthRedirect,
    connect(mapStateToProps, { mapDispatchToProps, updateProfileStatus, getProfilePage }),
    withRouter,
)(ProfileContainer)

