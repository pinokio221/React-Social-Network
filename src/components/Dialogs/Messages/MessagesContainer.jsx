import React from 'react'
import Messages from "./Messages";
import {sendMessageActionCreator, updateMessageBodyActionCreator} from "../../../redux/dialogs-reducer";
import StoreContext from "../../../StoreContext";

const MessagesContainer = (props) => {
    //let state = props.store.getState();
    return (
        <StoreContext.Consumer>
            {
            (store) => {
                let onSendMessageClick = () => {
                    store.dispatch(sendMessageActionCreator())
                }

                let onChangeMessageBody = (body) => {
                    store.dispatch(updateMessageBodyActionCreator(body))

                }
                return <Messages
                    onSendMessageClick={onSendMessageClick}
                    onChangeMessageBody={onChangeMessageBody}
                    messagesData={store.getState().dialogsPage.messagesData}
                    dispatch={store.dispatch}
                    newMessageBody={store.getState().dialogsPage.newMessageBody}
                />
            }
        }
        </StoreContext.Consumer>
    )
}

export default MessagesContainer;