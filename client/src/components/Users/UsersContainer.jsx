import React from 'react';
import {
    addFriendActionCreator,
    cancelInvitationActionCreator, 
    onSearchClickActionCreator,
    setUsersActionCreator,
    setCurrentPageActionCreator,
    showMoreActionCreator,
    toggleIsFetchingActionCreator
} from "../../redux/users-reducer";
import connect from "react-redux/lib/connect/connect";
import User from "./User/User";
import * as axios from "axios";
import Users from './Users';


class UsersContainer extends React.Component {
    componentDidMount() {
    this.props.toggleIsFetching(true);
     let requestURL = `http://localhost:9000/users?page=${this.props.currentPage}&limit=${this.props.pageSize}`;

        if(this.props.users.length === 0) {
            axios.get(requestURL)
                .then(response => {
                    this.props.toggleIsFetching(false);
                    this.props.setUsers(response.data.items)
                })
        }
    }

    onSearchClick = (text) => {
        this.props.toggleIsFetching(true);
        if(text.trim()) {
        let requestURL = `http://localhost:9000/users?fullname=${text.toLowerCase()}`;
        axios.get(requestURL)
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.onSearchClick(text, response.data.items, response.data.usersFound);
            })
        } else {
            this.props.toggleIsFetching(false);
            this.props.onSearchClick(text, [], 0);
        }
    }
    onPageChanged = (p) => {
        this.props.setCurrentPage(p);
        let requestURL = `http://localhost:9000/users?page=${p}&limit=${this.props.pageSize}`;
            axios.get(requestURL)
                .then(response => {
                    this.props.setUsers(response.data.items)
                })
    }

    onShowMore = (pagination) => {
        this.props.toggleIsFetching(true);
        pagination+=1;
        let requestURL = `http://localhost:9000/users?page=${pagination}&limit=${this.props.pageSize}`;
            axios.get(requestURL)
                .then(response => {
                    this.props.toggleIsFetching(false);
                    this.props.onShowMore(response.data.items, pagination);
                })
    }

    render() {
        let usersElements = this.props.users
        .map(u => <User
            onAddFriend={this.props.onAddFriend}
            cancelInvitation={this.props.cancelInvitation}
            key = {u.id}
            id = {u.id}
            username = {u.fullname}
            age={u.age} city={u.city}
            image={u.profileImage}
            isFriend={u.isFriend}
            friendInventation={u.friendInventation}/>)

    let filteredElements = this.props.filteredUsers
        .map(u => <User
            onAddFriend={this.props.onAddFriend}
            cancelInvitation={this.props.cancelInvitation}
            key = {u.id}
            id = {u.id}
            username = {u.fullname}
            age={u.age} city={u.city}
            image={u.profileImage}
            isFriend={u.isFriend}
            friendInventation={u.friendInventation}/>)
    
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

let mapDispatchToProps = (dispatch) => {
    return {
        onAddFriend: (userId) => {
            let action = addFriendActionCreator(userId);
            dispatch(action);
        },
        cancelInvitation: (userId) => {
            let action = cancelInvitationActionCreator(userId);
            dispatch(action);
        },
        onSearchClick: (text, users, usersFound) => {
            let action = onSearchClickActionCreator(text, users, usersFound)
            dispatch(action);
        },
        setUsers: (users) => {
            let action = setUsersActionCreator(users);
            dispatch(action);
        },
        onShowMore: (users, pagination) => {
            let action = showMoreActionCreator(users, pagination);
            dispatch(action);
        },
        setCurrentPage: (p) => {
            let action = setCurrentPageActionCreator(p);
            dispatch(action);
        },
        toggleIsFetching: (isFetching) => {
            let action = toggleIsFetchingActionCreator(isFetching);
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
