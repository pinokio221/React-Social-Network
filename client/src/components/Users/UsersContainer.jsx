import React from 'react';
import { //Action Creators
    getUsersThunkCreator,
    getUsersBySearchQueryThunkCreator,
    getMoreUsersThunkCreator,
    sendInvitationThunkCreator,
    cancelInvitationThunkCreator
} from "../../redux/users-reducer";
import connect from "react-redux/lib/connect/connect";
import User from "./User/User";
import Users from './Users';


class UsersContainer extends React.Component {
    
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize); // redux-thunk
    }

    onSearchClick = (query) => {
        this.props.getUsersBySearchQuery(query, this.props.currentPage, this.props.pageSize);
    }
    onPageChanged = (p) => {
        this.props.setCurrentPage(p);
        this.props.getUsers(p, this.props.pageSize); // redux-thunk

    }
    onShowMore = (pagination) => {
        pagination+=1;
        this.props.getMoreUsers(pagination, this.props.pageSize)
    }
    sendInvitation = (userId) => {
        this.props.sendInvitation(userId);
    }
    cancelInvitation = (userId) => {
        this.props.cancelInvitation(userId);
    }

    render() {
        let usersElements = this.props.users
        .map(u => <User
            sendInvitation={this.sendInvitation}
            cancelInvitation={this.cancelInvitation}
            key = {u.id}
            id = {u.id}
            username = {u.fullname}
            age={u.age} city={u.city}
            image={u.profileImage}
            friendshipStatus ={u.friendshipStatus}/>)

    let filteredElements = this.props.filteredUsers
        .map(u => <User
            sendInvitation={this.sendInvitation}
            cancelInvitation={this.cancelInvitation}
            key = {u.id}
            id = {u.id}
            username = {u.fullname}
            age={u.age} city={u.city}
            image={u.profileImage}
            friendshipStatus ={u.friendshipStatus}/>)
    
        return <>
        <Users 
            onShowMore={this.onShowMore}
            onPageChanged={this.onPageChanged}
            onSearchClick={this.onSearchClick}
            filteredElements={filteredElements}
            usersElements={usersElements}
            isFetching={this.props.isFetching}
            filteredUsers={this.props.filteredUsers}
            currentPage={this.props.currentPage}
            pageSize = {this.props.pageSize}
            showMorePagination={this.props.showMorePagination}
            searchInput={this.props.searchInput}
            filter={this.props.filter}
            filteredUsersCount={this.props.filteredUsersCount}
        />
        </>

    }

}


let mapStateToProps = (state) => {
    return {
        profileInfo: state.auth,
        users: state.usersPage.users,
        filteredUsers: state.usersPage.filteredUsers,
        filter: state.usersPage.filter,
        searchInput: state.usersPage.searchInput,
        pageSize: state.usersPage.pageSize,
        isFetching: state.usersPage.isFetching,
        totalUsersCount: state.usersPage.totalUsersCount,
        filteredUsersCount: state.usersPage.filteredUsersCount,
        currentPage: state.usersPage.currentPage,
        showMorePagination: state.usersPage.showMorePagination
    }
}



export default connect(mapStateToProps, {
    getUsers: getUsersThunkCreator,
    getUsersBySearchQuery: getUsersBySearchQueryThunkCreator,
    getMoreUsers: getMoreUsersThunkCreator,
    sendInvitation: sendInvitationThunkCreator,
    cancelInvitation: cancelInvitationThunkCreator
})(UsersContainer);
