import React from 'react';
import { //Action Creators
    sentInvitation,
    cancelInvitation, 
    onSearchClick,
    setUsers,
    setCurrentPage,
    showMore,
    toggleIsFetching
} from "../../redux/users-reducer";
import connect from "react-redux/lib/connect/connect";
import User from "./User/User";
import * as axios from "axios";
import Users from './Users';
import { usersAPI } from '../../api/api';


class UsersContainer extends React.Component {
    
    componentDidMount() {
        this.props.toggleIsFetching(false);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);
            console.log(data.items)
            this.props.setUsers(data.items)
        })
        
    }

    onSearchClick = (text) => {
        this.props.toggleIsFetching(true);
        if(text.trim()) {
            usersAPI.getUserByNamePartial(text.toLowerCase()).then(data => {
                this.props.toggleIsFetching(false);
                this.props.onSearchClick(text, data.items, data.usersFound);
            })
        } else {
            this.props.toggleIsFetching(true);
            this.props.onSearchClick(text, [], 0);
            usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                        this.props.toggleIsFetching(false);
                        this.props.setUsers(data.items)
                    })
            
            }
    }
    onPageChanged = (p) => {
        this.props.setCurrentPage(p);
        usersAPI.getUsers(p, this.props.pageSize).then(data => {
            this.props.setUsers(data.items)
        })
    }
    onShowMore = (pagination) => {
        this.props.toggleIsFetching(true);
        pagination+=1;
        usersAPI.getUsers(pagination, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);
            this.props.onShowMore(data.items, pagination);
        })
    }

    sentInvitation = (userId) => {
        let urlRequest = `http://localhost:9000/api/friendship/send/${userId}`
        axios.post(urlRequest,
            { headers: {
            "Content-Type": "application/json",
        },},{ withCredentials: true })
            .then(response => {
                this.props.sentInvitation(userId, response.data.friendshipStatus);
            })
    }
    cancelInvitation = (userId) => {
        let urlRequest = `http://localhost:9000/api/friendship/cancel/${userId}`
        axios.delete(urlRequest,{ withCredentials: true })
            .then(response => {
                this.props.cancelInvitation(userId);
            })
    }

    render() {
        let usersElements = this.props.users
        .map(u => <User
            sentInvitation={this.sentInvitation}
            cancelInvitation={this.cancelInvitation}
            key = {u.id}
            id = {u.id}
            username = {u.fullname}
            age={u.age} city={u.city}
            image={u.profileImage}
            friendshipStatus ={u.friendshipStatus}/>)

    let filteredElements = this.props.filteredUsers
        .map(u => <User
            sentInvitation={this.sentInvitation}
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
    sentInvitation: sentInvitation,
    cancelInvitation: cancelInvitation,
    onSearchClick: onSearchClick,
    setUsers: setUsers,
    onShowMore: showMore,
    setCurrentPage: setCurrentPage,
    toggleIsFetching: toggleIsFetching
})(UsersContainer);
