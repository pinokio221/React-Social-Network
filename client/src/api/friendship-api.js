import axios from 'axios'
import rateLimit from 'axios-rate-limit';

const instance = rateLimit(axios.create({
    baseURL: 'http://localhost:9000/api/',
    withCredentials: true
}), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

instance.getMaxRPS();

export const friendshipAPI = {
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
    }
}