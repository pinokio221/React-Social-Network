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
    sendInvitation,
    cancelInvitation, 
    acceptInvitation,
    rejectInvitation,
    removeFriend,
    fetchMoreFriends,
    fetchMoreInvitations
} from '../../redux/friends-reducer'
import Friend from './Friend/Friend'
import Invitation from './Invitation/Invitation'
import CircularProgress from '@material-ui/core/CircularProgress';

class FriendsContainer extends React.Component {
    state = {
        friendsPagination: 1,
        invitationsPagination: 1,
        hasMoreFriends: true,
        hasMoreInvitations: true,
        userId: this.props.match.params.userId
    }
    
    componentDidMount(){
        let userId = this.props.match.params.userId;
        if(!this.props.match.params.userId) { 
            userId = this.props.authData.id
         }
        this.props.getFriendsPage(userId, this.props.friendsPagination, this.props.invitationsPagination)
        this.setState({
            userId: userId
        })
        
    }
    componentWillUnmount() {
        this.props.resetFriendsPageAction();
    }
    sendInvitation = (userId) => {
        this.props.sendInvitation(userId);
    }
    cancelInvitation = (userId) => {
        this.props.cancelInvitation(userId);
    }
    acceptRequest = (userId) => {
        this.props.acceptInvitation(userId);
    }
    rejectRequest = (userId) => {
        this.props.rejectInvitation(userId);
    }
    removeFriend = (userId) => {
        this.props.removeFriend(userId);
    }
    fetchMoreFriends = () => {
        if(this.props.friendsPage.friends.length >= this.props.friendsPage.totalFriends) {
            this.setState({ hasMoreFriends: false });
            return;
        }
        setTimeout(() => {
            this.setState({
                friendsPagination: this.state.friendsPagination+=1
            })
            this.props.fetchMoreFriends(this.state.userId, this.state.friendsPagination);
        }, 1000)
    }
    fetchMoreInvitations = () => {
        if(this.props.friendsPage.invitations.length >= this.props.friendsPage.totalInvitations) {
            this.setState({ hasMoreInvitations: false });
            return;
        }
        setTimeout(() => {
            this.setState({
                invitationsPagination: this.state.invitationsPagination+=1
            })
            this.props.fetchMoreInvitations(this.state.invitationsPagination);
        }, 1000)
    }
    render() {
        let friends = this.props.friendsPage.friends
            .map(f => <Friend 
                fullname={f.fullname}
                key = {f.id}
                id = {f.id}
                age={f.age} city={f.city}
                image={f.profile_image}
                friendshipStatus = {f.friendshipStatus}
                sendInvitation={this.sendInvitation}
                cancelInvitation={this.cancelInvitation}
                removeFriend={this.removeFriend}
                profilePageId={this.props.match.params.userId}
                authData={this.props.authData}
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
                        fetchMoreFriends={this.fetchMoreFriends}
                        fetchMoreInvitations={this.fetchMoreInvitations}
                        hasMoreFriends={this.state.hasMoreFriends}
                        hasMoreInvitations={this.state.hasMoreInvitations}
                        />}
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        userInfo: state.friendsPage.userInfo,
        authData: state.auth,
        friendsPage: state.friendsPage,
        pageFetching: state.friendsPage.pageFetching,
        friendsPagination: state.friendsPage.friendsPagination,
        invitationsPagination: state.friendsPage.invitationsPagination
    }
}

export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, { 
        getFriendsPage, 
        resetFriendsPageAction,
        sendInvitation,
        cancelInvitation,
        acceptInvitation,
        rejectInvitation,
        removeFriend,
        fetchMoreFriends,
        fetchMoreInvitations
     })
)(FriendsContainer)