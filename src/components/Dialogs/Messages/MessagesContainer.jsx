import React from 'react'
import Messages from "./Messages";
import {sendMessageActionCreator, updateMessageBodyActionCreator} from "../../../redux/dialogs-reducer";

import connect from "react-redux/lib/connect/connect";

let mapStateToProps = (state) => {
    return {
        messagesData: state.dialogsPage.messagesData,
        newMessageBody: state.dialogsPage.newMessageBody
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onSendMessageClick: () => {
            dispatch(sendMessageActionCreator())
        },
        onChangeMessageBody: (body) => {
            dispatch(updateMessageBodyActionCreator(body))
        }
    }
}


const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);

export default MessagesContainer;