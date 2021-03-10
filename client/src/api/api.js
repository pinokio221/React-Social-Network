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

export const authAPI = {
    authMe() {
        let requestURL = `http://localhost:9000/api/user/me`
        return instance.get(requestURL,{ withCredentials: true })
        .then(response => {
            if(response.status === 200){
                return response.data;
            }
        })
    },
    userLogin() {
        let requestURL = `http://localhost:9000/api/user/login`
        return instance.post(requestURL,{
            login: "pinokio98",
            password: "1234567"
        },{ withCredentials: true })
    },
    userLogout() {
        let requestURL = `http://localhost:9000/api/user/logout`
        return instance.get(requestURL, { withCredentials: true })
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

export const postsAPI = {
    getProfilePosts(userId) {
        let requestURL = `http://localhost:9000/api/posts?userId=${userId}&limit=5`
        return instance.get(requestURL, { withCredentials: true })
            .then(response => {
                return response.data;
            })
    },

    addNewPost(post_content){
        let requestURL = `http://localhost:9000/api/posts/add`
        return instance.post(requestURL, 
            {
               content: post_content
            },
            { withCredentials: true })
            .then(response => {
                return response.data.post;
            })
    }
}

export const profileAPI = {
    getProfilePage(userId) {
        let requestURL = `http://localhost:9000/api/users?userId=${userId}`
        return instance.get(requestURL, { withCredentials: true })
            .then(response => {
                return response.data;
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


