import { chatAPI } from "../api/chat-api"

const UPDATE_MESSAGE_BODY = "UPDATE-MESSAGE-BODY"
const SEND_MESSAGE = "SEND-MESSAGE"
const SET_PROFILE_DIALOGS = "SET-PROFILE-DIALOGS"
const SET_DIALOG_MESSAGES = "SET-DIALOG-MESSAGES"
const TOGGLE_DIALOGS_FETCHING = "TOGGLE-DIALOGS-FETCHING"
const TOGGLE_MESSAGES_FETCHING = "TOGGLE-MESSAGES-FETCHING"
const RESET_DIALOG = "RESET-DIALOG"
const SET_CURRENT_DIALOG = "SET-CURRENT-DIALOG"

export const sendMessageActionCreator = (message) => ({ type: SEND_MESSAGE, message })
export const updateMessageBodyActionCreator = (body) => ({ type: UPDATE_MESSAGE_BODY, body: body })
export const setProfileDialogsAction = (dialogs, dialogsCount) => ({ type: SET_PROFILE_DIALOGS, dialogs, dialogsCount})
export const setProfileDialogMessagesAction = (messages, messagesCount) => ({ type: SET_DIALOG_MESSAGES, messages, messagesCount })
export const toggleDialogsFetchingAction = (isFetching) => ({ type: TOGGLE_DIALOGS_FETCHING, isFetching})
export const toggleMessagesFetchingAction = (isFetching) => ({ type: TOGGLE_MESSAGES_FETCHING, isFetching})
export const resetDialogMessages = () => ({ type: RESET_DIALOG });
export const setCurrentDialogAction = (dialog_data) => ({ type: SET_CURRENT_DIALOG, dialog_data});

let initialState = {
    dialogsData: [],
    dialogsCount: null,
    messagesData: [],
    messagesCount: null,
    currentDialogData: null,
    newMessageBody: "",
    dialogsIsFetching: true,
    messagesIsFetching: true
}

export const getProfileDialogs = () => {
    return (dispatch) => {
        chatAPI.getProfileDialogs().then(response => {
            dispatch(setProfileDialogsAction(response.data.items, response.data.totalDialogs));
            dispatch(toggleDialogsFetchingAction(false));
        })
    }
    
}

export const getProfileDialogById = (dialogid) => {
    return (dispatch) => {
        chatAPI.getProfileDialogById(dialogid).then(response => {
            if(response.status === 200) {
                dispatch(setCurrentDialogAction(response.data.items));
            }
            if(response.status === 404) {
                console.log(response.data.message)
            }
        })
    }
}

export const getDialogMessages = (receiveId) => {
    return(dispatch) => {
        chatAPI.getDialogMessages(receiveId).then(response => {
            if(response.status === 200) {
                dispatch(setProfileDialogMessagesAction(response.data.items, response.data.totalMessages))
                dispatch(getProfileDialogById(response.data.dialogId));
                dispatch(toggleMessagesFetchingAction(false));
            }
            if(response.status === 404) {
                dispatch(toggleMessagesFetchingAction(false));
            }
            
        })
    }
}


const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            }
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messagesData: [...state.messagesData, action.message]
            }
        case SET_PROFILE_DIALOGS:
            return {
                ...state,
                dialogsData: action.dialogs,
                dialogsCount: action.dialogsCount
            }
        case SET_CURRENT_DIALOG:
            return {
                ...state,
                currentDialogData: action.dialog_data
            }
        case SET_DIALOG_MESSAGES:
            return {
                ...state,
                messagesData: action.messages,
                messagesCount: action.messagesCount
            }
        case RESET_DIALOG:
            return {
                ...state,
                messagesData: [],
                currentDialogData: null,
                messagesCount: null,
                messagesIsFetching: true
            }
        case TOGGLE_DIALOGS_FETCHING:
            return {
                ...state,
                dialogsIsFetching: action.isFetching
            }
        case TOGGLE_MESSAGES_FETCHING:
            return {
                ...state,
                messagesIsFetching: action.isFetching
            }
        default: return state;
    }
}

export default dialogsReducer;