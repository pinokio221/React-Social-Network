import React from 'react';
import Messages from './Messages'
import { withAuthRedirect } from '../../../hoc/AuthRedirect';
import { compose } from 'redux';
import connect from "react-redux/lib/connect/connect";
import { getDialogMessages, resetDialogMessages, sendMessageActionCreator, fetchMoreMessages} from '../../../redux/dialogs-reducer';
import withRouter from "react-router-dom/withRouter"
import io from 'socket.io-client';


class MessagesContainer extends React.Component {
    state = {
        chatMessage: "",
        emojiPicker: false,
        displayDownButton: false,
        pagination: 1,
        hasMore: true,
        scrollPosition: 0,
        receiveId: this.props.match.params.receiveId
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
        let receiveId = this.state.receiveId
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
            this.setState({
                emojiPicker: false
            })
        } else {
            this.setState({
                emojiPicker: true
            })
        }
    }
    addEmoji = (emoji) => {
        this.setState({ chatMessage: this.state.chatMessage+emoji.native });
    }
    fetchMoreMessages = () => {
        if(this.props.messagesData.length >= this.props.messagesCount) {
            this.setState({ hasMore: false });
            return;
        }
        setTimeout(() => {
            this.setState({
                pagination: this.state.pagination+=1
            })
            this.props.fetchMoreMessages(this.state.receiveId, this.state.pagination);
        }, 1000)
    }
    componentDidMount() {
        
        let server = 'http://localhost:9000';
        
        this.socket = io(server);

        this.socket.on('output-chat-message', msg => {
            this.props.sendMessageActionCreator(msg)
        })
        this.socket.on('output-create-new-dialog', data => {
            this.props.getDialogMessages(data.receiveId, this.props.pagination)
            let dialogId = data.id;
            let authorId = data.sendId;
            let chatMessage = this.state.chatMessage;

            this.socket.emit('input-chat-message', {
                authorId,
                dialogId,
                chatMessage
            })
            this.setState({ chatMessage: "", emojiPicker: false });
        })
        let receiveId = this.state.receiveId
        this.props.getDialogMessages(receiveId, this.props.pagination);
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
                displayDownButton={this.state.displayDownButton}
                totalMessages={this.props.dialogsPage.messagesCount}
                fetchMoreMessages={this.fetchMoreMessages}
                addEmoji={this.addEmoji}
                hasMore={this.state.hasMore}
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
        dialogsPage: state.dialogsPage,
        messagesData: state.dialogsPage.messagesData,
        pagination: state.dialogsPage.messagesPagination,
        currentDialogData: state.dialogsPage.currentDialogData,
        messagesCount: state.dialogsPage.messagesCount,
        messagesIsFetching: state.dialogsPage.messagesIsFetching
    }
    
}

export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, { getDialogMessages, resetDialogMessages, sendMessageActionCreator, fetchMoreMessages})
)(MessagesContainer);
