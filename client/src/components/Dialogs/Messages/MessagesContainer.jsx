import React from 'react';
import styles from './Messages.module.css'
import Messages from './Messages'
import { withAuthRedirect } from '../../../hoc/AuthRedirect';
import { compose } from 'redux';
import connect from "react-redux/lib/connect/connect";
import { getDialogMessages, resetDialogMessages, sendMessageActionCreator} from '../../../redux/dialogs-reducer';
import withRouter from "react-router-dom/withRouter"
import io from 'socket.io-client';


class MessagesContainer extends React.Component {
    state = {
        chatMessage: ""
    }
    handleSearchChange = (e) => {
        this.setState({
            chatMessage: e.target.value
        })
    }
    submitChatMessage = (e) => {
        e.preventDefault();

        let chatMessage = this.state.chatMessage;
        let authorId = this.props.authData.id;
        let dialogId = this.props.currentDialogData.dialogId

        this.socket.emit('input-chat-message', {
            authorId,
            dialogId,
            chatMessage
        });
        this.setState({ chatMessage: "" });
        
    }
    componentDidMount() {
        let server = 'http://localhost:9000';
        this.socket = io(server);

        this.socket.on('output-chat-message', msg => {
            this.props.sendMessageActionCreator(msg)
        })
        let dialogid = this.props.match.params.dialogId
        this.props.getDialogMessages(dialogid);
    }
    componentWillUnmount() {
        this.props.resetDialogMessages();
    }
    render() {
        return(
            <Messages 
                {...this.props} 
                chatMessage={this.state.chatMessage} 
                handleSearchChange={this.handleSearchChange}
                submitChatMessage={this.submitChatMessage}/>
        )
    }
}
let mapStateToProps = (state) => {
    return {
        authData: state.auth,
        messagesData: state.dialogsPage.messagesData,
        currentDialogData: state.dialogsPage.currentDialogData,
        messagesCount: state.dialogsPage.messagesCount,
        messagesIsFetching: state.dialogsPage.messagesIsFetching
    }
    
}

export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, { getDialogMessages, resetDialogMessages, sendMessageActionCreator })
)(MessagesContainer);
