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


class UsersContainer extends React.Component {
    
    componentDidMount() {
        
     let requestURL = `http://localhost:9000/api/users?page=${this.props.currentPage}&limit=${this.props.pageSize}`;

        if(this.props.users.length === 0) {
            this.props.toggleIsFetching(true);
            axios.get(requestURL, { withCredentials: true })
                .then(response => {
                    this.props.toggleIsFetching(false);
                    this.props.setUsers(response.data.items)
                })
        }
    }

    onSearchClick = (text) => {
        this.props.toggleIsFetching(true);
        if(text.trim()) {
        let requestURL = `http://localhost:9000/api/users?fullname=${text.toLowerCase()}`;
        axios.get(requestURL, { withCredentials: true })
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.onSearchClick(text, response.data.items, response.data.usersFound);
            })
        } else {
            this.props.toggleIsFetching(true);
            this.props.onSearchClick(text, [], 0);
            let requestURL = `http://localhost:9000/api/users?page=${this.props.currentPage}&limit=${this.props.pageSize}`;
                axios.get(requestURL, { withCredentials: true })
                    .then(response => {
                        this.props.toggleIsFetching(false);
                        this.props.setUsers(response.data.items)
                    })
            
            }
    }
    onPageChanged = (p) => {
        this.props.setCurrentPage(p);
        let requestURL = `http://localhost:9000/api/users?page=${p}&limit=${this.props.pageSize}`;
            axios.get(requestURL, { withCredentials: true })
                .then(response => {
                    this.props.setUsers(response.data.items)
                })
    }

    onShowMore = (pagination) => {
        this.props.toggleIsFetching(true);
        pagination+=1;
        let requestURL = `http://localhost:9000/api/users?page=${pagination}&limit=${this.props.pageSize}`;
            axios.get(requestURL,{ withCredentials: true })
                .then(response => {
                    this.props.toggleIsFetching(false);
                    this.props.onShowMore(response.data.items, pagination);
                })
    }

    sentInvitation = (userId) => {
        
        let urlRequest = `http://localhost:9000/api/friendship/sent/${userId}`
        axios.post(urlRequest,
            { headers: {
            "Content-Type": "application/json",
        },},{ withCredentials: true })
            .then(response => {
                this.props.sentInvitation(userId);
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
            isFriend={u.isFriend}
            friendInventation={u.friendInventation}/>)

    let filteredElements = this.props.filteredUsers
        .map(u => <User
            sentInvitation={this.sentInvitation}
            cancelInvitation={this.cancelInvitation}
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
