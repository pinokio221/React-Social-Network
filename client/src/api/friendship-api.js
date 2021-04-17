import axios from 'axios'
import rateLimit from 'axios-rate-limit';

const instance = rateLimit(axios.create({
    baseURL: 'http://localhost:9000/api/',
    withCredentials: true
}), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

instance.getMaxRPS();

export const friendshipAPI = {
    getProfileFriends(userId, pagination) {
        let requestURL = `http://localhost:9000/api/friendship/friends/${userId}?page=${pagination}`
        return instance.get(requestURL, { withCredentials: true })
            .then(response => {
                return response;
            })
    },
    getProfileInvitations(pagination) {
        let requestURL = `http://localhost:9000/api/friendship/invitations/received?page=${pagination}`
        return instance.get(requestURL, { withCredentials: true })
            .then(response => {
                return response;
            })
    },
    removeFriend(userId) {
        let requestURL = `http://localhost:9000/api/friendship/remove/${userId}`
        return instance.delete(requestURL).then(response => {
            return response;
        })
    },
    sendInvitation(userId) {
        let requestURL = `http://localhost:9000/api/friendship/send/${userId}`
        return instance.post(requestURL,
            { 
                headers: {
                    "Content-Type": "application/json",
                }
            },
            { withCredentials: true })
            .then(response => {
                return response.data;
            })
    },
    cancelInvitation(userId) {
        let urlRequest = `http://localhost:9000/api/friendship/cancel/${userId}`
        return instance.delete(urlRequest,{ withCredentials: true })
            .then(response => {
                return response.data;
            })
    },
    acceptInvitation(userId) {
        let requestURL = `http://localhost:9000/api/friendship/accept/${userId}`
        return instance.put(requestURL).then((response) => {
            return response;
        })
    },
    rejectInvitation(userId) {
        let requestURL = `http://localhost:9000/api/friendship/reject/${userId}`
        return instance.put(requestURL).then((response) => {
            return response;
        })
    }
}