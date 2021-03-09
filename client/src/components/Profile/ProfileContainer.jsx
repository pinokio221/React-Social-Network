import React from 'react';
import Profile from "./Profile"
import connect from "react-redux/lib/connect/connect";
import withRouter from "react-router-dom/withRouter"
import { getProfilePage } from "../../redux/profile-reducer"
import { Redirect } from 'react-router-dom'


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) { userId = 1; }
        this.props.getProfilePage(userId);
    }
    render() {
        if(this.props.isAuth === false){
            return <Redirect to={'/login'}/>
        }
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
        newPostText: state.profilePage.newPostText,
        isAuth: state.auth.isAuth
    }
}

let urlDataComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
    getProfilePage
})(urlDataComponent);

