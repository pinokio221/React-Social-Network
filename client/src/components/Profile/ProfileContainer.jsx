import axios from 'axios';
import React from 'react';
import Profile from "./Profile"
import { setProfilePage, setProfilePosts } from "../../redux/profile-reducer"
import connect from "react-redux/lib/connect/connect";
import withRouter from "react-router-dom/withRouter"


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = 1;
        }
        const setProfilePage = () => {
            let requestURL = `http://localhost:9000/api/users?userId=${userId}`
            axios.get(requestURL)
                .then(response => {
                    this.props.setProfilePage(response.data)
                })
        }

        const setProfilePosts = () => {
            let requestURL = `http://localhost:9000/api/posts?userId=${userId}&limit=5`
            axios.get(requestURL)
                .then(response => {
                    this.props.setProfilePosts(response.data.posts)
                })
        }

        setProfilePage();
        setProfilePosts();
        
    }
    render() {
        return (
            <div>
                <Profile {...this.props}/>
        </div>
        );
    }
    
}

let mapStateToProps = (state) => {
    return {
        userInfo: state.profilePage.userInfo,
        userFriends: state.profilePage.userFriends,
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}

let urlDataComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, 
    {setProfilePage: setProfilePage, 
    setProfilePosts: setProfilePosts})(urlDataComponent);

