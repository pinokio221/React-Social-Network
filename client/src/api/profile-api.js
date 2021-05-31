import axios from 'axios'
import rateLimit from 'axios-rate-limit';

const instance = rateLimit(axios.create({
    baseURL: 'https://chilltime-site.herokuapp.com/api/profile',
    withCredentials: true
}), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

export const profileAPI = {
    getProfilePage(userId) {
        let requestURL = `https://chilltime-site.herokuapp.com/api/users?userId=${userId}`
        return instance.get(requestURL)
        .then(response => {
            return response;
        }).catch((error) => {
            return error.response
        })
    },
    updateProfilePicture(img){
        return instance.put('/profile_picture', img, 
            { 
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
        .then(response => {
            return response;
        }).catch((error) => {
            return error.response
        })
    },
    updateProfileStatus(user_status){
        return instance.put('/status',
            {
                status: user_status
            })
        .then(response => {
            return response;
        }).catch((error) => {
            return error.response
        })
    },
    getProfileStatus(userId){
        return instance.get(`/status/${userId}`)
        .then(response => {
            return response.data;
        }).catch((error) => {
            return error.response
        })
    }
}