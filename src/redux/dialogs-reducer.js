const UPDATE_MESSAGE_BODY = "UPDATE-MESSAGE-BODY"
const SEND_MESSAGE = "SEND-MESSAGE"

export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE })
export const updateMessageBodyActionCreator = (body) => ({ type: UPDATE_MESSAGE_BODY, body: body })

const dialogsReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_MESSAGE_BODY:
            state.newMessageBody = action.body;
            return state;
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = body;
            state.messagesData.push({id: 10, message: body})
            return state;
        return state;
    }
}

export default dialogsReducer;