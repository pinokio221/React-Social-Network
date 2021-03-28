import axios from 'axios'
import io from 'socket.io-client';


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
    getDialogMessages(receiveId, pagination) {
        let requestURL = `http://localhost:9000/api/chat/messages?target=${receiveId}&page=${pagination}`
        return instance.get(requestURL,
        { withCredentials: true })
        .then(response => {
            return response;
        }).catch((error) => {
            return error.response
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
    },
    getProfileDialogById(dialogid) {
        let requestURL = `http://localhost:9000/api/chat/dialogs?id=${dialogid}`
        return instance.get(requestURL,
        { withCredentials: true })
        .then(response => {
            return response;
        }).catch((error) => {
            return error.response
        })
    },
    
}
