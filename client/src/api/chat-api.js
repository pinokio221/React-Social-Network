import axios from 'axios'
import rateLimit from 'axios-rate-limit';


const instance = rateLimit(axios.create({
    baseURL: 'https://chilltime-app.herokuapp.com/api/chat',
    withCredentials: true
}), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

export const chatAPI = {
    getProfileDialogs(pagination) {
        return instance.get(`/dialogs?page=${pagination}`)
        .then(response => {
            return response;
        }).catch((error) => {
            return error.response
        })
    },
    getDialogMessages(receiveId, pagination) {
        return instance.get(`/messages?target=${receiveId}&page=${pagination}`)
        .then(response => {
            return response;
        }).catch((error) => {
            return error.response
        })
    },
    sentMessage(receiveId, content) {
        return instance.post('/sent', {
            receiveId: receiveId,
            content: content
        })
        .then(response => {
            return response;
        }).catch((error) => {
            return error.response
        })
    },
    getProfileDialogById(dialogid) {
        return instance.get(`/dialogs?id=${dialogid}`)
        .then(response => {
            return response;
        }).catch((error) => {
            return error.response
        })
    },
    
}
