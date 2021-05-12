import React from 'react';
import styles from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo'
import PostsContainer from "./Posts/PostsContainer";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

class Profile extends React.Component {
    isAuthUserPage = false;
    state = {
        visible: true,
    }
    autoClose = () => {
        this.props.resetModalMessage()
    }
    render() {
        if(this.props.userInfo.id === this.props.auth.id) {
            this.isAuthUserPage = true;
        }
        return (
            <div>
                { this.props.successfullMessage ? 
                <div>
                    <Snackbar
                    open={this.state.visible}
                    onClose={this.autoClose}
                    autoHideDuration={3000}
                    anchorOrigin={{ horizontal: '100', vertical: '40' } }>
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                            {this.props.successfullMessage}
                        </Alert>
                    </Snackbar>
                </div>
                : null }
    
                { this.props.errorMessage ?
                <div>
                    <Snackbar
                    open={this.state.visible}
                    onClose={this.autoClose}
                    autoHideDuration={3000}
                    anchorOrigin={{ horizontal: 'top', vertical: 'center' } }>
                        <Alert severity="error">
                            {this.props.errorMessage}
                        </Alert>
                    </Snackbar>
                </div>
                : null }
                
                <ProfileInfo
                    {...this.props}
                    isAuthUserPage={this.isAuthUserPage} 
                    sendInvitation={this.props.sendInvitation}
                    friendshipStatus={this.props.friendshipStatus}
                    pictureUploadProcess={this.props.pictureUploadProcess}
                    />
                <PostsContainer isAuthUserPage={this.isAuthUserPage} store={this.props.store}/>
        </div>
        
        );
    }
    
}

export default Profile;