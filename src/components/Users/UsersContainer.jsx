import React from 'react';
import {
    addFriendActionCreator,
    cancelInvitationActionCreator, onSearchClickActionCreator,
    onSearchInputChangeActionCreator, setUsersActionCreator
} from "../../redux/users-reducer";
import Users from "./Users";
import connect from "react-redux/lib/connect/connect";

let mapStateToProps = (state) => {
    return {
        usersPage: state.usersPage,
        searchInput: state.usersPage.searchInput,
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
        onSearchInputChange: (text) => {
            let action = onSearchInputChangeActionCreator(text)
            dispatch(action);
        },
        onSearchClick: (text) => {
            let action = onSearchClickActionCreator(text)
            dispatch(action);
        },
        setUsers: (users) => {
            let action = setUsersActionCreator(users);
            dispatch(action);
        }

    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;