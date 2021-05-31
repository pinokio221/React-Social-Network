import axios from 'axios'
import rateLimit from 'axios-rate-limit';

const instance = rateLimit(axios.create({
    baseURL: 'https://chilltime-site.herokuapp.com/api/friendship',
    withCredentials: true
}), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

instance.getMaxRPS();

export const friendshipAPI = {
    getProfileFriends(userId, pagination) {
        return instance.get(`/friends/${userId}?page=${pagination}`)
        .then(response => {
            return response;
        }).catch((error) => {
            return error.response
        })
    },
    getProfileInvitations(pagination) {
        return instance.get(`/invitations/received?page=${pagination}`)
        .then(response => {
            return response;
        }).catch((error) => {
            return error.response
        })
    },
    removeFriend(userId) {
        return instance.delete(`/remove/${userId}`)
        .then(response => {
            return response;
        }).catch((error) => {
            return error.response
        })
    },
    sendInvitation(userId) {
        return instance.post(`/send/${userId}`,
            { 
                headers: {
                    "Content-Type": "application/json",
                }
            },
            { withCredentials: true })
        .then(response => {
            return response.data;
        }).catch((error) => {
            return error.response
        })
    },
    cancelInvitation(userId) {
        return instance.delete(`/cancel/${userId}`)
        .then(response => {
            return response.data;
        }).catch((error) => {
            return error.response
        })
    },
    acceptInvitation(userId) {
        return instance.put(`/accept/${userId}`)
        .then((response) => {
            return response;
        }).catch((error) => {
            return error.response
        })
    },
    rejectInvitation(userId) {
        return instance.put(`/reject/${userId}`)
        .then((response) => {
            return response;
        }).catch((error) => {
            return error.response
        })
    }
}