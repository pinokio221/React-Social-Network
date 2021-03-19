import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:9000/api/',
    withCredentials: true
})

export const profileAPI = {
    getProfilePage(userId) {
        let requestURL = `http://localhost:9000/api/users?userId=${userId}`
        return instance.get(requestURL, { withCredentials: true })
            .then(response => {
                return response.data;
            })
    },
    getProfileFriends(userId) {
        let requestURL = `http://localhost:9000/api/friendship/friends/${userId}`
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