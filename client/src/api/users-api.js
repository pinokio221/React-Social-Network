import axios from 'axios'
import rateLimit from 'axios-rate-limit';

const instance = rateLimit(axios.create({
    baseURL: 'http://localhost:9000/api/users',
    withCredentials: true
}), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`?page=${currentPage}&limit=${pageSize}`)
        .then(response => {
            return response.data;
        }).catch((error) => {
            return error.response
        })
    },
    getUserByNamePartial(text) {
        return instance.get(`?fullname=${text}`)
        .then(response => {
            return response.data;
        }).catch((error) => {
            return error.response
        })
    }
}