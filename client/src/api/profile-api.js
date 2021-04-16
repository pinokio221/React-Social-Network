import axios from 'axios'
import rateLimit from 'axios-rate-limit';

const instance = rateLimit(axios.create({
    baseURL: 'http://localhost:9000/api/',
    withCredentials: true
}), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

export const profileAPI = {
    getProfilePage(userId) {
        let requestURL = `http://localhost:9000/api/users?userId=${userId}`
        return instance.get(requestURL, { withCredentials: true })
            .then(response => {
                return response;
            })
    },
    updateProfileStatus(user_status){
        let requestURL = `http://localhost:9000/api/profile/status`
        return instance.put(requestURL,
            {
                status: user_status
            },
            { withCredentials: true }).then(response => {
                return response;
            })
    },
    getProfileStatus(userId){
        let requestURL = `http://localhost:9000/api/profile/status/${userId}`
        return instance.get(requestURL,
            { withCredentials: true }).then(response => {
                return response.data;
            })
    }
}