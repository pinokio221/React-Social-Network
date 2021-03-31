import React from 'react';
import Profile from "./Profile"
import styles from './Profile.module.css'
import connect from "react-redux/lib/connect/connect";
import withRouter from "react-router-dom/withRouter"
import { getProfilePage, resetProfilePageAction, updateProfileStatus } from "../../redux/profile-reducer"
import { toggleLogFormInProcess } from "../../redux/auth-reducer"
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/AuthRedirect';
import CircularProgress from '@material-ui/core/CircularProgress';



class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) { 
            userId = this.props.auth.id
         }
        this.props.getProfilePage(userId);
    }
    componentWillUnmount() {
        this.props.resetProfilePageAction();
    }
    render() {
        return (
            <div>
                { this.props.pageFetching ? <div className={styles.pageProgress}><CircularProgress size={80}/></div> : <Profile {...this.props}/>}

        </div>
        );
    }
    
}
let mapStateToProps = (state) => {
    return {
        userInfo: state.profilePage.userInfo,
        auth: state.auth,
        pageFetching: state.profilePage.pageFetching,
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
    connect(mapStateToProps, { 
        mapDispatchToProps, 
        updateProfileStatus, 
        getProfilePage, 
        resetProfilePageAction }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
