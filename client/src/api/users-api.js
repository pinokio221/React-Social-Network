import axios from 'axios'
import rateLimit from 'axios-rate-limit';

const instance = rateLimit(axios.create({
    baseURL: 'http://localhost:9000/api/',
    withCredentials: true
}), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        let requestURL = `http://localhost:9000/api/users?page=${currentPage}&limit=${pageSize}`;
        return instance.get(requestURL).then(response => {
            return response.data;
        })
    },
    getUserByNamePartial(text) {
        let requestURL = `http://localhost:9000/api/users?fullname=${text}`;
        return instance.get(requestURL).then(response => {
            return response.data;
        })
    }
}