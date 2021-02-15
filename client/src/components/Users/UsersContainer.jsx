import React from 'react';
import {
    addFriendActionCreator,
    cancelInvitationActionCreator, 
    onSearchClickActionCreator,
    setUsersActionCreator,
    setCurrentPageActionCreator,
    showMoreActionCreator
} from "../../redux/users-reducer";
import Users from "./Users";
import connect from "react-redux/lib/connect/connect";

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        filteredUsers: state.usersPage.filteredUsers,
        filter: state.usersPage.filter,
        searchInput: state.usersPage.searchInput,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
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
        onSearchClick: (text, users) => {
            let action = onSearchClickActionCreator(text, users)
            dispatch(action);
        },
        setUsers: (users) => {
            let action = setUsersActionCreator(users);
            dispatch(action);
        },
        onShowMore: (users) => {
            let action = showMoreActionCreator(users);
            dispatch(action)
        },
        setCurrentPage: (p) => {
            let action = setCurrentPageActionCreator(p);
            dispatch(action);
        }

    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;