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
        chatMessage: "",
        emojiPicker: false
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
        let dialog = this.props.currentDialogData;
        let receiveId = this.props.match.params.receiveId
        let status = '0';
        if(dialog === null) {
            this.socket.emit('input-create-new-dialog', {
                authorId,
                receiveId,
                status
            })
            
        } else {
            let dialogId = this.props.currentDialogData.dialogId
            this.socket.emit('input-chat-message', {
                authorId,
                dialogId,
                chatMessage
            });
            this.setState({ chatMessage: "", emojiPicker: false });
        }
        
    }
    toggleEmojiPicker = () => {
        if(this.state.emojiPicker){
            setTimeout(() => {
                this.setState({
                    emojiPicker: false
                })
            }, 100);
            
        } else {
            setTimeout(() => {
                this.setState({
                    emojiPicker: true
                })
            }, 100);
        }
    }
    addEmoji = (emoji) => {
        this.setState({ chatMessage: this.state.chatMessage+emoji.native });
    }
    componentDidMount() {
        let server = 'http://localhost:9000';
        this.socket = io(server);

        this.socket.on('output-chat-message', msg => {
            this.props.sendMessageActionCreator(msg)
        })
        this.socket.on('output-create-new-dialog', data => {
            this.props.getDialogMessages(data.receiveId)
            let dialogId = data.id;
            let authorId = data.sendId;
            let chatMessage = this.state.chatMessage;

            this.socket.emit('input-chat-message', {
                authorId,
                dialogId,
                chatMessage
            })
        })
        let receiveId = this.props.match.params.receiveId
        this.props.getDialogMessages(receiveId);
    }
    componentWillUnmount() {
        this.socket.close()
        this.props.resetDialogMessages();
    }
    render() {
        return(
            <Messages 
                {...this.props} 
                chatMessage={this.state.chatMessage}
                emojiPicker={this.state.emojiPicker}
                addEmoji={this.addEmoji}
                handleSearchChange={this.handleSearchChange}
                submitChatMessage={this.submitChatMessage}
                toggleEmojiPicker={this.toggleEmojiPicker}
                />
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
    connect(mapStateToProps, { getDialogMessages, resetDialogMessages, sendMessageActionCreator})
)(MessagesContainer);
