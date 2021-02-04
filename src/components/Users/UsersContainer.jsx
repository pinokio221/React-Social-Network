import React from 'react';
import {addFriendActionCreator} from "../../redux/users-reducer";
import Users from "./Users";
import connect from "react-redux/lib/connect/connect";

let mapStateToProps = (state) => {
    return {
        usersPage: state.usersPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onAddFriend: (userId) => {
            let action = addFriendActionCreator(userId);
            dispatch(action);
        }

    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;