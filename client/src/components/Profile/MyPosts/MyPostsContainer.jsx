import React from 'react';
import MyPosts from "./MyPosts";
import connect from "react-redux/lib/connect/connect";
import withRouter from "react-router-dom/withRouter"
import { getProfilePosts, addPost, updatePostContent } from "../../../redux/profile-reducer"



class MyPostsContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) { userId = 1; }
        this.props.getProfilePosts(userId);
    }

    addPost = (post_content) => {
        this.props.addPost(post_content);
    }

    updatePostContent = (post_content) => {
        this.props.updatePostContent(post_content)
    }
    render() {
        return (
            <div>
                <MyPosts {...this.props}/>
        </div>
        );
    }
    
}

let mapStateToProps = (state) => {
    return {
        userInfo: state.profilePage.userInfo,
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}

let urlDataComponent = withRouter(MyPostsContainer);


export default connect(mapStateToProps, 
    {   getProfilePosts, updatePostContent, addPost})(urlDataComponent)
