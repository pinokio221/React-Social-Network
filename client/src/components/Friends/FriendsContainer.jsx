import React from 'react';
import styles from './Friends.module.css'
import { withAuthRedirect } from '../../hoc/AuthRedirect';
import Friends from './Friends'
import { compose } from 'redux'
import connect from "react-redux/lib/connect/connect";
import withRouter from "react-router-dom/withRouter"

import { 
    getFriendsPage, 
    resetFriendsPageAction, 
    acceptInvitation,
    rejectInvitation,
    removeFriend
} from '../../redux/friends-reducer'
import Friend from './Friend/Friend'
import Invitation from './Invitation/Invitation'
import CircularProgress from '@material-ui/core/CircularProgress';

class FriendsContainer extends React.Component {
    componentDidMount(){
        this.props.getFriendsPage(this.props.authData.id)
    }
    componentWillUnmount() {
        this.props.resetFriendsPageAction();
    }
    removeFriend = (userId) => {
        this.props.removeFriend(userId);
    }
    acceptRequest = (userId) => {
        this.props.acceptInvitation(userId);
    }
    rejectRequest = (userId) => {
        this.props.rejectInvitation(userId);
    }
    render() {
        let friends = this.props.friendsPage.friends
            .map(f => <Friend 
                fullname={f.fullname}
                key = {f.id}
                id = {f.id}
                age={f.age} city={f.city}
                image={f.profile_image}
                removeFriend={this.removeFriend}
                />)

        let invitations = this.props.friendsPage.invitations
            .map(i => <Invitation
                firstname={i.first_name}
                fullname={i.fullname}
                key = {i.id}
                id = {i.id}
                age={i.age} city={i.city}
                image={i.profile_image}
                friendshipStatus = {i.friendshipStatus}
                acceptRequest={this.acceptRequest}
                rejectRequest={this.rejectRequest}
                />)
            
        return(
            <div>
                {this.props.pageFetching ? 
                    <div className={styles.fetchProgress}><CircularProgress size={80}/></div>
                    :
                    <Friends 
                        {...this.props} 
                        friends={friends} 
                        invitations={invitations} 
                        profilePageId={this.props.match.params.userId}
                        />}
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        authData: state.auth,
        friendsPage: state.friendsPage,
        pageFetching: state.friendsPage.pageFetching
    }
}

export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, { 
        getFriendsPage, 
        resetFriendsPageAction,
        acceptInvitation,
        rejectInvitation,
        removeFriend
     })
)(FriendsContainer)