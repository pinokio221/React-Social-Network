import React from 'react';
import styles from './Messages.module.css'
import Messages from './Messages'
import { withAuthRedirect } from '../../../hoc/AuthRedirect';
import { compose } from 'redux';
import connect from "react-redux/lib/connect/connect";
import { getDialogMessages, resetDialogMessages} from '../../../redux/dialogs-reducer';
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
        let receiveId = this.props.currentDialogData.id;

        this.socket.emit('send-message', {
            chatMessage,
            receiveId
        });
        this.setState({ chatMessage: "" });
        
    }
    componentDidMount() {
        let server = 'http://localhost:9000';

        this.socket = io(server);

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
        messagesData: state.dialogsPage.messagesData,
        currentDialogData: state.dialogsPage.currentDialogData,
        messagesCount: state.dialogsPage.messagesCount,
        messagesIsFetching: state.dialogsPage.messagesIsFetching
    }
    
}

export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, { getDialogMessages, resetDialogMessages })
)(MessagesContainer);
