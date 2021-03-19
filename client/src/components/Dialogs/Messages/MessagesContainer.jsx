import React from 'react';
import styles from './Messages.module.css'
import Messages from './Messages'
import { withAuthRedirect } from '../../../hoc/AuthRedirect';
import { compose } from 'redux';
import connect from "react-redux/lib/connect/connect";
import { getDialogMessages, resetDialogMessages } from '../../../redux/dialogs-reducer';
import withRouter from "react-router-dom/withRouter"


class MessagesContainer extends React.Component {
    componentDidMount() {
        let dialogid = this.props.match.params.dialogId
        this.props.getDialogMessages(dialogid);
    }
    componentWillUnmount() {
        this.props.resetDialogMessages();
    }
    render() {
        return(
            <Messages {...this.props}/>
        )
    }
}
let mapStateToProps = (state) => {
    return {
        messagesData: state.dialogsPage.messagesData,
        messagesCount: state.dialogsPage.messagesCount,
        messagesIsFetching: state.dialogsPage.messagesIsFetching
    }
    
}

export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, { getDialogMessages, resetDialogMessages })
)(MessagesContainer);
