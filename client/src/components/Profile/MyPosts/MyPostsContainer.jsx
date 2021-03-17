import React from 'react';
import MyPosts from "./MyPosts";
import connect from "react-redux/lib/connect/connect";
import withRouter from "react-router-dom/withRouter"
import { getProfilePosts, addPost, deletePost } from "../../../redux/profile-reducer"


class MyPostsContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) { userId = 1; }
        this.props.getProfilePosts(userId);
    }

    addPost = (post_content) => {
        this.props.addPost(post_content);
    }

    deletePost = (post_id, user_id) => {
        this.props.deletePost(post_id, user_id);
    }

    render() {
        return (
            <div>
                <MyPosts {...this.props} addPost={this.addPost} deletePost={this.deletePost}/>
        </div>
        );
    }
    
}

let mapStateToProps = (state) => {
    return {
        userInfo: state.profilePage.userInfo,
        postsData: state.profilePage.postsData,
        authData: state.auth
    }
}

let urlDataComponent = withRouter(MyPostsContainer);


export default connect(mapStateToProps, 
    {   getProfilePosts, addPost, deletePost})(urlDataComponent)
