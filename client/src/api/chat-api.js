import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:9000/api/',
    withCredentials: true
})

export const chatAPI = {
    getProfileDialogs(){
        let requestURL = "http://localhost:9000/api/chat/dialogs"
        return instance.get(requestURL,
        { withCredentials: true })
        .then(response => {
            return response;
        })
    },
    getDialogMessages(dialogid) {
        let requestURL = `http://localhost:9000/api/chat/messages?dialog=${dialogid}`
        return instance.get(requestURL,
        { withCredentials: true })
        .then(response => {
            return response;
        })
    },
    sentMessage(receiveId, content) {
        let requestURL = "http://localhost:9000/api/chat/sent"
        return instance.post(requestURL, {
            receiveId: receiveId,
            content: content
        },
        { withCredentials: true })
        .then(response => {
            return response;
        })
    }
}
