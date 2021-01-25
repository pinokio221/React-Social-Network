const UPDATE_MESSAGE_BODY = "UPDATE-MESSAGE-BODY"
const SEND_MESSAGE = "SEND-MESSAGE"

export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE })
export const updateMessageBodyActionCreator = (body) => ({ type: UPDATE_MESSAGE_BODY, body: body })

let initialState = {
    dialogsData: [
        {id: 1, name: 'Yuriy', profile_picture: "https://avatarfiles.alphacoders.com/792/thumb-79295.jpg"},
        {id: 2, name: 'Egor', profile_picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd3VMIBAKb6kU0Kc656fipMCDwqp-rao8P0g&usqp=CAU"},
        {id: 3, name: 'Genadiy', profile_picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJLl_GAyvK-aBXXFHHcWVZM7ipNgevaMAO4g&usqp=CAU"},
        {id: 4, name: 'Zoryana', profile_picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE7wDpuOow8T7EVb02FRMnRktJMdepHJt7qw&usqp=CAU"},
        {id: 5, name: 'Vitya', profile_picture:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-j8SPwUHaiopBhd2EgrzDyIUW0hMguVN2RA&usqp=CAU"}
    ],
    messagesData: [
        {id: 1, message: "Hello, how are you?"},
        {id: 2, message: "Why you still ignoring me?"},
        {id: 3, message: "fuck"}
    ],
    newMessageBody: ""
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_MESSAGE_BODY:
            state.newMessageBody = action.body;
            return state;
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = body;
            state.messagesData.push({id: 10, message: body})
            return state;
        default: return state;
    }
}

export default dialogsReducer;