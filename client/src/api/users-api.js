import axios from 'axios'
import rateLimit from 'axios-rate-limit';

const instance = rateLimit(axios.create({
    baseURL: 'https://chilltime-site.herokuapp.com/api/users',
    withCredentials: true
}), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

export const usersAPI = {
    getUsers(currentPage) {
        return instance.get(`?page=${currentPage}`)
        .then(response => {
            return response.data;
        }).catch((error) => {
            return error.response
        })
    },
    getUserByNamePartial(text) {
        return instance.get(`?fullname=${text}`)
        .then(response => {
            console.log(response)
            return response.data;
        }).catch((error) => {
            return error.response
        })
    }
}