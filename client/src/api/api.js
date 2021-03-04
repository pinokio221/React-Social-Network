import * as axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:9000/api/',
    withCredentials: true
})

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


