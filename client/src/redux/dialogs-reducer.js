import { chatAPI } from "../api/chat-api"
import { friendshipAPI } from "../api/friendship-api"

const UPDATE_MESSAGE_BODY = "UPDATE-MESSAGE-BODY"
const SEND_MESSAGE = "SEND-MESSAGE"
const SET_PROFILE_DIALOGS = "SET-PROFILE-DIALOGS"
const SET_DIALOG_MESSAGES = "SET-DIALOG-MESSAGES"
const TOGGLE_DIALOGS_FETCHING = "TOGGLE-DIALOGS-FETCHING"
const TOGGLE_MESSAGES_FETCHING = "TOGGLE-MESSAGES-FETCHING"
const RESET_DIALOG = "RESET-DIALOG"
const SET_CURRENT_DIALOG = "SET-CURRENT-DIALOG"
const SET_PROFILE_CONTACTS = "SET-PROFILE-CONTACTS"
const FETCH_MORE_MESSAGES = "FETCH-MORE-MESSAGES"

export const sendMessageActionCreator = (message) => ({ type: SEND_MESSAGE, message })
export const updateMessageBodyActionCreator = (body) => ({ type: UPDATE_MESSAGE_BODY, body: body })
export const setProfileDialogsAction = (dialogs, dialogsCount) => ({ type: SET_PROFILE_DIALOGS, dialogs, dialogsCount})
export const setProfileDialogMessagesAction = (messages, messagesCount, messagesPagination) => ({ type: SET_DIALOG_MESSAGES, messages, messagesCount, messagesPagination })
export const toggleDialogsFetchingAction = (isFetching) => ({ type: TOGGLE_DIALOGS_FETCHING, isFetching})
export const toggleMessagesFetchingAction = (isFetching) => ({ type: TOGGLE_MESSAGES_FETCHING, isFetching})
export const resetDialogMessages = () => ({ type: RESET_DIALOG });
export const setCurrentDialogAction = (dialog_data) => ({ type: SET_CURRENT_DIALOG, dialog_data});
export const setProfileContactsAction = (contacts, totalContacts) => ({ type: SET_PROFILE_CONTACTS, contacts, totalContacts })
export const fetchMoreMessagesAction = (messages, pagination) => ({ type: FETCH_MORE_MESSAGES, messages, pagination})

let initialState = {
    dialogsData: [],
    contactsData: [],
    totalContacts: null,
    dialogsCount: null,
    messagesData: [],
    messagesCount: null,
    messagesPagination: 1,
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

export const getProfileContacts = (userId) => {
    return (dispatch) => {
        friendshipAPI.getProfileFriends(userId).then(data => {
            dispatch(setProfileContactsAction(data.data.items, data.data.totalFriends))
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

export const getDialogMessages = (receiveId, pagination) => {
    return(dispatch) => {
        chatAPI.getDialogMessages(receiveId, pagination).then(response => {
            if(response.status === 200) {
                dispatch(setProfileDialogMessagesAction(response.data.items, response.data.totalMessages, response.data.page))
                dispatch(getProfileDialogById(response.data.dialogId));
                dispatch(toggleMessagesFetchingAction(false));
            }
            if(response.status === 404) {
                dispatch(toggleMessagesFetchingAction(false));
            }
            
        })
    }
}

export const fetchMoreMessages = (receiveId, pagination) => {
    return(dispatch) => {
        chatAPI.getDialogMessages(receiveId, pagination).then(response => {
            if(response.status === 200) {
                dispatch(fetchMoreMessagesAction(response.data.items, response.data.page))
                
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
                messagesData: [action.message, ...state.messagesData,]
            }
        case SET_PROFILE_DIALOGS:
            return {
                ...state,
                dialogsData: action.dialogs,
                dialogsCount: action.dialogsCount
            }
        case SET_PROFILE_CONTACTS: {
            return {
                ...state,
                contactsData: action.contacts,
                totalContacts: action.totalContacts
            }
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
                messagesCount: action.messagesCount,
                messagesPagination: action.messagesPagination
            }
        case FETCH_MORE_MESSAGES:
            return {
                ...state,
                messagesData: [...state.messagesData, ...action.messages],
                messagesPagination: action.pagination
            }
        case RESET_DIALOG:
            return {
                ...state,
                messagesData: [],
                currentDialogData: null,
                messagesCount: null,
                messagesIsFetching: true,
                messagesPagination: 1
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